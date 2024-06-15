import { assertEquals } from "https://deno.land/std@0.207.0/assert/mod.ts";
import { ProductRepository } from "../repositories/ProductRepository.ts";
import { ReviewRepository } from "../repositories/ReviewRepository.ts";

const productRepository = new ProductRepository();
const productReviewRepository = new ReviewRepository();

Deno.test("getAllProducts should return array of products", async () => {
  const products = await productRepository.getAllProducts();
  assertEquals(Array.isArray(products), true);
});

Deno.test("getProductBySlug should return a product with given slug", async () => {
  const productSlug = "example-slug"; // Substitua pelo slug de um produto existente para um teste real
  const product = await productRepository.getProductBySlug(productSlug);
  assertEquals(product?.slug, productSlug);
});

Deno.test("addProduct should add a new product and return it", async () => {
  const newProduct = {
    name: "Test Product",
    slug: "test-product",
    price: 100,
    description: "This is a test product",
    category: "test-category",
  };

  const addedProduct = await productRepository.addProduct(newProduct);
  assertEquals(addedProduct.name, newProduct.name);
  assertEquals(addedProduct.slug, newProduct.slug);
  assertEquals(addedProduct.price, newProduct.price);
  assertEquals(addedProduct.description, newProduct.description);
  assertEquals(addedProduct.category, newProduct.category);
});

Deno.test("updateProduct should update the product with given id", async () => {
  const productId = "example-id"; // Substitua pelo ID de um produto existente para um teste real
  const updatedData = {
    name: "Updated Product Name",
  };

  const updatedProduct = await productRepository.updateProduct(productId, updatedData);
  assertEquals(updatedProduct.name, updatedData.name);
});

Deno.test("deleteProduct should delete the product with given id", async () => {
  const productId = "example-id"; // Substitua pelo ID de um produto existente para um teste real
  const deletedProduct = await productRepository.deleteProduct(productId);
  assertEquals(deletedProduct.id, productId);
});

Deno.test("getProductsByCategory should return products in a given category", async () => {
  const category = "test-category"; // Substitua pela categoria real para um teste real
  const products = await productRepository.getProductsByCategory(category);
  assertEquals(Array.isArray(products), true);
  if (products.length > 0) {
    assertEquals(products[0].category, category);
  }
});

Deno.test("getProductsOnDiscount should return products with a discount", async () => {
  const products = await productRepository.getProductsOnDiscount();
  assertEquals(Array.isArray(products), true);
  if (products.length > 0) {
    assertEquals(typeof products[0].discount, "number");
  }
});

Deno.test("getAllCategories should return an array of categories", async () => {
  const categories = await productRepository.getAllCategories();
  assertEquals(Array.isArray(categories), true);
});

Deno.test("getBestSellers should return an array of best-selling products", async () => {
  const bestSellers = await productRepository.getBestSellers();
  assertEquals(Array.isArray(bestSellers), true);
});

Deno.test("addReview should add a new review and return it", async () => {
  const newReview = {
    productId: "example-product-id",
    userId: "example-user-id",
    rating: 5,
    comment: "This is a great product!",
  };

  const addedReview = await productReviewRepository.addReview(newReview);
  assertEquals(addedReview.productId, newReview.productId);
  assertEquals(addedReview.userId, newReview.userId);
  assertEquals(addedReview.rating, newReview.rating);
  assertEquals(addedReview.comment, newReview.comment);
});
