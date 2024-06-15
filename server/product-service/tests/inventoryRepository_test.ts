import { assertEquals } from "https://deno.land/std@0.207.0/assert/mod.ts";
import { InventoryRepository } from "../repositories/InventoryRepository.ts";

const inventoryRepository = new InventoryRepository();

Deno.test("getStockLevels should return stock levels for all products", async () => {
  const stockLevels = await inventoryRepository.getStockLevels();
  assertEquals(Array.isArray(stockLevels), true);
});

Deno.test("updateStock should update the stock level for a given product", async () => {
  const productId = "example-product-id"; // Substitua pelo ID de um produto existente para um teste real
  const newStockLevel = 50;

  const updatedStock = await inventoryRepository.updateStock(productId, newStockLevel);
  assertEquals(updatedStock.productId, productId);
  assertEquals(updatedStock.stockLevel, newStockLevel);
});

Deno.test("getProductAvailability should return availability of a given product", async () => {
  const productId = "example-product-id"; // Substitua pelo ID de um produto existente para um teste real

  const productAvailability = await inventoryRepository.getProductAvailability(productId);
  assertEquals(productAvailability.productId, productId);
  assertEquals(typeof productAvailability.available, "boolean");
});

Deno.test("preventSaleOfOutOfStockProducts should prevent sale of out-of-stock products", async () => {
  const productId = "example-product-id"; // Substitua pelo ID de um produto existente para um teste real

  const result = await inventoryRepository.preventSaleOfOutOfStockProducts(productId);
  assertEquals(typeof result.allowed, "boolean");
  if (!result.allowed) {
    assertEquals(result.message, "Product is out of stock");
  }
});
