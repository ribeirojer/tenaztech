import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { DiscountCouponService } from './DiscountCouponService';
import { UserCouponService } from './UserCouponService';
import { UserCoupon } from './UserCoupon';
import { DiscountCoupon } from './DiscountCoupon';

@Controller('coupons')
export class CouponsController {
  constructor(
    private readonly userCouponService: UserCouponService,
    private readonly discountCouponService: DiscountCouponService,
  ) {}

  @Get('user')
  async getAllUserCoupons(): Promise<UserCoupon[]> {
    return this.userCouponService.getAllUserCoupons();
  }

  @Get('user/:id')
  async getUserCouponById(@Param('id') id: string): Promise<UserCoupon> {
    return this.userCouponService.getUserCouponById(+id);
  }

  @Post('user')
  async createUserCoupon(@Body() userCoupon: UserCoupon): Promise<UserCoupon> {
    return this.userCouponService.createUserCoupon(userCoupon);
  }

  @Get('discount')
  async getAllDiscountCoupons(): Promise<DiscountCoupon[]> {
    return this.discountCouponService.getAllDiscountCoupons();
  }

  @Get('discount/:id')
  async getDiscountCouponById(@Param('id') id: string): Promise<DiscountCoupon> {
    return this.discountCouponService.getDiscountCouponById(+id);
  }

  @Post('discount')
  async createDiscountCoupon(@Body() discountCoupon: DiscountCoupon): Promise<DiscountCoupon> {
    console.log(discountCoupon)
    return this.discountCouponService.createDiscountCoupon({ couponCode: 'ABCDEFGH', discountType: 'percentage', discountValue: 20, expirationDate: new Date()});
  }

  // Adicione métodos PUT e DELETE para cupons de usuário e cupons de desconto, se necessário
}
