import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1, // Default quantity is set to 1
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model defined
  },
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
