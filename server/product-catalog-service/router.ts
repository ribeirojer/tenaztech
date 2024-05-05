import { Router } from 'https://deno.land/x/oak/mod.ts';
import { ProductController } from "./controller/productController.ts"
import { ProductService } from './services/productService.ts';

const productService = new ProductService();
const productController = new ProductController(productService);

const router = new Router();

router.get("/", (ctx: { response: { body: string; }; }) => {
  ctx.response.body = "Hello Deno!";
});

router
  .get('/api/products', productController.getAllProducts)
  .get('/api/products/:id', productController.getProductById)
  .post('/api/products', productController.addProduct)
  .put('/api/products/:id', productController.updateProduct)
  .delete('/api/products/:id', productController.deleteProduct);

export default router;