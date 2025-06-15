import userModel from '../../../DB/model/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { myEmail } from '../../../services/sendEmail.js'
import { nanoid } from 'nanoid'

// signup
export const signup = async (req, res) => {

    try {

        const { name, email, password } = req.body
        // check if user already exists
        const user = await userModel.findOne({ email }).select('email')
        if (user) {
            return res.status(409).json({ message: "Email already exists" })
        } else {
            // hash password
            const hashedPassword = bcrypt.hashSync(password, +process.env.SALTROUND)

            // create user
            const newUser = new userModel({
                name,
                email,
                password: hashedPassword,
                phone: req.body.phone,
                address: req.body.address
            })

            //send email verification link
            const token = jwt.sign({ id: newUser._id }, process.env.EMAIL_VERIFICATION_TOKEN, { expiresIn: '1h' })
            const link = `${req.protocol}://${req.headers.host}${process.env.BASE_URL}/auth/confirmEmail/${token}`
            const message = `
            <a href='${link}' >Click Here To Activate your Account</a>
            `

            const info = await myEmail(newUser.email, 'Email Verification', message)
            console.log(info);

            // save user
            if (info.accepted.length) {
                const savedUser = await newUser.save()
                return res.status(201).json({ message: "User created successfully", user: savedUser })
            } else {
                return res.status(500).json({ message: "Failed to send email" })
            }




        }


    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message , stack: error.stack })
    }
}

// confirm email
export const confirmEmail = async (req, res) => {
    try {
        const { token } = req.params
        if (!token) {
            return res.status(400).json({ message: "Token is required" })
        }
        const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_TOKEN)
        if (!decoded) {
            return res.status(400).json({ message: "Invalid token" })
        }
        const user = await userModel.findById(decoded.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        user.confirmEmail = true
        await user.save()
        return res.status(200).json({ message: "Email verified successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message , stack: error.stack })
    }
}

// login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        // check if user exists
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        // check if password is correct
        const isMatch = bcrypt.compareSync(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" })
        }
        // check if email is verified   
        if (!user.confirmEmail) {
            return res.status(401).json({ message: "Email not verified" })
        }

        // create token
        const token = jwt.sign({ id: user._id ,isLoggedIn:true}, process.env.JWT_SECRET, { expiresIn: 60*60*24 })
        
        // send token in response
        return res.status(200).json({ message: "Login successfully", token, user })
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message , stack: error.stack })
    }
}




// - Forget password ( One time access link ) 
export const sendCode = async (req, res) => {
    try {

        const { email } = req.body

        const user = await userModel.findOneAndUpdate({ email},

            {
                Use_Reset_link: false
            }
        )

        if (!user) {
            res.status(404).json({ message: 'In-valid email' })
        } else {

            const code = nanoid()
            const updateCode = await userModel.updateOne({ _id: user._id },
                {
                    code
                }
            )

            const token = jwt.sign({ id: user._id }, process.env.EMAIL_VERIFICATION_TOKEN, { expiresIn: 60 * 60 })

            const message = `<div>
            <h1> your code is </h1>
            <p> ${code} </p>
            <a href='${req.protocol}://${req.headers.host}${process.env.BASE_URL}/auth/forgetPassword/${token}'>Follow me to continue</a>
            </div>`;
            myEmail(user.email,'Verfication Email', message )

            res.status(200).json({ message: 'please check your email to get your code' })
        }


    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message , stack: error.stack })
    }


}



export const forgetPassword = async (req, res) => {

    try {
        const { code, newPassword } = req.body

        const { token } = req.params
        const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_TOKEN)

        if (!decoded) {
            res.status(404).json({ message: 'In-valid token payload' })
        } else {

            const user = await userModel.findById(decoded.id)
            if (user.Use_Reset_link) {
                res.status(400).json({ message: 'this link is used before' })
            } else {
                const match = bcrypt.compareSync(newPassword, user.password)
                if (match) {
                    res.status(400).json({ message: ' Sorry this password is match the old password please change it' })
                } else {
                    const hashPassword = bcrypt.hashSync(newPassword, parseInt(process.env.SALTROUND))
                    const updatePassword = await userModel.updateOne({ _id: user._id, code },
                        {
                            password: hashPassword,
                            Use_Reset_link: true
                        }
                    )


                    updatePassword.modifiedCount
                        ? res.status(200).json({ message: 'update password successfully' })
                        : res.status(404).json({ message: 'fail to update password' })
                }
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message , stack: error.stack })

    }

}



