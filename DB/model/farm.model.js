import mongoose from "mongoose";

const FarmsSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  location: { type: String },
  contactPhone: { type: String },
  contactEmail: { type: String },
  createdAt: { type: Date },

});

const Farm = mongoose.model("Farm", FarmsSchema);
export default Farm;