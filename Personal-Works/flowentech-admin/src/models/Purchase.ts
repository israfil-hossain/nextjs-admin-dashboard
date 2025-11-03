import { Purchase } from "@/types/purchase";
import mongoose, { Schema, Document } from "mongoose";

const PurchaseSchema: Schema = new Schema(
  {
    templateId: {
      type: String,
      required: true,
      ref: "Template"
    },
    customerEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    stripeSessionId: {
      type: String,
      required: true,
      unique: true
    },
    stripePaymentIntentId: { type: String },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: "usd",
      lowercase: true
    },
    downloadToken: {
      type: String,
      required: true,
      unique: true
    },
    licenseKey: {
      type: String,
      required: true,
      unique: true
    },
    expiresAt: {
      type: Number,
      required: true
    },
    purchaseDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    status: {
      type: String,
      enum: ["completed", "pending", "refunded"],
      default: "completed"
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
PurchaseSchema.index({ customerEmail: 1 });
PurchaseSchema.index({ templateId: 1 });
PurchaseSchema.index({ stripeSessionId: 1 });
PurchaseSchema.index({ downloadToken: 1 });
PurchaseSchema.index({ purchaseDate: -1 });

export interface IPurchase extends Purchase, Document {}

const PurchaseModel = mongoose.models.Purchase || mongoose.model<IPurchase>("Purchase", PurchaseSchema);

export default PurchaseModel;
