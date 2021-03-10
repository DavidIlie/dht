const router = require("express").Router();
const { nanoid } = require("nanoid");

const db = require("../../utils/database/mongo");
const urls = db.get("urls");

const urlSchema = require("../../utils/schema/url");

router.get("/", (req, res) => {
	res.json({
		message: "API",
	});
});

router.post("/url", async (req, res, next) => {
	try {
		const body = await urlSchema.validateAsync(req.body);
		let { url, extension } = body;
		if (url.includes("dht.ro")) {
			throw new Error("Stop it. You're not funny.");
		}
		if (!extension) {
			extension = nanoid(5);
		} else {
			const existing = await urls.findOne({ extension });
			if (existing) {
				throw new Error("Extension in use.");
			}
		}
		extension = extension.toLowerCase();
		const newUrl = {
			url,
			extension,
		};
		const created = await urls.insert(newUrl);
		res.json(created);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
