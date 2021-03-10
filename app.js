const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");

const routes = require("./routes");

const middlewares = require("./utils/middlewares");

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`App running at http://localhost:${port}`);
});

app.use(express.static("./public"));

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use("/", routes);

app.use(middlewares.errorHandler);
