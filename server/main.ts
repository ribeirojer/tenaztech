import { Application } from "https://deno.land/x/oak/mod.ts";
import { EventPublisher } from "./application/services/EventPublisher.ts";
import router from "./routes.ts";

const app = new Application();

// Configurando o EventPublisher
const eventPublisher = new EventPublisher();

// Registrando um handler para o evento de criação de ticket de suporte
eventPublisher.register("SupportTicketCreatedEvent", (event: any) => {
	console.log("Support ticket created:", event);
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
