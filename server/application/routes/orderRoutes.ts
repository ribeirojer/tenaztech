import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get("/orders", ({ response }) => {
  // Lista todos os pedidos
});

router.post("/orders", async ({ request, response }) => {
  // Cria um novo pedido
});


const router = new Router();

// Order routes
router.post("/orders", OrderController.create);
router.put("/orders/:id", OrderController.update);
router.delete("/orders/:id", OrderController.cancel);
router.get("/orders", OrderController.list);
router.get("/orders/:id", OrderController.detail);


export default router;
