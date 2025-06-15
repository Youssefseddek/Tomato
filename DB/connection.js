import mongoose from "mongoose";

 const connecetDB = () => {
  mongoose
    .connect("mongodb+srv://akramsayed330:M.mten200@cluster0.ltrg0.mongodb.net/tomatoConnect")
    .then((result) => {
    //   console.log(result);
      console.log("connected to DB successfully");
    })
    .catch((error) => console.log("fail to connect to DB ", error));
};

export default connecetDB