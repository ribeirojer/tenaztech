import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import authRouter from "./application/routes/authRouters.ts";

const app = new Application();

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

console.log("Servidor rodando na porta 8000");
await app.listen({ port: 8000 });

export { app };
