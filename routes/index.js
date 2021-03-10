const router = require("express").Router();
const path = require("path");

const api = require("./api");

router.use("/api", api);

const db = require("../utils/database/mongo");
const urls = db.get("urls");

const notFoundPath = path.join(__dirname, "../public/404.html");

router.get("/:id", async (req, res, next) => {
	const { id: extension } = req.params;
	try {
		const url = await urls.findOne({ extension });
		if (url) {
			return res.redirect(url.url);
		}
		return res.status(404).sendFile(notFoundPath);
	} catch (error) {
		return res.status(404).sendFile(notFoundPath);
	}
});

module.exports = router;
