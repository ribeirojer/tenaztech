import { Product } from "../interfaces/product.ts";
import { ProductService } from "../services/productService.ts";

// Controller - Lida com as requisições HTTP e respostas
export class ProductController {
  constructor(private productService: ProductService) {}

  getAllProducts = async ({ response }: { response: any }) => {
    try {
      response.body = await this.productService.getAllProducts();
    } catch (error) {
      response.status = 500;
      response.body = { message: 'Erro ao buscar produtos' };
    }
  };

  getProductById = async (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    try {
      const product = await this.productService.getProductById(params.id);
      if (product) {
        response.body = product;
      } else {
        response.status = 404;
        response.body = { message: 'Produto não encontrado' };
      }
    } catch (error) {
      response.status = 500;
      response.body = { message: 'Erro ao buscar o produto por ID' };
    }
  };

  getProductBySlug = async (
    { params, response }: { params: { slug: string }; response: any },
  ) => {
    try {
      const product = await this.productService.getProductBySlug(params.slug);
      if (product) {
        response.body = product;
      } else {
        response.status = 404;
        response.body = { message: 'Produto não encontrado' };
      }
    } catch (error) {
      response.status = 500;
      response.body = { message: 'Erro ao buscar o produto por slug' };
    }
  };

  addProduct = async (
    { request, response }: { request: any; response: any },
  ) => {
    try {
      const body = await request.body();
      const product: Product = body.value;

      // Gerar um novo UUID para o produto
      product.id = crypto.randomUUID();

      // Chamar o serviço para adicionar o produto ao banco de dados
      const newProduct = await this.productService.addProduct(product);

      response.status = 201;
      response.body = newProduct;
    } catch (error) {
      response.status = 500;
      response.body = { message: 'Erro ao adicionar o produto' };
    }
  };

  updateProduct = async (
    { params, request, response }: {
      params: { id: string };
      request: any;
      response: any;
    },
  ) => {
    try {
      const body = await request.body();
      const updatedProduct: Product = body.value;
      const product = await this.productService.updateProduct(params.id, updatedProduct);
      if (product) {
        response.body = product;
      } else {
        response.status = 404;
        response.body = { message: 'Produto não encontrado para atualização' };
      }
    } catch (error) {
      response.status = 500;
      response.body = { message: 'Erro ao atualizar o produto' };
    }
  };

  deleteProduct = async (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    try {
      const isDeleted = await this.productService.deleteProduct(params.id);
      if (isDeleted) {
        response.body = { message: 'Produto deletado com sucesso' };
      } else {
        response.status = 404;
        response.body = { message: 'Produto não encontrado para exclusão' };
      }
    } catch (error) {
      response.status = 500;
      response.body = { message: 'Erro ao excluir o produto' };
    }
  };

  searchProductsByName = async (
    { request, response }: { request: any; response: any },
  ) => {
    try {
      const name = request.url.searchParams.get('name');
      if (!name) {
        response.status = 400;
        response.body = { message: 'Nome não fornecido' };
        return;
      }
      response.body = await this.productService.searchByName(name);
    } catch (error) {
      response.status = 500;
      response.body = { message: 'Erro ao buscar produtos por nome' };
    }
  };

  getProductsByCategory = async (
    { params, response }: { params: { category: string }; response: any },
  ) => {
    try {
      response.body = await this.productService.getByCategory(params.category);
    } catch (error) {
      response.status = 500;
      response.body = { message: 'Erro ao buscar produtos por categoria' };
    }
  };

  getProductsOnDiscount = async ({ response }: { response: any }) => {
    try {
      response.body = await this.productService.getDiscountedProducts();
    } catch (error) {
      response.status = 500;
      response.body = { message: 'Erro ao buscar produtos em promoção' };
    }
  };

  getAllCategories = async ({ response }: { response: any }) => {
    try {
      response.body = await this.productService.getAllCategories();
    } catch (error) {
      response.status = 500;
      response.body = { message: 'Erro ao buscar categorias de produtos' };
    }
  };

  getBestSellers = async ({ response }: { response: any }) => {
    try {
      response.body = await this.productService.getBestSellers();
    } catch (error) {
      response.status = 500;
      response.body = { message: 'Erro ao buscar produtos mais vendidos' };
    }
  };
}
