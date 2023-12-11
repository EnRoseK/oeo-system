import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Schema } from 'yup';

export const validate =
	(schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validate({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			return next();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			next(createHttpError(500, err.message));
		}
	};
