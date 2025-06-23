import Tomato from "../../../DB/model/tomatoes.model.js";
import cloudinary from "../../../services/cloudinary.js";


// get all tomatoes
export const getTomato = async (req, res) => {
    try {
        const tomatoes = await Tomato.find({})
        if (!tomatoes) {
            return res.status(404).json({ message: "No tomatoes found" })
        }
        return res.json({ message: "Tomatoes", tomatoes });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack })
    }
}

// add tomato
export const addTomato = async (req, res) => {

    try {
        const { tomato_code, name, createdAt } = req.body
        if (!tomato_code || !name ) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (req.file) {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: "tomatoConnect/tomato" });
            const tomato = await Tomato.create({ tomato_code, name, photo: secure_url, createdAt })
            return res.status(201).json({ message: "Tomato created successfully", tomato })
        }
        const tomato = await Tomato.create({ tomato_code, name, createdAt })
        return res.status(201).json({ message: "Tomato created successfully", tomato })



    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack })
    }

}

// update tomato Photo
export const updateTomatoPhoto = async (req, res) => {
    try {
        const { id } = req.params
        const { tomato_code, name } = req.body
        // if (!tomato_code || !name ) {
        //     return res.status(400).json({ message: "All fields are required" })
        // }
        if (req.file) {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: "tomatoConnect/tomato" });
            const tomato = await Tomato.findByIdAndUpdate(id, {tomato_code,name, photo: secure_url }, { new: true })
            return res.status(200).json({ message: "Tomato updated successfully", tomato })
        }
        const tomato = await Tomato.findByIdAndUpdate(id, { tomato_code, name }, { new: true })
        return res.status(200).json({ message: "Tomato updated successfully", tomato })
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack })
    }
}


// delete tomato
export const deleteTomato = async (req, res) => {
    try {
        const { id } = req.params
        const tomato = await Tomato.findByIdAndDelete(id) 
        if (!tomato) {
            return res.status(404).json({ message: "Tomato not found" })
        }
        // Optionally, you can also delete the photo from cloudinary if it exists
        if (tomato.photo) {
            const public_id = tomato.photo.split('/').pop().split('.')[0]; // Extract public_id from the URL
            await cloudinary.uploader.destroy(public_id);
        }
        return res.status(200).json({ message: "Tomato deleted successfully" })
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack })
    }
}

// get tomato by id
export const getTomatoById = async (req, res) => {
    try {
        const { id } = req.params
        const tomato = await Tomato.findById(id)
        if (!tomato) {
            return res.status(404).json({ message: "Tomato not found" })
        }
        return res.status(200).json({ message: "Tomato found", tomato })
    }
    catch (error) { 
        return res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack })
    }
}