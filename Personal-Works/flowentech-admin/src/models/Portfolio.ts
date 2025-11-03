// models/Portfolio.js

import { Portfolio } from "@/types/portfolio";
import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    short_description : {type: String, required: false}, 
    description: { type: String, required: true },
    url: { type: String, required: true },
    cover_img: {type : String, required: true}, 
    category: { type: String, enum: ["web","mobile","nocode"]},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export interface IPortfolio extends Portfolio, Document {}

const PortfolioModel = mongoose.models.Portfolio || mongoose.model("IPortfolio", PortfolioSchema);

export default PortfolioModel;
