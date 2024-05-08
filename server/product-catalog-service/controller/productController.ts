import { Product } from "../interfaces/product.ts";
import { ProductService } from "../services/productService.ts"

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
        const productId = params.id;
        const product = await this.productService.getProductById(productId);
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
        const productSlug = params.slug;
        const product = await this.productService.getProductBySlug(productSlug);
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

    addProduct = async (
      { request, response }: { request: any; response: any },
    ) => {
      try {
        const body = await request.body();
        const { product, selectedFile } = body.value;
        console.log(product)
        console.log(selectedFile)
  
        // Gerar um novo UUID para o produto
        const productId = crypto.randomUUID();
  
        // Adicionar o UUID gerado ao objeto do produto
        product.id = productId;
  
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
        const productId = params.id;
        const body = await request.body();
        const updatedProduct: Product = body.value;
        const product = await this.productService.updateProduct(productId, updatedProduct);
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
        const productId = params.id;
        const isDeleted = await this.productService.deleteProduct(productId);
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
  }