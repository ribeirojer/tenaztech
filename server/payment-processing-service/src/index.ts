import { Elysia, t } from "elysia";
import { PreferenceController } from "./controllers/paymentController";

const app = new Elysia();

app.get("/", () => "Hello Elysia")
 .post('/preference', PreferenceController.createPreference , {
  body: t.Object({
    items: t.Array(t.Object({
      title: t.String(),
      quantity: t.Number(),
      currency_id: t.String(),
      unit_price: t.Number()
    }))
  })})

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
export { app }