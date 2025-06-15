import multer from "multer";
import { nanoid } from "nanoid";
import fs from 'fs'
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url))
console.log(__dirname);


export const validationTypes = {
    image: ['image/jpeg', 'image/png', 'image/gif'],
    pdf: ['application/pdf']
}

export const HME = (err, req, res, next) => {
    if (err) {
        res.status(400).json({ message: 'multer err', err })
    } else {
        next()
    }
}


export function myMulter(customValidation, customPath) {

    if (!customPath) {
        customPath = 'general'
    }

    const fullPath = path.join(__dirname,`../uploads/${customPath}`)
    console.log(fullPath);

    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath,{recursive:true})
    }
    

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${customPath}`)
        },
        filename: function (req, file, cb) {
            console.log({ file });

            cb(null, nanoid() + "_" + file.originalname)
        }
    })


    function fileFilter(req, file, cb) {

        if (customValidation.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb('In-valid data type', false)
        }

    }

    const upload = multer({ fileFilter, storage })
    return upload
}