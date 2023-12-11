import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateMongoId: RequestHandler = (req, res, next) => {
	try {
		const { id } = req.params;

		if (!isValidObjectId(id)) {
			throw new Error();
		}

		next();
	} catch (error) {
		next(createHttpError(400, 'Id буруу байна'));
	}
};
