import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  userId: { type: String },
  farmId: { type: String },
  createdAt: { type: Date },

});

const Favorite = mongoose.model("Favorite", favoriteSchema);
export default Favorite;