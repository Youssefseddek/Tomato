import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Ensure password is hashed before storing
    location: { type: String, default: "" },
    code: {type: String,default: ''},
    Use_Reset_link:{ type: Boolean, default: false }, 
    confirmEmail: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const userModel = mongoose.model("User", userSchema);
export default userModel;
