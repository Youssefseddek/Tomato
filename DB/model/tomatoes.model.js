import mongoose from "mongoose";

const TomatoSchema = new mongoose.Schema({
  // id: { type: String },

  tomato_code: { type: String },
  name: { type: String },
  photo: { type: String },
  // createdAt: { type: Date },

},{
  timestamps: true
});

const Tomato = mongoose.model("Tomato", TomatoSchema);
export default Tomato;