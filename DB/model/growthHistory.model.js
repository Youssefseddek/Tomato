import mongoose from "mongoose";

const GrowthHistorySchema = new mongoose.Schema({
  id: { type: String },
  growthId: { type: mongoose.Schema.Types.Mixed },
  status: { type: String },
  photo: { type: mongoose.Schema.Types.Mixed },

});

const GrowthHistory = mongoose.model("GrowthHistory", GrowthHistorySchema);
export default GrowthHistory;