require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${mongo_username}:${mongo_password}@rambas.0w1tj.mongodb.net/?retryWrites=true&w=majority&appName=RAMBAS`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define Schema
const healthSchema = new mongoose.Schema({
    name: String,
    date: String,
    wakeup: String,
    workout: Number,
    breakfast: String,
    prelunch: String,
    lunch: String,
    midday: String,
    dinner: String,
    bed: String,
    alcohol: String,
    tobacco: String,
    water: Number,
    tea: Number
});

const HealthData = mongoose.model("HealthData", healthSchema);

// POST route to save form data
app.post("/api/save", async (req, res) => {
    try {
        const newEntry = new HealthData(req.body);
        await newEntry.save();
        res.status(201).json({ message: "Data saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
