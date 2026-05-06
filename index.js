const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Student = require('./models/Student');

const app = express();

// ✅ CORS FIX (important)
app.use(cors({
    origin: "https://new-admission-frontend.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.error("MongoDB Error ❌:", err));

// ✅ Test Route
app.get('/', (req, res) => {
    res.send("Backend is live!");
});

// ✅ Admission Route
app.post('/api/admission', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();

        res.status(201).json({
            message: "Form submitted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Server error"
        });
    }
});

// ❌ Vercel pe listen nahi lagate
// app.listen(...)

// ✅ EXPORT (VERY IMPORTANT)
module.exports = app;
