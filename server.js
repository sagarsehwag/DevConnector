const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Body Parser Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

app.get("/", (req, res) => {
	res.json({
		success: true,
		message: "Welcome to DevConnector API"
	});
});

// Server Initialisation
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server Started on Port ${PORT}`);
});
