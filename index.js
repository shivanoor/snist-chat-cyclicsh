import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Connection from "./database/db.js";
import route from "./routes/route.js";
import dotenv from "dotenv";
import path from "node:path";
dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", route);

/// deploymen

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
	res.sendFile(
		path.join(__dirname, "./client/build/index.html"),
		function (err) {
			res.status(500).send(err);
		}
	);
});

// deployment
Connection();

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
	console.log("server Successfully running on port " + PORT);
});
