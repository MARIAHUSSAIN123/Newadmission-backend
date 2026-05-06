const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Student = require('./models/Student');

const app = express();

// --- MIDDLEWARE ---
app.use(express.json());

// CORS configuration: Ismein aapne apne frontend ka link allow kar diya hai
const cors = require('cors');

const corsOptions = {
    origin: "https://new-admission-frontend.vercel.app", // Sirf apne frontend ko ijazat dein
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // OPTIONS lazmi shamil karein
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Har route par preflight request allow karein
// --- MONGOOSE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Atlas Connected ✅"))
    .catch(err => console.error("MongoDB Connection Error ❌:", err));

// --- API ROUTES ---

// Root route for testing
app.get('/', (req, res) => {
    res.send("Backend is running and connected to Frontend!");
});

// Admission Submission Route
app.post('/api/admission', async (req, res) => {
    try {
        const { fullName, email, course, phone } = req.body;
        
        // Validation check
        if (!fullName || !email || !course || !phone) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newStudent = new Student({ fullName, email, course, phone });
        await newStudent.save();
        
        res.status(201).json({ 
            success: true,
            message: "Admission Form Submitted Successfully! 🚀" 
        });
    } catch (error) {
        console.error("Submission Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// --- SERVER SETUP ---
const PORT = process.env.PORT || 5000;

// Ye check zaroori hai taake local par server chale aur Vercel par function behave kare
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Vercel ke liye export karna zaroori hai
module.exports = app;
