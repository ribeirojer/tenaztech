import { Router } from "https://deno.land/x/oak/mod.ts";
import { InventoryController } from "./controller/InventoryController.ts";
import { ReviewController } from "./controller/ReviewController.ts";
import { ProductController } from "./controller/productController.ts";
import { InventoryRepository } from "./repositories/InventoryRepository.ts";
import { ProductRepository } from "./repositories/ProductRepository.ts";
import { ReviewRepository } from "./repositories/ReviewRepository.ts";

const productRepository = new ProductRepository();
const productController = new ProductController(productRepository);

const inventoryRepository = new InventoryRepository();
const inventoryController = new InventoryController(inventoryRepository);

const reviewRepository = new ReviewRepository();
const reviewController = new ReviewController(reviewRepository);

const router = new Router();

router.get("/", (ctx: { response: { body: string } }) => {
	ctx.response.body = "Product Service";
});

// Rotas de Produtos
router
	.get("/api/products", productController.getAllProducts)
	.get("/api/products/:slug", productController.getProductBySlug)
	.post("/api/products", productController.addProduct)
	.put("/api/products/:id", productController.updateProduct)
	.delete("/api/products/:id", productController.deleteProduct)
	.get("/api/products/search", productController.searchProductsByName)
	.get(
		"/api/products/category/:category",
		productController.getProductsByCategory,
	)
	.get("/api/products/discounts", productController.getProductsOnDiscount)
	.get("/api/products/categories", productController.getAllCategories)
	.get("/api/best-sellers", productController.getBestSellers)
	.get(
		"/api/products/recommendations",
		productController.getRecommendedProducts,
	)
	.get("/api/products/price-range", productController.getProductsByPriceRange)
	.get("/api/products/on-sale", productController.getProductsOnSale)
	.get("/api/products/details/:id", productController.getProductDetails)
	.get("/api/products/new-arrivals", productController.getNewArrivals);

// Rotas de Inventário
router
	.get("/api/inventory/:productId", inventoryController.getStockLevel)
	.get("/api/inventory", inventoryController.getAllStockLevels)
	.put("/api/inventory/:productId", inventoryController.updateStockLevel)
	.patch(
		"/api/inventory/:productId/adjust",
		inventoryController.adjustStockLevel,
	)
	.get(
		"/api/inventory/availability/:productId",
		inventoryController.checkAvailability,
	)
	.get("/api/inventory/availability", inventoryController.getAllAvailability)
	.post("/api/inventory/alerts", inventoryController.setLowStockAlert)
	.get("/api/inventory/low-stock", inventoryController.getLowStockProducts);

// Rotas de Avaliações de Produtos
router
	.post("/api/products/:productId/reviews", reviewController.addReview)
	.get("/api/products/:productId/reviews", reviewController.getReviews)
	.put(
		"/api/products/:productId/reviews/:reviewId",
		reviewController.updateReview,
	)
	.delete(
		"/api/products/:productId/reviews/:reviewId",
		reviewController.deleteReview,
	);

export default router;
