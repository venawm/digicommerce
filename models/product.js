import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import Category from "./categories";
import Tag from "./tag";
import User from "./user";

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      maxLength: 200,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const bidSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 160,
      text: true, // for implementing text search
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 2000000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 7,
      validate: {
        validator: function (value) {
          return value !== 0;
        },
        message: "Price must be greater than zero",
      },
    },
    previousPrice: Number,
    color: String,
    brand: String,
    stock: Number,
    shipping: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    images: [
      {
        secure_url: {
          type: String,
          default: "",
        },
        public_id: {
          type: String,
          default: "",
        },
      },
    ],
    sold: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    ratings: [ratingSchema],

    // Bidding fields
    bid: {
      type: Boolean,
      default: false,
    },
    bids: [bidSchema],
    bidEndTime: {
      type: Date,
    },
    bidStatus: {
      type: String,
      enum: ["open", "closed", "expired"],
      default: "open",
    },
    minimumBidIncrement: {
      type: Number,
      default: 10,
    },
    winner: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      amount: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

productSchema.plugin(mongooseUniqueValidator, { message: "already exists" });

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
