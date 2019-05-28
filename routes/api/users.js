const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");

// @Description - Register New User
router.post(
	"/",
	[
		check("name", "Name is required")
			.not()
			.isEmpty(),
		check("email", "Enter a valid E-Mail").isEmail(),
		check("password", "Please enter a password with 6 or more characters").isLength({
			min: 6,
			max: 32
		})
	],
	async (req, res) => {
		// Check for validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email: email });
			if (user) {
				return res.status(400).json({ errors: [{ msg: "User already exist" }] });
			}

			// Creating user object, encrypting password & saving it in the database
			const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
			user = new User({ name, email, avatar, password });
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();

			// Creating JSONWebToken and sending it to front end
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
