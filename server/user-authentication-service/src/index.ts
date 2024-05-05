import { Elysia } from "elysia";
import AuthRoutes from "./routes/AuthRoutes";
import { cors } from '@elysiajs/cors'

const app = new Elysia().get("/", () => "Hello Elysia")

app.use(AuthRoutes)

const port = process.env.PORT as string;

app.use(cors())
  .listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export { app }
