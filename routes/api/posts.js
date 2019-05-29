// Package Imports
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

// Custom Imports
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route 	POST api/posts
// @desc  	Create a post
// @access 	Private
router.post(
	"/",
	[
		auth,
		check("text", "Text is required")
			.not()
			.isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

		try {
			const user = await User.findById(req.user.id).select("-password");

			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			});

			const post = await newPost.save();
			res.json(post);
		} catch (err) {
			console.log(err);
			res.status(500).send("Server Error");
		}
	}
);

// @route 	GET api/posts
// @desc  	Get all posts
// @access 	Private
router.get("/", auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

// @route 	GET api/posts/:id
// @desc  	Get post by ID
// @access 	Private
router.get("/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ success: false, message: "Post not found" });
		}
		res.json(post);
	} catch (err) {
		if (err.kind == "ObjectId") {
			return res.status(404).json({ success: false, message: "Post not found" });
		}
		console.log(err);
		res.status(500).send("Server Error");
	}
});

// @route 	DELETE api/post/:id
// @desc  	Delete a post by ID
// @access 	Private
router.delete("/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ success: false, message: "Post not found" });
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ success: false, message: "User not authorized" });
		}
		await post.remove();

		res.json({ success: true, message: "Post Removed" });
	} catch (err) {
		if (err.kind == "ObjectId") {
			return res.status(404).json({ success: false, message: "Post not found" });
		}
		console.log(err);
		res.status(500).send("Server Error");
	}
});

// @route 	PUT api/post/like/:id
// @desc  	Like a post
// @access 	Private
router.put("/like/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		// Check if the post has already been liked by the user

		if (post.likes.filter((like) => like.user.toString() == req.user.id).length > 0) {
			return res.status(400).json({ success: false, message: "Post already liked" });
		}

		post.likes.unshift({ user: req.user.id });
		await post.save();
		res.json(post.likes);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: "Server Error"
		});
	}
});

// @route 	PUT api/post/unlike/:id
// @desc  	Unlike a post
// @access 	Private
router.put("/unlike/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		// Check if the post has already been liked by the user

		if (post.likes.filter((like) => like.user.toString() == req.user.id).length === 0) {
			return res.status(400).json({ success: false, message: "Post has not yet been liked" });
		}

		const removeIndex = post.likes.map((like) => like.user.toString()).indexOf(req.user.id);
		post.likes.splice(removeIndex, 1);

		await post.save();
		res.json(post.likes);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: "Server Error"
		});
	}
});

// @route 	POST api/posts/comment/:id
// @desc  	Comment on a post
// @access 	Private
router.post(
	"/comment/:id",
	[
		auth,
		check("text", "Text is required")
			.not()
			.isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

		try {
			const user = await User.findById(req.user.id).select("-password");
			const post = await Post.findById(req.params.id);

			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			};

			post.comments.unshift(newComment);
			await post.save();
			res.json(post.comments);
		} catch (err) {
			console.log(err);
			res.status(500).send("Server Error");
		}
	}
);

// @route 	DELETE api/posts/comment/:id/:comment_id
// @desc  	Delete a comment
// @access 	Private
router.delete("/comment/:id/:commentId", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		const comment = post.comments.find((comment) => comment.id === req.params.commentId);

		if (!comment) {
			return res.status(404).json({ success: false, message: "Comment does not exist" });
		}

		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ success: false, message: "user not authorized" });
		}

		const removeIndex = post.comments.map((comment) => comment.user.toString()).indexOf(req.user.id);
		post.comments.splice(removeIndex, 1);

		await post.save();
		res.json(post.comments);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
