import { RequestHandler } from 'express';
import createHttpError from 'http-errors';

export const wrongEndpointHandler: RequestHandler = (req, res, next) => {
	next(createHttpError(404, 'Хүсэлт явуулсан хаяг олдсонгүй.'));
};
