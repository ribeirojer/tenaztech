import { DiscountCouponService } from './DiscountCouponService';
import * as dotenv from 'dotenv';

describe('DiscountCouponService', () => {
  let discountCouponService: DiscountCouponService;

  beforeAll(() => {
    dotenv.config();

    // Configure uma instância do Supabase para testes
    discountCouponService = new DiscountCouponService(); // Inicialize o serviço com o supabase de teste
  });

  it('should create a discount coupon', async () => {
    // Crie um mock do cupom de desconto para teste
    const mockDiscountCoupon = {
      couponCode: 'TESTCODE',
      discountType: 'percentage' as "percentage" | "fixed",
      discountValue: 20,
      expirationDate: new Date(),
    };

    const createdCoupon = await discountCouponService.createDiscountCoupon(mockDiscountCoupon);
    expect(createdCoupon).toBeDefined();
    expect(createdCoupon.coupon_code).toBe('TESTCODE');
    // Adicione mais asserções conforme necessário para os campos do cupom criado
  });

  it('should retrieve all discount coupons', async () => {
    const coupons = await discountCouponService.getAllDiscountCoupons();
    expect(coupons).toBeDefined();
    // Realize asserções de acordo com os dados esperados da lista de cupons
  });

  // Adicione mais testes para outros métodos do serviço, como getDiscountCouponById, etc.
});
