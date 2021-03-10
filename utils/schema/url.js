const Joi = require("@hapi/joi");

module.exports = Joi.object({
	url: Joi.string().trim().uri().required(),
	extension: Joi.string()
		.trim()
		.regex(/[\w\-]/i),
});
