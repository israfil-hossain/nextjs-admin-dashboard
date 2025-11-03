import { Template } from "@/types/template";
import mongoose, { Schema, Document } from "mongoose";

const DemoCredentialsSchema = new Schema(
  {
    username: { type: String },
    password: { type: String },
  },
  { _id: false }
);

const PreviewImageSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: { type: String },
  },
  { _id: false }
);

const TemplateSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true, maxlength: 500 },
    price: { type: Number, required: true, min: 0 },
    currency: {
      type: String,
      default: "USD",
      enum: ["USD", "EUR", "GBP"]
    },
    thumbnail: { type: String, required: true },
    thumbnailAlt: { type: String },
    previewImages: [PreviewImageSchema],
    previewUrl: { type: String },
    demoUrl: { type: String },
    isFeatured: { type: Boolean, default: false },
    category: {
      type: String,
      required: true,
      enum: ["SaaS", "E-commerce", "Portfolio", "Blog", "Landing Page", "Dashboard"]
    },
    technologies: [{ type: String }],
    features: [{ type: String }],
    demoCredentials: DemoCredentialsSchema,
    licenseType: {
      type: String,
      default: "single",
      enum: ["single", "unlimited", "extended"]
    },
    includes: [{ type: String }],
    stripeProductId: { type: String },
    stripePriceId: { type: String },
    downloadUrl: { type: String },
    templateFile: { type: String },
    publishedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
TemplateSchema.index({ slug: 1 });
TemplateSchema.index({ category: 1 });
TemplateSchema.index({ isFeatured: 1 });
TemplateSchema.index({ publishedAt: -1 });

export interface ITemplate extends Omit<Template, '_id'>, Document {}

const TemplateModel = mongoose.models.Template || mongoose.model<ITemplate>("Template", TemplateSchema);

export default TemplateModel;
