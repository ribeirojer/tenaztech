import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import authRouter from "./application/routes/authRouters.ts";
import productsRouter from "./application/routes/productRoutes.ts";
import orderRouter from "./application/routes/orderRoutes.ts";
import newsletterRouter from "./application/routes/newsletterRoutes.ts";
import supportTicketRouter from "./application/routes/supportTicketRoutes.ts";

const env = await load();
const app = new Application();

app.use(oakCors());

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

app.use(productsRouter.routes());
app.use(productsRouter.allowedMethods());

app.use(orderRouter.routes());
app.use(orderRouter.allowedMethods());

app.use(newsletterRouter.routes());
app.use(newsletterRouter.allowedMethods());

app.use(supportTicketRouter.routes());
app.use(supportTicketRouter.allowedMethods());

const PORT = parseInt(env.PORT || Deno.env.get("PORT") || "8000");

// Iniciar o servidor
console.log(`Servidor ouvindo na porta ${PORT}`);
await app.listen({ port: PORT });

export { app };
