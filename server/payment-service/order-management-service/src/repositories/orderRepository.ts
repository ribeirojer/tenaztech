import { supabase } from "../services/supabaseService";

export const getAllOrders = async () => {
  const { data, error } = await supabase.from('orders').select('*');

  if (error) throw error;
  return data;
};

export const createOrder = async (order: any) => {
  const { data, error } = await supabase.from('orders').insert(order).select("*").single();
  if (error) throw error;
  return data;
};

export const getOrderById = async (id: string) => {
  const { data, error } = await supabase.from('orders').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const updateOrder = async (id: string, order: any) => {
  const { data, error } = await supabase.from('orders').update(order).eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteOrder = async (id: string) => {
  const { data, error } = await supabase.from('orders').delete().eq('id', id);
  if (error) throw error;
  return data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const { data, error } = await supabase.from('orders').update({ status }).eq('id', id);
  if (error) throw error;
  return data;
};