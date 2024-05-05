import { Application } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import router from './router.ts';

const env = await load();

// Roteamento
const app = new Application();

app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = env['PORT'];

// Iniciar o servidor
console.log(`Servidor ouvindo na porta ${PORT}`);
await app.listen({ port: PORT });
