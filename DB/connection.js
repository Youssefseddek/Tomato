import mongoose from "mongoose";

 const connecetDB = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((result) => {
    //   console.log(result);
      console.log("connected to DB successfully");
    })
    .catch((error) => console.log("fail to connect to DB ", error));
};

export default connecetDB