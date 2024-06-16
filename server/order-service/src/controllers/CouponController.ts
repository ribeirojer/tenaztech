import type { Request, Response } from "express";
import { CouponRepository } from "../repositories/CouponRepository";
import logger from "../utils/logger";

class CouponController {
	static async createCoupon(req: Request, res: Response) {
		try {
			const coupon = await CouponRepository.create(req.body);
			logger.info("Coupon created successfully");
			res.status(201).json(coupon);
		} catch (error: any) {
			logger.error(`Failed to create coupon: ${error.message}`);
			res.status(500).json({ error: error.message });
		}
	}

	static async getCoupons(req: Request, res: Response) {
		try {
			const coupons = await CouponRepository.getAll();
			logger.info("Fetched all coupons");
			res.status(200).json(coupons);
		} catch (error: any) {
			logger.error(`Failed to fetch coupons: ${error.message}`);
			res.status(500).json({ error: error.message });
		}
	}

	static async getCoupon(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const coupon = await CouponRepository.getById(id);
			if (!coupon) {
				logger.warn(`Coupon not found: ${id}`);
				return res.status(404).json({ error: "Coupon not found" });
			}
			logger.info("Fetched coupon", { couponId: id });
			res.status(200).json(coupon);
		} catch (error: any) {
			logger.error(`Failed to fetch coupon: ${error.message}`);
			res.status(500).json({ error: error.message });
		}
	}

	static async updateCoupon(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const updatedCoupon = await CouponRepository.update(id, req.body);
			if (!updatedCoupon) {
				logger.warn(`Coupon not found for update: ${id}`);
				return res.status(404).json({ error: "Coupon not found" });
			}
			logger.info("Updated coupon", { couponId: id });
			res.status(200).json(updatedCoupon);
		} catch (error: any) {
			logger.error(`Failed to update coupon: ${error.message}`);
			res.status(500).json({ error: error.message });
		}
	}

	static async deleteCoupon(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const deletedCoupon = await CouponRepository.delete(id);
			if (!deletedCoupon) {
				logger.warn(`Coupon not found for deletion: ${id}`);
				return res.status(404).json({ error: "Coupon not found" });
			}
			logger.info("Deleted coupon", { couponId: id });
			res.status(200).json(deletedCoupon);
		} catch (error: any) {
			logger.error(`Failed to delete coupon: ${error.message}`);
			res.status(500).json({ error: error.message });
		}
	}

	static async validateCoupon(req: Request, res: Response) {
		try {
			const { code } = req.body;
			const isValid = await CouponRepository.validate(code);
			logger.info("Coupon validated", { code });
			res.status(200).json({ isValid });
		} catch (error: any) {
			logger.error(`Failed to validate coupon: ${error.message}`);
			res.status(500).json({ error: error.message });
		}
	}
}

export default CouponController;

