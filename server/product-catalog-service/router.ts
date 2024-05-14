import { Router } from 'https://deno.land/x/oak/mod.ts';
import { ProductController } from "./controller/productController.ts";
import { ProductService } from './services/productService.ts';

const productService = new ProductService();
const productController = new ProductController(productService);

const router = new Router();

router.get("/", (ctx: { response: { body: string; }; }) => {
  ctx.response.body = "Hello Deno!";
});

router
  .get('/api/products', productController.getAllProducts)
  .get('/api/products/:slug', productController.getProductBySlug)
  .post('/api/products', productController.addProduct)
  .put('/api/products/:id', productController.updateProduct)
  .delete('/api/products/:id', productController.deleteProduct)
  .get('/api/products/search', async (ctx: any) => {
    const name = ctx.request.url.searchParams.get('name');
    ctx.response.body = await productController.searchProductsByName(name);
  })
  .get('/api/products/category/:category', productController.getProductsByCategory)
  .get('/api/products/discounts', productController.getProductsOnDiscount)
  .get('/api/products/categories', productController.getAllCategories)
  .get('/api/best-sellers', productController.getBestSellers);

export default router;
