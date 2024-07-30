import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import authRouter from "./application/routes/authRouters.ts";
import productsRouter from "./application/routes/productRoutes.ts";
import orderRouter from "./application/routes/orderRoutes.ts";

const app = new Application();

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

app.use(productsRouter.routes());
app.use(productsRouter.allowedMethods());

app.use(orderRouter.routes());
app.use(orderRouter.allowedMethods());

console.log("Servidor rodando na porta 8000");
await app.listen({ port: 8000 });

export { app };