/**

// Função auxiliar para validar ID
const isValidId = (id: any): boolean => {
  return !isNaN(parseInt(id)) && id > 0;
};

// Função auxiliar para validar dados do userCoupon
const isValidUserCoupon = (userCoupon: any): boolean => {
  return userCoupon && typeof userCoupon.userId === 'number' && typeof userCoupon.couponCode === 'string';
};

// Função auxiliar para validar dados do discountCoupon
const isValidDiscountCoupon = (discountCoupon: any): boolean => {
  return discountCoupon && typeof discountCoupon.couponCode === 'string' && ['percentage', 'fixed'].includes(discountCoupon.discountType) && typeof discountCoupon.discountValue === 'number';
};

export const getAllUserCoupons = async (req: Request, res: Response) => {
  try {
    const userCoupons = await userCouponRepository.getAllUserCoupons();
    logger.info('Fetched all user coupons');
    res.json(userCoupons);
  } catch (error: any) {
    logger.error(`Failed to fetch user coupons: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const getUserCouponById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid user coupon ID' });
  }
  try {
    const userCoupon = await userCouponRepository.getUserCouponById(+id);
    if (userCoupon) {
      logger.info(`Fetched user coupon with id ${id}`);
      res.json(userCoupon);
    } else {
      res.status(404).json({ error: 'User coupon not found' });
    }
  } catch (error: any) {
    logger.error(`Failed to fetch user coupon with id ${id}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const createUserCoupon = async (req: Request, res: Response) => {
  const userCoupon = req.body;
  if (!isValidUserCoupon(userCoupon)) {
    return res.status(400).json({ error: 'Invalid user coupon data' });
  }
  try {
    const newUserCoupon = await userCouponRepository.createUserCoupon(userCoupon);
    logger.info('Created new user coupon');
    res.status(201).json(newUserCoupon);
  } catch (error: any) {
    logger.error(`Failed to create user coupon: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const updateUserCoupon = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userCouponData = req.body;
  if (!isValidId(id) || !isValidUserCoupon(userCouponData)) {
    return res.status(400).json({ error: 'Invalid user coupon data or ID' });
  }
  try {
    const updatedUserCoupon = await userCouponRepository.updateUserCoupon(+id, userCouponData);
    if (updatedUserCoupon) {
      logger.info(`Updated user coupon with id ${id}`);
      res.json(updatedUserCoupon);
    } else {
      res.status(404).json({ error: 'User coupon not found' });
    }
  } catch (error: any) {
    logger.error(`Failed to update user coupon with id ${id}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserCoupon = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid user coupon ID' });
  }
  try {
    const result = await userCouponRepository.deleteUserCoupon(+id);
    if (result) {
      logger.info(`Deleted user coupon with id ${id}`);
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User coupon not found' });
    }
  } catch (error: any) {
    logger.error(`Failed to delete user coupon with id ${id}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const getAllDiscountCoupons = async (req: Request, res: Response) => {
  try {
    const discountCoupons = await discountCouponRepository.getAllDiscountCoupons();
    logger.info('Fetched all discount coupons');
    res.json(discountCoupons);
  } catch (error: any) {
    logger.error(`Failed to fetch discount coupons: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const getDiscountCouponById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid discount coupon ID' });
  }
  try {
    const discountCoupon = await discountCouponRepository.getDiscountCouponById(+id);
    if (discountCoupon) {
      logger.info(`Fetched discount coupon with id ${id}`);
      res.json(discountCoupon);
    } else {
      res.status(404).json({ error: 'Discount coupon not found' });
    }
  } catch (error: any) {
    logger.error(`Failed to fetch discount coupon with id ${id}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const createDiscountCoupon = async (req: Request, res: Response) => {
  const discountCoupon = req.body;
  if (!isValidDiscountCoupon(discountCoupon)) {
    return res.status(400).json({ error: 'Invalid discount coupon data' });
  }
  try {
    const newDiscountCoupon = await discountCouponRepository.createDiscountCoupon(discountCoupon);
    logger.info('Created new discount coupon');
    res.status(201).json(newDiscountCoupon);
  } catch (error: any) {
    logger.error(`Failed to create discount coupon: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const updateDiscountCoupon = async (req: Request, res: Response) => {
  const { id } = req.params;
  const discountCouponData = req.body;
  if (!isValidId(id) || !isValidDiscountCoupon(discountCouponData)) {
    return res.status(400).json({ error: 'Invalid discount coupon data or ID' });
  }
  try {
    const updatedDiscountCoupon = await discountCouponRepository.updateDiscountCoupon(+id, discountCouponData);
    if (updatedDiscountCoupon) {
      logger.info(`Updated discount coupon with id ${id}`);
      res.json(updatedDiscountCoupon);
    } else {
      res.status(404).json({ error: 'Discount coupon not found' });
    }
  } catch (error: any) {
    logger.error(`Failed to update discount coupon with id ${id}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const deleteDiscountCoupon = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid discount coupon ID' });
  }
  try {
    const result = await discountCouponRepository.deleteDiscountCoupon(+id);
    if (result) {
      logger.info(`Deleted discount coupon with id ${id}`);
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Discount coupon not found' });
    }
  } catch (error: any) {
    logger.error(`Failed to delete discount coupon with id ${id}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
 */
