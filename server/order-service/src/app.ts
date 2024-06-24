import bodyParser from "body-parser";
import cors from "cors";
import express, { type Application } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import routes from "./routes";

const app: Application = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler);

app.use("/api", routes);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

export { app };
