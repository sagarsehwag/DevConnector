const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const request = require("request");
const config = require("config");

const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

// @route 	GET api/profile/me
// @desc  	Test Route
// @access 	Public
router.get("/me", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate("user", [
			"name",
			"avatar"
		]);
		if (!profile) {
			return res.status(400).json({ msg: "There is not profile for this user" });
		} else {
			return res.json(profile);
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: "Server Error" });
	}
});

router.post(
	"/",
	auth,
	[
		check("status", "Status is required")
			.not()
			.isEmpty(),
		check("skills", "Skills is required")
			.not()
			.isEmpty()
	],
	async (req, res) => {
		// Error Checking
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin
		} = req.body;

		// Build Profile Object
		let profileFields = { user: req.user.id };
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;

		if (skills) {
			profileFields.skills = skills.split(",").map((skill) => skill.trim());
		}

		// Build Social Object
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (facebook) profileFields.social.facebook = facebook;
		if (twitter) profileFields.social.twitter = twitter;
		if (instagram) profileFields.social.instagram = instagram;
		if (linkedin) profileFields.social.linkedin = linkedin;

		console.log(profileFields.skills);

		try {
			let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				// Update Profile
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);

				return res.json(profile);
			} else {
				// Create Profile
				profile = new Profile(profileFields);
				await profile.save();
				res.json(profile);
			}
		} catch (err) {
			console.log(err);
			res.status(500).json({ msg: "Server Error" });
		}
	}
);

router.get("/", async (req, res) => {
	try {
		const profiles = await Profile.find().populate("user", ["name", "avatar"]);
		res.json(profiles);
	} catch (err) {
		console.log(err);
		res.status(500).json("Server Error");
	}
});

router.get("/user/:user_id", async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", [
			"name",
			"avatar"
		]);

		if (!profile) {
			res.status(400).json({ msg: "Profile not found" });
		} else {
			res.json(profile);
		}
	} catch (err) {
		console.log(err);
		if (err.kind == "ObjectId") {
			res.status(400).json({ msg: "Profile not found" });
		} else {
			res.status(500).json("Server Error");
		}
	}
});

router.delete("/", auth, async (req, res) => {
	try {
		await Post.deleteMany({ user: req.user.id });
		// Remove Profile
		await Profile.findOneAndRemove({ user: req.user.id });
		// Remove User
		await User.findOneAndRemove({ _id: req.user.id });
		res.json({ msg: "User deleted" });
	} catch (err) {
		console.log(err);
		res.status(500).json("Server Error");
	}
});

// @route 	GET api/profile/experience
// @desc  	Add Profile Experience
// @access 	Private
router.put(
	"/experience",
	[
		auth,
		[
			check("title", "Title is required")
				.not()
				.isEmpty(),
			check("company", "Company is required")
				.not()
				.isEmpty(),
			check("from", "From date is required")
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		const { title, company, location, from, to, current, description } = req.body;

		const newExp = { title, company, location, from, to, current, description };

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				profile.experience.unshift(newExp);
				await profile.save();
				res.json(profile);
			} else {
				res.json({
					success: "false",
					message: "Your profile does not exist, First add your Profile"
				});
			}
		} catch (err) {
			console.log(err);
			res.status(500).send("Server Error");
		}
	}
);

// @route 	GET api/profile/experience/:exp_id
// @desc  	Delete Experience from profile
// @access 	Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
	try {
		console.log(req.user);
		const profile = await Profile.findOne({ user: req.user.id });
		if (!profile) {
			res.json({
				success: false,
				message: "Your profile does not exist, First add your Profile"
			});
		}
		// Get remove index
		const removeIndex = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.exp_id);

		profile.experience.splice(removeIndex, 1);
		await profile.save();
		res.json(profile);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

// @route 	GET api/profile/education
// @desc  	Add profile education
// @access 	Private
router.put(
	"/education",
	[
		auth,
		[
			check("school", "School is required")
				.not()
				.isEmpty(),
			check("degree", "Degree is required")
				.not()
				.isEmpty(),
			check("fieldofstudy", "Field of study is required")
				.not()
				.isEmpty(),
			check("from", "From date is required")
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		const { school, degree, fieldofstudy, from, to, current, description } = req.body;

		const newEdu = { school, degree, fieldofstudy, from, to, current, description };

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				profile.education.unshift(newEdu);
				await profile.save();
				res.json(profile);
			} else {
				res.json({
					success: "false",
					message: "Your profile does not exist, First add your Profile"
				});
			}
		} catch (err) {
			console.log(err);
			res.status(500).send("Server Error");
		}
	}
);

// @route 	GET api/profile/education/:edu_id
// @desc  	Delete education from profile
// @access 	Private
router.delete("/education/:edu_id", auth, async (req, res) => {
	try {
		console.log(req.user);
		const profile = await Profile.findOne({ user: req.user.id });
		if (!profile) {
			return res.json({
				success: false,
				message: "Your profile does not exist, First add your Profile"
			});
		}
		// Get remove index
		const removeIndex = profile.education
			.map((item) => item.id)
			.indexOf(req.params.edu_id);

		profile.education.splice(removeIndex, 1);
		await profile.save();
		res.json(profile);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

// @route 	GET api/profile/github/:username
// @desc  	Get user repositories from Github
// @access 	Public
router.get("/github/:username", async (req, res) => {
	try {
		const options = {
			uri: `https://api.github.com/users/${
				req.params.username
			}/repos?per_page=5&sort=created:asc&client_id=${config.get(
				"githubClientId"
			)}&client_secret=${config.get("githubSecret")}`,
			method: "GET",
			headers: { "user-agent": "node.js" }
		};

		request(options, (error, response, body) => {
			if (error) console.log(error);

			if (response.statusCode != 200) {
				return res.status(404).json({ message: "No Github Profile" });
			}

			res.json(JSON.parse(body));
		});
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
