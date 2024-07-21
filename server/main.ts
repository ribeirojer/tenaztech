import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import productRouter from "./application/routes/productRoutes.ts";
import orderRouter from "./application/routes/orderRoutes.ts";
import customerRouter from "./application/routes/customerRoutes.ts";

const app = new Application();

app.use(productRouter.routes());
app.use(productRouter.allowedMethods());

app.use(orderRouter.routes());
app.use(orderRouter.allowedMethods());

app.use(customerRouter.routes());
app.use(customerRouter.allowedMethods());

console.log("Servidor rodando na porta 8000");
await app.listen({ port: 8000 });

export { app }
