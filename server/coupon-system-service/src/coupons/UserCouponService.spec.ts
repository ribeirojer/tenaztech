import { UserCouponService } from './UserCouponService';
import * as dotenv from 'dotenv';

describe('UserCouponService', () => {
  let userCouponService: UserCouponService;

  beforeEach(() => {
    dotenv.config();

    userCouponService = new UserCouponService();
  });

  it('should create a user coupon', async () => {
    // Mock dos dados do cupom de usuário
    const mockUserCoupon = {
      id: 4,
      user_id: 1,
      coupon_code: 'TESTCODE',
      expiration_date: new Date().toISOString(),
    };

    const createdCoupon = await userCouponService.createUserCoupon(mockUserCoupon);
    expect(createdCoupon.coupon_code).toBe(mockUserCoupon.coupon_code);
  });

  it('should retrieve all user coupons', async () => {
    const coupons = await userCouponService.getAllUserCoupons();
    expect(coupons).toBeTruthy();
  });

  // Adicione mais testes para outros métodos do serviço, como getUserCouponById, generateCouponForUser, etc.
});
