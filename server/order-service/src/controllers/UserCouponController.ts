import type { Request, Response } from "express";
import { UserCouponRepository } from "../repositories/UserCouponRepository";
import logger from "../utils/logger";

class UserCouponController {
	static async assignCouponToUser(req: Request, res: Response) {
		try {
			const userCoupon = await UserCouponRepository.assign(
				req.body.userId,
				req.body.couponId,
			);
			logger.info("Assigned coupon to user successfully");
			res.status(201).json(userCoupon);
		} catch (error: any) {
			logger.error(`Failed to assign coupon to user: ${error.message}`);
			res.status(500).json({ error: error.message });
		}
	}

	static async getUserCoupons(req: Request, res: Response) {
		try {
			const userCoupons = await UserCouponRepository.getAll();
			logger.info("Fetched all user coupons");
			res.status(200).json(userCoupons);
		} catch (error: any) {
			logger.error(`Failed to fetch user coupons: ${error.message}`);
			res.status(500).json({ error: error.message });
		}
	}

	static async getUserCoupon(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const userCoupon = await UserCouponRepository.getById(id);
			if (!userCoupon) {
				logger.warn(`User coupon not found: ${id}`);
				return res.status(404).json({ error: "User coupon not found" });
			}
			logger.info("Fetched user coupon", { userCouponId: id });
			res.status(200).json(userCoupon);
		} catch (error: any) {
			logger.error(`Failed to fetch user coupon: ${error.message}`);
			res.status(500).json({ error: error.message });
		}
	}

	static async updateUserCoupon(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const updatedUserCoupon = await UserCouponRepository.update(id, req.body);
			if (!updatedUserCoupon) {
				logger.warn(`User coupon not found for update: ${id}`);
				return res.status(404).json({ error: "User coupon not found" });
			}
			logger.info("Updated user coupon", { userCouponId: id });
			res.status(200).json(updatedUserCoupon);
		} catch (error: any) {
			logger.error(`Failed to update user coupon: ${error.message}`);
			res.status(500).json({ error: error.message });
		}
	}

	static async removeUserCoupon(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const removedUserCoupon = await UserCouponRepository.remove(id);
			if (!removedUserCoupon) {
				logger.warn(`User coupon not found for removal: ${id}`);
				return res.status(404).json({ error: "User coupon not found" });
			}
			logger.info("Removed user coupon", { userCouponId: id });
			res.status(200).json(removedUserCoupon);
		} catch (error: any) {
			logger.error(`Failed to remove user coupon: ${error.message}`);
			res.status(500).json({ error: error.message });
		}
	}
}

export default UserCouponController;
