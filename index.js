const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Student = require('./models/Student');

const app = express();

// ✅ CORS FIX (strong version)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

app.use(express.json());

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch(err => console.error(err));

// ✅ Routes
app.get('/', (req, res) => res.send("Backend is live!"));

app.post('/api/admission', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: "Admission Form Submitted Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Vercel FIX (MOST IMPORTANT)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

module.exports = app;
