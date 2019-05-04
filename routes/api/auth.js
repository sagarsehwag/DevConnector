const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");

// @route 	GET api/auth
// @desc  	Test Route
// @access 	Public
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: "Server Error" });
	}
});

// @Description - Register New User
router.post(
	"/",
	[
		check("email", "Enter a valid E-Mail").isEmail(),
		check("password", "Password is required").exists()
	],
	async (req, res) => {
		// Check for validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			// Find User
			let user = await User.findOne({ email: email });
			if (!user) {
				return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
			}

			// Checking for password
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
			}

			// JWT Logic
			const payload = { user: { id: user.id } };
			jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.error(err);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
