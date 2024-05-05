export interface UserCoupon {
    id: number; // Identificador único do cupom
    user_id: number; // ID do usuário associado ao cupom
    coupon_code: string; // Código do cupom
    expiration_date: string; // Data de expiração do cupom (formato de string)
    // Outros campos conforme necessário
  }
  