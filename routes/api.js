const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup API
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required!' });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists!' });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.json({ success: true, message: 'Account created successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Server error during signup' });
    }
});

// Login API
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password!' });
        }
        res.json({ 
            success: true, 
            user: user.username, 
            progress: { score: user.score, correctCount: user.correctCount, wrongCount: user.wrongCount, streak: user.streak } 
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error during login' });
    }
});

// Submit Score API
router.post('/submit-score', async (req, res) => {
    try {
        const { username, correct, difficulty } = req.body;
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        let pointsEarned = 0;
        if (correct) {
            if (difficulty === 'Easy') pointsEarned = 1;
            else if (difficulty === 'Medium') pointsEarned = 2;
            else if (difficulty === 'Hard') pointsEarned = 3;

            user.score += pointsEarned;
            user.correctCount += 1;
            user.streak += 1;
        } else {
            user.wrongCount += 1;
            user.streak = 0;
        }

        await user.save();

        // Get global leaderboard (top 5 users sorted by score)
        const topUsers = await User.find().sort({ score: -1 }).limit(5);
        const leaderboard = topUsers.map(u => ({ username: u.username, score: u.score }));

        res.json({ 
            success: true, 
            progress: { score: user.score, correctCount: user.correctCount, wrongCount: user.wrongCount, streak: user.streak }, 
            pointsEarned, 
            leaderboard 
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error submitting score' });
    }
});

// Get Leaderboard API (Naya route add kiya hai)
router.get('/leaderboard', async (req, res) => {
    try {
        const topUsers = await User.find().sort({ score: -1 }).limit(5);
        const leaderboard = topUsers.map(u => ({ username: u.username, score: u.score }));
        res.json({ success: true, leaderboard });
    } catch (err) {
        res.status(500).json({ error: 'Server error fetching leaderboard' });
    }
});

// AI Mentor API
router.post('/ai-mentor', (req, res) => {
    const { question } = req.body;
    let reply = "AI Mentor: That's a great engineering question! Try breaking it down into smaller components and analyze the time complexity.";
    if (question.toLowerCase().includes('react')) {
        reply = "AI Mentor: In React, state management and component lifecycle are handled using hooks like useState and useEffect.";
    } else if (question.toLowerCase().includes('dbms') || question.toLowerCase().includes('sql')) {
        reply = "AI Mentor: Database indexing significantly speeds up SELECT queries by creating B-tree structures on columns.";
    }
    res.json({ reply });
});

module.exports = router;