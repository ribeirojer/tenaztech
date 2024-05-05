import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserCoupon } from "./UserCoupon";

  // Serviço para gerenciar cupons únicos por usuário
  @Injectable()
  export class UserCouponService {
    private supabase: SupabaseClient;

    constructor() {
      this.supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    }
  
    async generateCouponForUser(userId: number): Promise<any> {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
    
        const couponCode = this.generateCouponCode();
    
        const { data, error } = await this.supabase.from('user_coupons').insert([
          {
            user_id: userId,
            coupon_code: couponCode,
            expiration_date: expirationDate.toISOString(),
          },
        ]);
    
        if (error) {
          throw new Error('Failed to generate coupon for user');
        }
    
        return data;
      }
      
      private generateCouponCode(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Caracteres permitidos para o código do cupom
        const codeLength = 8; // Comprimento do código do cupom
        
        let couponCode = '';
        
        for (let i = 0; i < codeLength; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          couponCode += characters.charAt(randomIndex);
        }
        
        return couponCode;
      }
  
      async getAllUserCoupons(): Promise<UserCoupon[]> {
        const { data, error } = await this.supabase.from('user_coupons').select('*');
        if (error) {
          throw new Error('Failed to fetch user coupons');
        }
        return data || [];
      }
    
      async getUserCouponById(id: number): Promise<UserCoupon | null> {
        const { data, error } = await this.supabase.from('user_coupons').select('*').eq('id', id).single();
        if (error) {
          throw new Error('Failed to fetch user coupon by ID');
        }
        return data || null;
      }
    
      async createUserCoupon(userCoupon: UserCoupon): Promise<UserCoupon | null> {
        const { data, error } = await this.supabase.from('user_coupons').insert([userCoupon]).select();
        console.log(error)
        if (error) {
          throw new Error('Failed to create user coupon');
        }
        return data ? data[0] : null;
      }
    // Outros métodos para validar, buscar e manipular os cupons dos usuários
  }
  