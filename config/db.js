const mongoose = require("mongoose");
const config = require("config");

const mongoURI = config.get("mongoURI");

const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true });
		console.log("MongoDB Atlas Connected");
	} catch (err) {
		console.log(err.message);
		// Exit Proccess with Failiure
		process.exit(1);
	}
};

module.exports = connectDB;
