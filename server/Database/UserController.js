const express = require('express');
const router = express.Router();
const { User } = require('./StudentModelv2.js')

//Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    User.find({ username: username, password: password })
    .then(data => {
        console.log(data);
        if (data.length === 0) {
            return res.status(201).json(false);
        };
        return res.status(201).json(true); 
    })
    .catch(err => {
        return res.status(500).json({
            success: false,
            message: 'Error loging in.',
            error: err.message
        });
    })
  });

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
