import mongoose from "mongoose";

const GrowthSchema = new mongoose.Schema({
  id: { type: String },
  tomatoType: { type: String },
  plantingDate: { type: Date },
  expectedHarvestDate: { type: Date },
  status: { type: String ,default:"Plant Set"},
  photo: { type: mongoose.Schema.Types.Mixed },

});

const Growth = mongoose.model("Growth", GrowthSchema);
export default Growth;