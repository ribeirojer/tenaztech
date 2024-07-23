import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import customerRouter from "./application/routes/customerRoutes.ts";
import orderRouter from "./application/routes/orderRoutes.ts";
import productRouter from "./application/routes/productRoutes.ts";

const app = new Application();

app.use(productRouter.routes());
app.use(productRouter.allowedMethods());

app.use(orderRouter.routes());
app.use(orderRouter.allowedMethods());

app.use(customerRouter.routes());
app.use(customerRouter.allowedMethods());

const router = new Router();
router.get("/", (ctx) => {
	ctx.response.body = "Hello Deno!";
});

app.use(router.routes());
app.use(router.allowedMethods());

router.post("/user", (ctx) => {
	ctx.response.body = "Post!";
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Servidor rodando na porta 8000");
//await app.listen({ port: 8000 });

export { app };
