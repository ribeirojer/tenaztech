import type { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

export const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	logger.error(`Unhandled error: ${err.message}`);
	res.status(500).json({ error: "Internal Server Error" });
};
