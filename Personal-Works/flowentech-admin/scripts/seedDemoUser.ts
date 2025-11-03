import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables
dotenv.config({ path: resolve(__dirname, "../.env") });

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessSection: { type: String, required: true },
    role: { type: String, enum: ["admin", "operator"], default: "operator" },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seedDemoUser() {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      console.error("❌ MONGO_URI is not defined in .env file");
      process.exit(1);
    }

    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Demo credentials
    const demoUser = {
      username: "Admin Demo",
      email: "admin@demo.com",
      password: "Demo123!",
      accessSection: "all",
      role: "admin",
    };

    // Check if user already exists
    const existingUser = await User.findOne({ email: demoUser.email });
    if (existingUser) {
      console.log("⚠️  Demo user already exists!");
      console.log("\n📧 Demo Login Credentials:");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log(`Email:    ${demoUser.email}`);
      console.log(`Password: ${demoUser.password}`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
      await mongoose.connection.close();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(demoUser.password, 10);

    // Create demo user
    const newUser = new User({
      username: demoUser.username,
      email: demoUser.email,
      password: hashedPassword,
      accessSection: demoUser.accessSection,
      role: demoUser.role,
    });

    await newUser.save();
    console.log("✅ Demo user created successfully!");

    console.log("\n📧 Demo Login Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`Email:    ${demoUser.email}`);
    console.log(`Password: ${demoUser.password}`);
    console.log(`Role:     ${demoUser.role}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    await mongoose.connection.close();
    console.log("🔒 Database connection closed");
  } catch (error) {
    console.error("❌ Error seeding demo user:", error);
    process.exit(1);
  }
}

seedDemoUser();
