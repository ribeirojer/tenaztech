import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get("/products", ({ response }) => {
  // Lista todos os produtos
});

router.get("/products/:id", ({ params, response }) => {
  // Obtém detalhes de um produto específico
});

router.post("/products", async ({ request, response }) => {
  // Cria um novo produto
});

// Product routes
router.post("/products", ProductController.add);
router.put("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.remove);
router.get("/products", ProductController.list);
router.get("/products/:id", ProductController.detail);

export default router;
