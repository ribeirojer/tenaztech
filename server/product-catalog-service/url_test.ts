import { assertEquals } from "https://deno.land/std@0.207.0/assert/mod.ts";
import { ProductService } from "./services/productService.ts";
import { Product } from "./interfaces/product.ts";

const productService = new ProductService();
const idTest = crypto.randomUUID();

Deno.test("getAllProducts should return array of products", async () => {
  const products: Product[] = await productService.getAllProducts();
  assertEquals(Array.isArray(products), true);
});

Deno.test("getProductById should return a product with given id", async () => {
  const productId = "1"; // Substitua pelo ID de um produto existente para um teste real
  const product: Product | undefined = await productService.getProductById(productId);
  assertEquals(product?.id, productId);
});

Deno.test("getProductBySlug should return a product with given slug", async () => {
  const productSlug = "some-slug"; // Substitua pelo slug de um produto existente para um teste real
  const product: Product | undefined = await productService.getProductBySlug(productSlug);
  assertEquals(product?.slug, productSlug);
});

Deno.test("addProduct should return the newly added product", async () => {
  const newProduct: Product = {
    id: idTest,
    name: "Google Chromecast",
    description: "Dispositivo de streaming de mídia que transforma sua TV em uma Smart TV, permitindo transmitir conteúdo de diversos serviços de entretenimento.",
    brand: "Google",
    price: 29.99,
    oldprice: 35.99,
    image: "link_para_imagem",
    instock: 90,
    rating: 4.4,
    category: "Eletrônicos / Dispositivos de Streaming",
    slug: "google-chromecast",
    sales_count: 0
  };
  const addedProduct: Product = await productService.addProduct(newProduct);
  assertEquals(addedProduct.id, newProduct.id);
  assertEquals(addedProduct.name, newProduct.name);
  assertEquals(addedProduct.description, newProduct.description);
});

Deno.test("updateProduct should return the updated product", async () => {
  const updatedProduct: Product = {
    id: idTest,
    name: 'Updated Product',
    description: 'Updated Description',
    brand: "Updated Brand",
    price: 49.99,
    oldprice: 59.99,
    image: "updated_link_para_imagem",
    instock: 100,
    rating: 4.7,
    category: "Updated Category",
    slug: "updated-product",
    sales_count: 0
  };
  const product: Product | undefined = await productService.updateProduct(idTest, updatedProduct);
  assertEquals(product?.id, updatedProduct.id);
  assertEquals(product?.name, updatedProduct.name);
  assertEquals(product?.description, updatedProduct.description);
});

Deno.test("deleteProduct should return true when product is deleted", async () => {
  const isDeleted: boolean = await productService.deleteProduct(idTest);
  assertEquals(isDeleted, true);
});

Deno.test("searchByName should return products with the given name", async () => {
  const name = "Chromecast"; // Substitua pelo nome de um produto existente para um teste real
  const products: Product[] = await productService.searchByName(name);
  assertEquals(products.length > 0, true);
  products.forEach(product => {
    assertEquals(product.name.includes(name), true);
  });
});

Deno.test("getByCategory should return products in the given category", async () => {
  const category = "Eletrônicos"; // Substitua pela categoria de um produto existente para um teste real
  const products: Product[] = await productService.getByCategory(category);
  assertEquals(products.length > 0, true);
  products.forEach(product => {
    assertEquals(product.category, category);
  });
});

Deno.test("getDiscountedProducts should return products with discounts", async () => {
  const products: Product[] = await productService.getDiscountedProducts();
  assertEquals(products.length > 0, true);
  products.forEach(product => {
    assertEquals(product.oldprice > product.price, true);
  });
});

Deno.test("getAllCategories should return an array of categories", async () => {
  const categories: string[] = await productService.getAllCategories();
  assertEquals(Array.isArray(categories), true);
  assertEquals(categories.length > 0, true);
});

Deno.test("getBestSellers should return an array of best-selling products", async () => {
  const products: Product[] = await productService.getBestSellers();
  assertEquals(Array.isArray(products), true);
  assertEquals(products.length > 0, true);
  // Assumindo que há um campo "sales_count" para verificar se são realmente os mais vendidos
  products.forEach(product => {
    assertEquals(typeof product.sales_count, 'number');
  });
});
