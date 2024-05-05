import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DiscountCoupon } from "./DiscountCoupon";
  
  // Serviço para gerenciar cupons por tipo de desconto
  @Injectable()
  export class DiscountCouponService {
    private supabase: SupabaseClient;

    constructor() {
      this.supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    }
  
    // Método para gerar um cupom de desconto com base no tipo e valor
    async generateDiscountCoupon(couponCode: string, discountType: 'percentage' | 'fixed', discountValue: number): Promise<DiscountCoupon> {
      const expirationDate = new Date(); // Defina a data de expiração do cupom
      expirationDate.setDate(expirationDate.getDate() + 30); // Por exemplo, válido por 30 dias
  
      const newCoupon: DiscountCoupon = {
        couponCode,
        discountType,
        discountValue,
        expirationDate,
        // Outros campos conforme necessário
      };
  
      const { data, error } = await this.supabase.from('discount_coupons').insert([
        newCoupon
      ]);
  
      if (error) {
        throw new Error('Failed to generate coupon for user');
      }

      return data;
    }
  
    async getAllDiscountCoupons(): Promise<any[]> {
      const { data, error } = await this.supabase.from('discount_coupons').select('*');
      if (error) {
        throw new Error('Failed to fetch discount coupons');
      }
      return data || [] as unknown as DiscountCoupon[];
    }
  
    async getDiscountCouponById(id: number): Promise<any | null> {
      const { data, error } = await this.supabase.from('discount_coupons').select('*').eq('id', id).single();
      if (error) {
        throw new Error('Failed to fetch discount coupon by ID');
      }
      return data || null;
    }
  
    async createDiscountCoupon(discountCoupon: DiscountCoupon): Promise<any | null> {
      const { data, error } = await this.supabase.from('discount_coupons').insert([{
        coupon_code: discountCoupon.couponCode,
        discount_type: discountCoupon.discountType,
        discount_value: discountCoupon.discountValue,
        expiration_date: discountCoupon.expirationDate
      }]).select();

      if (error) {
        throw new Error('Failed to create discount coupon');
      }
      return data ? data[0] : null;
    }
    // Outros métodos para validar, buscar e manipular os cupons por tipo de desconto
  }
  