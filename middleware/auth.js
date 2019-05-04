const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
	const token = req.header("x-auth-token");
	if (!token) {
		return res.status(401).json({ msg: "No token, Auhtorization denied" });
	} else {
		try {
			// This verify function will throw an error if the token received is not valid
			const decodedData = jwt.verify(token, config.get("jwtSecret"));
			req.user = decodedData.user;
			next();
		} catch (err) {
			res.status(401).json({ msg: "Token is not valid" });
		}
	}
}

module.exports = auth;
