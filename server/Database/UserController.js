const express = require('express');
const router = express.Router();
const { User } = require('./StudentModelv2.js')

//Signup route
router.post('/signup', async (req,res) => {
    try {
        const {firstName, lastName, username, email, password, gradeLevel } = req.body;
        console.log('Console log req.body:', req.body);
        const user = await User.create({
            firstName,
            lastName,
            username,
            email,
            password,
            gradeLevel
        });
        console.log('Console log req.body:', user);

        res.status(201).json({
            success: true,
            message: 'User registered successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        });
    }
})

module.exports = router;
