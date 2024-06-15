import { supabase } from "../config/supabase.ts";

export class InventoryRepository {
  async getStockLevel(productId: string) {
    const { data, error } = await supabase.from('inventory').select('quantity').eq('product_id', productId).single();
    if (error) throw error;
    return data;
  }

  async getAllStockLevels() {
    const { data, error } = await supabase.from('inventory').select('*');
    if (error) throw error;
    return data;
  }

  async updateStockLevel(productId: string, quantity: number) {
    const { data, error } = await supabase.from('inventory').update({ quantity }).eq('product_id', productId).single();
    if (error) throw error;
    return data;
  }

  async adjustStockLevel(productId: string, quantity: number) {
    const { data, error } = await supabase.rpc('adjust_stock_level', { product_id: productId, quantity });
    if (error) throw error;
    return data;
  }

  async checkAvailability(productId: string) {
    const { data, error } = await supabase.from('inventory').select('quantity').eq('product_id', productId).single();
    if (error) throw error;
    return data.quantity > 0;
  }

  async getAllAvailability() {
    const { data, error } = await supabase.from('inventory').select('*');
    if (error) throw error;
    return data;
  }

  async setLowStockAlert(productId: string, threshold: number) {
    const { data, error } = await supabase.from('inventory_alerts').insert({ product_id: productId, threshold }).single();
    if (error) throw error;
    return data;
  }

  async getLowStockProducts() {
    const { data, error } = await supabase.from('inventory').select('*').lte('quantity', 'threshold');
    if (error) throw error;
    return data;
  }

  async getProductAvailability(productId: string) {
    const { data, error } = await supabase.from("inventory").select("stock_level").eq("product_id", productId).single();
    if (error) throw error;
    return { productId, available: data.stock_level > 0 };
  }

  async preventSaleOfOutOfStockProducts(productId: string) {
    const { data, error } = await supabase.from("inventory").select("stock_level").eq("product_id", productId).single();
    if (error) throw error;
    return { allowed: data.stock_level > 0, message: data.stock_level > 0 ? "Product is in stock" : "Product is out of stock" };
  }
}
