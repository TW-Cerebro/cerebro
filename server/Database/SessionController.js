const express = require('express');
const router = express.Router();
const { StudySession } = require('./StudentModelv2.js')

//Signup route
router.post('/create', async (req, res) => {
    try {
        const { sessionName, topic, mainPoints, painPoints, notes } = req.body;
        console.log('Console log req.body:', req.body);
        const session = await StudySession.create({
            sessionName,
            topic,
            mainPoints,
            painPoints,
            notes,
        });
        console.log('Console log session', session);

        res.status(201).json({
            success: true,
            message: 'Session created successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating session',
            error: error.message
        });
    }
})

module.exports = router;
