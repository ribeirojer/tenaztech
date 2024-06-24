import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import AuthRoutes from "./routes/AuthRoutes";
import UserRoutes from "./routes/UserRoutes";

const app = new Elysia().get("/", () => "User Service");

app.use(cors())
.use(AuthRoutes)
.use(UserRoutes);

const port = process.env.PORT as string;

app.listen(port);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export { app };
