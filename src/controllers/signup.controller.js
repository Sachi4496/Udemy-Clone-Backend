const express = require('express');
const signup = require('../models/signup.model');
const router = express.Router();

router.post("", async (req, res) => {
    try {
        return res.render("signup");

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" })
    }
});

module.exports = router;