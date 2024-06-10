import { supabase } from '../services/supabaseService';
import { DiscountCoupon } from '../models/DiscountCoupon';
import { getExpirationDate } from '../utils/coupons';

export const generateDiscountCoupon = async (
  couponCode: string, 
  discountType: 'percentage' | 'fixed', 
  discountValue: number
): Promise<DiscountCoupon> => {
  const expirationDate = getExpirationDate();

  const newCoupon: DiscountCoupon = {
    couponCode,
    discountType,
    discountValue,
    expirationDate,
  };

  const { data, error } = await supabase.from('discount_coupons').insert([newCoupon]).select();

  if (error) {
    throw new Error('Failed to generate coupon');
  }

  return data ? data[0] : null;
};

export const getAllDiscountCoupons = async (): Promise<DiscountCoupon[]> => {
  const { data, error } = await supabase.from('discount_coupons').select('*');
  if (error) {
    throw new Error('Failed to fetch discount coupons');
  }
  return data || [];
};

export const getDiscountCouponById = async (id: number): Promise<DiscountCoupon | null> => {
  const { data, error } = await supabase.from('discount_coupons').select('*').eq('id', id).single();
  if (error) {
    throw new Error('Failed to fetch discount coupon by ID');
  }
  return data || null;
};

export const createDiscountCoupon = async (discountCoupon: DiscountCoupon): Promise<DiscountCoupon | null> => {
  const { data, error } = await supabase.from('discount_coupons').insert([{
    coupon_code: discountCoupon.couponCode,
    discount_type: discountCoupon.discountType,
    discount_value: discountCoupon.discountValue,
    expiration_date: discountCoupon.expirationDate
  }]).select();

  if (error) {
    throw new Error('Failed to create discount coupon');
  }
  return data ? data[0] : null;
};

export const updateDiscountCoupon = async (id: number, discountCouponData: Partial<DiscountCoupon>): Promise<DiscountCoupon | null> => {
  const { data, error } = await supabase
    .from('discount_coupons')
    .update(discountCouponData)
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(`Failed to update discount coupon with ID ${id}`);
  }

  return data ? data[0] : null;
};

export const deleteDiscountCoupon = async (id: number) => {
  const { data, error } = await supabase
    .from('discount_coupons')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete discount coupon with ID ${id}`);
  }

  if (!data) {
    throw new Error(`Discount coupon with ID ${id} not found`);
  }

  return data
};