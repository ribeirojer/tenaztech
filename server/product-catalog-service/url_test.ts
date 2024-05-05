import { assertEquals } from "https://deno.land/std@0.207.0/assert/mod.ts";
import { ProductService } from "./services/productService.ts";
import { Product } from "./interfaces/product.ts";

const idTest = crypto.randomUUID()

Deno.test("getAllProducts should return array of products", async () => {
    const productService = new ProductService();
    const products: Product[] = await productService.getAllProducts();
    assertEquals(Array.isArray(products), true);
});

Deno.test("getProductById should return a product with given id", async () => {
    const productService = new ProductService();
    const productId = "1";
    const product: Product | undefined = await productService.getProductById(productId);
    assertEquals(product?.id, productId);
});

Deno.test("addProduct should return the newly added product", async () => {
    const productService = new ProductService();
    const newProduct: Product = {
        id: "16",
        name: "Google Chromecast",
        description: "Dispositivo de streaming de mídia que transforma sua TV em uma Smart TV, permitindo transmitir conteúdo de diversos serviços de entretenimento.",
        brand: "Google",
        price: 29.99,
        oldprice: 35.99,
        image: "link_para_imagem",
        instock: 90,
        rating: 4.4,
        category: "Eletrônicos / Dispositivos de Streaming"
      }
    const addedProduct: Product = await productService.addProduct(newProduct);
    assertEquals(addedProduct.id, newProduct.id);
    assertEquals(addedProduct.name, newProduct.name);
    assertEquals(addedProduct.description, newProduct.description);
});

Deno.test("updateProduct should return the updated product", async () => {
    const productService = new ProductService();
    const productId = idTest;
    const updatedProduct: Product = {
      id: productId,
      name: 'Updated Product',
      description: 'Updated Description',
      brand: "",
      price: 0,
      oldprice: 0,
      image: "",
      instock: 0,
      rating: 0,
      category: ""
    };
    const product: Product | undefined = await productService.updateProduct(idTest, updatedProduct);
    assertEquals(product?.id, updatedProduct.id);
    assertEquals(product?.name, updatedProduct.name);
    assertEquals(product?.description, updatedProduct.description);
});

Deno.test("deleteProduct should return true when product is deleted", async () => {
    const productService = new ProductService();
    const productId = idTest;
    const isDeleted: boolean = await productService.deleteProduct(productId);
    assertEquals(isDeleted, true);
});
