import userModel from "../../../DB/model/user.model.js";
import cloudinary from "../../../services/cloudinary.js";

export const getUsers = async (req, res) => {
  const user = await userModel.find();
  res.json({ message: "user", user });
};

export const addImage = async (req, res) => {
  if (!req.file) {
    res.status(200).json({ message: "upload your image" });
  } else {
    console.log(req.file);

    const { secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: "tomatoConnect/user" });
    console.log(secure_url);

  }
};
