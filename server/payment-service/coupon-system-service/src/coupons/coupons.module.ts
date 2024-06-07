import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';
import { DiscountCouponService } from './DiscountCouponService';
import { UserCouponService } from './UserCouponService';

@Module({
  controllers: [CouponsController],
  providers: [UserCouponService, DiscountCouponService],
})
export class CouponsModule {}
