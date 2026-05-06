const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Student = require('./models/Student');

const app = express();

// --- CORS Configuration (Sabse Zaroori) ---
app.use(cors()); // Ye default har jagah se request allow karega
app.options('*', cors()); // Preflight requests ke liye lazmi hai

app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Atlas Connected ✅"))
    .catch(err => console.error("MongoDB Error ❌:", err));

// --- API Routes ---
app.get('/', (req, res) => res.send("Backend is live!"));

app.post('/api/admission', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json({ message: "Admission Form Submitted Successfully!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
