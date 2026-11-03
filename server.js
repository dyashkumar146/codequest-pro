const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Serve static frontend files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://brainquest:brainout@cluster0.7xhd7rw.mongodb.net/codequest-pro?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI)
    .then(() => console.log('📦 Connected to MongoDB successfully!'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Mount modular API routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`🚀 CodeQuest Pro Full-Stack Server running on http://localhost:${PORT}`);
});