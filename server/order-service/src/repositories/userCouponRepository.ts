import { supabase } from "../services/supabaseService";
import { UserCoupon } from "../models/UserCoupon";
import { generateCouponCode } from "../utils/coupons";

export const generateCouponForUser = async (userId: number): Promise<any> => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  const couponCode = generateCouponCode();

  const { data, error } = await supabase.from('user_coupons').insert([
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

export const getAllUserCoupons = async (): Promise<UserCoupon[]> => {
  const { data, error } = await supabase.from('user_coupons').select('*');
  if (error) {
    throw new Error('Failed to fetch user coupons');
  }
  return data || [];
}

export const getUserCouponById = async (id: number): Promise<UserCoupon | null> => {
  const { data, error } = await supabase.from('user_coupons').select('*').eq('id', id).single();
  if (error) {
    throw new Error('Failed to fetch user coupon by ID');
  }
  return data || null;
}

export const createUserCoupon = async (userCoupon: UserCoupon): Promise<UserCoupon | null> => {
  const { data, error } = await supabase.from('user_coupons').insert([userCoupon]).select();
  if (error) {
    throw new Error('Failed to create user coupon');
  }
  return data ? data[0] : null;
}

export const updateUserCoupon = async (id: number, userCouponData: Partial<UserCoupon>): Promise<UserCoupon | null> => {
  const { data, error } = await supabase
    .from('user_coupons')
    .update(userCouponData)
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(`Failed to update user coupon with ID ${id}`);
  }

  return data ? data[0] : null;
};

export const deleteUserCoupon = async (id: number) => {
  const { data, error } = await supabase
    .from('user_coupons')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete user coupon with ID ${id}`);
  }

  if (!data) {
    throw new Error(`User coupon with ID ${id} not found`);
  }

  return data
};
