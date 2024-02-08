import mongoose from "mongoose";
const Schema = mongoose.Schema;

const VerificationSchema = new mongoose.Schema(
  {
    userId: Schema.Types.ObjectId,
    token: String,
  },
  { timestamps: true }
);
export default mongoose.models.Verification ||
  mongoose.model("Verification", VerificationSchema);
