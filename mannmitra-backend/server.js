// all-in-one backend for MannMitra

import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ CORS config
const allowedOrigins = [
  "http://localhost:3000",
  "https://sih-25-ochre.vercel.app"
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));


// 🔗 MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ================== User Schema ==================
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  collegeId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "counselor", "admin"], default: "student" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// ================== Middleware ==================
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ================== Routes ==================

// ---- Signup ----
app.post("/signup", async (req, res) => {
  try {
    const { fullName, collegeId, password, role } = req.body;
    if (!fullName || !collegeId || !password)
      return res.status(400).json({ message: "Please fill all fields" });

    const existingUser = await User.findOne({ collegeId });
    if (existingUser) return res.status(400).json({ message: "College ID already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, collegeId, password: hashedPassword, role });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, collegeId: newUser.collegeId, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ message: "Signup successful", user: { ...newUser._doc, password: undefined }, token });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---- Login ----
app.post("/login", async (req, res) => {
  try {
    const { collegeId, password } = req.body;
    if (!collegeId || !password) return res.status(400).json({ message: "Please fill all fields" });

    const user = await User.findOne({ collegeId });
    if (!user) return res.status(400).json({ message: "Invalid College ID or Password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid College ID or Password" });

    const token = jwt.sign(
      { id: user._id, collegeId: user.collegeId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", user: { ...user._doc, password: undefined }, token });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---- Protected route example ----
app.get("/api/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================== Start Server ==================
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
