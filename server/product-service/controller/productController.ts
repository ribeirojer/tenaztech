import type { IResponse } from "../interfaces/Response.ts";
import type { Product } from "../interfaces/product.ts";
import type { ProductRepository } from "../repositories/ProductRepository.ts";
import { logger } from "../utils/logger.ts";

// Controller - Lida com as requisições HTTP e respostas
export class ProductController {
	constructor(private productRepository: ProductRepository) {}

	getAllProducts = async ({ response }: { response: IResponse }) => {
		try {
			logger.info("Fetching all products");
			response.body = await this.productRepository.getAllProducts();
			logger.debug("All products fetched successfully");
		} catch (error) {
			logger.error(`Error fetching products: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao buscar produtos" };
		}
	};

	getProductById = async ({
		params,
		response,
	}: { params: { id: string }; response: IResponse }) => {
		try {
			logger.info(`Fetching product with ID: ${params.id}`);
			const product = await this.productRepository.getProductById(params.id);
			if (product) {
				response.body = product;
				logger.debug(`Product with ID: ${params.id} fetched successfully`);
			} else {
				response.status = 404;
				response.body = { message: "Produto não encontrado" };
				logger.warn(`Product with ID: ${params.id} not found`);
			}
		} catch (error) {
			logger.error(`Error fetching product by ID: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao buscar o produto por ID" };
		}
	};

	getProductBySlug = async ({
		params,
		response,
	}: { params: { slug: string }; response: IResponse }) => {
		try {
			logger.info(`Fetching product with slug: ${params.slug}`);
			const product = await this.productRepository.getProductBySlug(
				params.slug,
			);
			if (product) {
				response.body = product;
				logger.debug(`Product with slug: ${params.slug} fetched successfully`);
			} else {
				response.status = 404;
				response.body = { message: "Produto não encontrado" };
				logger.warn(`Product with slug: ${params.slug} not found`);
			}
		} catch (error) {
			logger.error(`Error fetching product by slug: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao buscar o produto por slug" };
		}
	};

	addProduct = async ({
		request,
		response,
	}: { request: any; response: IResponse }) => {
		try {
			logger.info("Adding new product");
			const body = await request.body();
			const product: Product = body.value;
			product.id = crypto.randomUUID();
			const newProduct = await this.productRepository.addProduct(product);
			response.status = 201;
			response.body = newProduct;
			logger.debug("New product added successfully");
		} catch (error) {
			logger.error(`Error adding product: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao adicionar o produto" };
		}
	};

	updateProduct = async ({
		params,
		request,
		response,
	}: {
		params: { id: string };
		request: any;
		response: any;
	}) => {
		try {
			logger.info(`Updating product with ID: ${params.id}`);
			const body = await request.body();
			const updatedProduct: Product = body.value;
			const product = await this.productRepository.updateProduct(
				params.id,
				updatedProduct,
			);
			if (product) {
				response.body = product;
				logger.debug(`Product with ID: ${params.id} updated successfully`);
			} else {
				response.status = 404;
				response.body = { message: "Produto não encontrado para atualização" };
				logger.warn(`Product with ID: ${params.id} not found for update`);
			}
		} catch (error) {
			logger.error(`Error updating product: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao atualizar o produto" };
		}
	};

	deleteProduct = async ({
		params,
		response,
	}: { params: { id: string }; response: IResponse }) => {
		try {
			logger.info(`Deleting product with ID: ${params.id}`);
			const isDeleted = await this.productRepository.deleteProduct(params.id);
			if (isDeleted) {
				response.body = { message: "Produto deletado com sucesso" };
				logger.debug(`Product with ID: ${params.id} deleted successfully`);
			} else {
				response.status = 404;
				response.body = { message: "Produto não encontrado para exclusão" };
				logger.warn(`Product with ID: ${params.id} not found for deletion`);
			}
		} catch (error) {
			logger.error(`Error deleting product: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao excluir o produto" };
		}
	};

	searchProductsByName = async ({
		request,
		response,
	}: { request: any; response: IResponse }) => {
		try {
			const name = request.url.searchParams.get("name");
			if (!name) {
				response.status = 400;
				response.body = { message: "Nome não fornecido" };
				logger.warn("Product name not provided for search");
				return;
			}
			logger.info(`Searching products by name: ${name}`);
			response.body = await this.productRepository.searchProductsByName(name);
			logger.debug(`Products with name: ${name} fetched successfully`);
		} catch (error) {
			logger.error(`Error searching products by name: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao buscar produtos por nome" };
		}
	};

	getProductsByCategory = async ({
		params,
		response,
	}: { params: { category: string }; response: IResponse }) => {
		try {
			logger.info(`Fetching products by category: ${params.category}`);
			response.body = await this.productRepository.getProductsByCategory(
				params.category,
			);
			logger.debug(
				`Products in category: ${params.category} fetched successfully`,
			);
		} catch (error) {
			logger.error(`Error fetching products by category: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao buscar produtos por categoria" };
		}
	};

	getProductsOnDiscount = async ({ response }: { response: IResponse }) => {
		try {
			logger.info("Fetching products on discount");
			response.body = await this.productRepository.getProductsOnDiscount();
			logger.debug("Products on discount fetched successfully");
		} catch (error) {
			logger.error(`Error fetching products on discount: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao buscar produtos em promoção" };
		}
	};

	getAllCategories = async ({ response }: { response: IResponse }) => {
		try {
			logger.info("Fetching all product categories");
			response.body = await this.productRepository.getAllCategories();
			logger.debug("All categories fetched successfully");
		} catch (error) {
			logger.error(`Error fetching product categories: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao buscar categorias de produtos" };
		}
	};

	getBestSellers = async ({ response }: { response: IResponse }) => {
		try {
			logger.info("Fetching best sellers");
			response.body = await this.productRepository.getBestSellers();
			logger.debug("Best sellers fetched successfully");
		} catch (error) {
			logger.error(`Error fetching best sellers: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao buscar produtos mais vendidos" };
		}
	};

	getRecommendedProducts = async ({ response }: { response: IResponse }) => {
		try {
			logger.info("Fetching recommended products");
			response.body = await this.productRepository.getRecommendedProducts();
			logger.debug("Recommended products fetched successfully");
		} catch (error) {
			logger.error(`Error fetching recommended products: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao buscar produtos recomendados" };
		}
	};

	getProductsByPriceRange = async ({
		request,
		response,
	}: { request: any; response: IResponse }) => {
		try {
			const minPrice = Number.parseFloat(
				request.url.searchParams.get("minPrice") || "0",
			);
			const maxPrice = Number.parseFloat(
				request.url.searchParams.get("maxPrice") || "Infinity",
			);
			logger.info(
				`Fetching products with price range: ${minPrice} - ${maxPrice}`,
			);
			response.body = await this.productRepository.getProductsByPriceRange(
				minPrice,
				maxPrice,
			);
			logger.debug(
				`Products in price range: ${minPrice} - ${maxPrice} fetched successfully`,
			);
		} catch (error) {
			logger.error(`Error fetching products by price range: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao buscar produtos por faixa de preço" };
		}
	};

	getProductsOnSale = async ({ response }: { response: IResponse }) => {
		try {
			logger.info("Fetching products on sale");
			response.body = await this.productRepository.getProductsOnSale();
			logger.debug("Products on sale fetched successfully");
		} catch (error) {
			logger.error(`Error fetching products on sale: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao buscar produtos em promoção" };
		}
	};

	getProductDetails = async ({
		params,
		response,
	}: { params: { id: string }; response: IResponse }) => {
		try {
			logger.info(`Fetching product details for ID: ${params.id}`);
			response.body = await this.productRepository.getProductDetails(params.id);
			logger.debug(`Product details for ID: ${params.id} fetched successfully`);
		} catch (error) {
			logger.error(`Error fetching product details: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao buscar detalhes do produto" };
		}
	};

	getNewArrivals = async ({ response }: { response: IResponse }) => {
		try {
			logger.info("Fetching new arrivals");
			response.body = await this.productRepository.getNewArrivals();
			logger.debug("New arrivals fetched successfully");
		} catch (error) {
			logger.error(`Error fetching new arrivals: ${error.message}`);
			response.status = 500;
			response.body = { message: "Erro ao buscar novos produtos" };
		}
	};
}
