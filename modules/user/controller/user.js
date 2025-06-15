import userModel from "../../../DB/model/user.model.js";

export const getUsers = async (req, res) => {
  const user = await userModel.find();
  res.json({ message: "user", user });
};

export const addImage = async (req, res) => {
  if (!req.file) {
    res.status(200).json({ message: "upload your image" });
  } else {
    console.log(req.file);

    const image = req.file.destination + "/" + req.file.filename;
    console.log(image);

    

  }
};
