import { supabase } from "../config/supabase.ts";
import { Product } from "../interfaces/product.ts";

export class ProductService {
  async getAllProducts(): Promise<Product[]> {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*');
      if (error) {
        throw new Error(`Erro ao buscar produtos: ${error.message}`);
      }

      return products as Product[];
    } catch (error) {
      throw new Error(`Erro ao buscar produtos: ${error.message}`);
    }
  }

  async getProductById(id: string): Promise<Product | undefined> {
    try {
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        throw new Error(`Erro ao buscar produto: ${error.message}`);
      }

      return product as Product | undefined;
    } catch (error) {
      throw new Error(`Erro ao buscar produto: ${error.message}`);
    }
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    try {
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error) {
        throw new Error(`Erro ao buscar produto: ${error.message}`);
      }

      return product as Product | undefined;
    } catch (error) {
      throw new Error(`Erro ao buscar produto: ${error.message}`);
    }
  }

  async addProduct(product: Product): Promise<Product> {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select('*');
      if (error) {
        throw new Error(`Erro ao adicionar produto: ${error.message}`);
      }

      return data ? data[0] as Product : {} as Product;
    } catch (error) {
      throw new Error(`Erro ao adicionar produto: ${error.message}`);
    }
  }

  async updateProduct(id: string, updatedProduct: Product): Promise<Product | undefined> {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updatedProduct)
        .eq('id', id)
        .select('*');
      if (error) {
        throw new Error(`Erro ao atualizar produto: ${error.message}`);
      }

      return data ? data[0] as Product : undefined;
    } catch (error) {
      throw new Error(`Erro ao atualizar produto: ${error.message}`);
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      if (error) {
        throw new Error(`Erro ao deletar produto: ${error.message}`);
      }

      return true;
    } catch (error) {
      throw new Error(`Erro ao deletar produto: ${error.message}`);
    }
  }

  async searchByName(name: string): Promise<Product[]> {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${name}%`);
      if (error) {
        throw new Error(`Erro ao buscar produtos por nome: ${error.message}`);
      }

      return products as Product[];
    } catch (error) {
      throw new Error(`Erro ao buscar produtos por nome: ${error.message}`);
    }
  }

  async getByCategory(category: string): Promise<Product[]> {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category);
      if (error) {
        throw new Error(`Erro ao buscar produtos por categoria: ${error.message}`);
      }

      return products as Product[];
    } catch (error) {
      throw new Error(`Erro ao buscar produtos por categoria: ${error.message}`);
    }
  }

  async getDiscountedProducts(): Promise<Product[]> {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .gt('discount', 0); // Assumindo que há um campo "discount" no produto
      if (error) {
        throw new Error(`Erro ao buscar produtos em promoção: ${error.message}`);
      }

      return products as Product[];
    } catch (error) {
      throw new Error(`Erro ao buscar produtos em promoção: ${error.message}`);
    }
  }

  async getAllCategories(): Promise<string[]> {
    try {
      const { data: categories, error } = await supabase
        .from('products')
        .select('category')
        .neq('category', null)
        .distinct();
      if (error) {
        throw new Error(`Erro ao buscar categorias de produtos: ${error.message}`);
      }

      return categories.map((item: { category: string }) => item.category);
    } catch (error) {
      throw new Error(`Erro ao buscar categorias de produtos: ${error.message}`);
    }
  }

  async getBestSellers(): Promise<Product[]> {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('sales_count', { ascending: false }) // Assumindo que há um campo "sales_count" no produto
        .limit(10);
      if (error) {
        throw new Error(`Erro ao buscar produtos mais vendidos: ${error.message}`);
      }

      return products as Product[];
    } catch (error) {
      throw new Error(`Erro ao buscar produtos mais vendidos: ${error.message}`);
    }
  }
}
