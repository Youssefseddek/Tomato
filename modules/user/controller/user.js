import userModel from "../../../DB/model/user.model.js";
import cloudinary from "../../../services/cloudinary.js";

export const getUsers = async (req, res) => {
  const user = await userModel.findById(req.user.id).select("-password -__v");
  res.json({ message: "user", user });
};

// export const addImage = async (req, res) => {
//   if (!req.file) {
//     res.status(200).json({ message: "upload your image" });
//   } else {
//     console.log(req.file);

//     const { secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: "tomatoConnect/user" });
//     console.log(secure_url);

//   }
// };


// update user profile
export const editProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, phone } = req.body;
    
    // name or phone is required
    if (!name && !phone) {
      return res.status(400).json({ message: "Name or phone is required" });
    }
    const updateProfile = await userModel.findByIdAndUpdate(
      id,
      { name, phone},
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      updateProfile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      stack: error.stack,
    });
  }

}
