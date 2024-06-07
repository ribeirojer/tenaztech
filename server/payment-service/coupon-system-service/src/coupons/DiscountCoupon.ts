 // Modelo simplificado de cupom por tipo de desconto
export interface DiscountCoupon {
  id?: number;
  couponCode: string;
  discountType: 'percentage' | 'fixed'; // Tipos de desconto: porcentagem ou valor fixo
  discountValue: number;
  expirationDate: Date;
  // Outros campos conforme necessário
}