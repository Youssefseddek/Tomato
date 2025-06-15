import mongoose from "mongoose";

const FarmsHistorySchema = new mongoose.Schema({
  id: { type: String },
  farmId: { type: mongoose.Schema.Types.Mixed },
  photo: { type: mongoose.Schema.Types.Mixed },

});

const FarmsHistory = mongoose.model("FarmsHistory", FarmsHistorySchema);
export default FarmsHistory;