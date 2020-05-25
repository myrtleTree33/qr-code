import { validationResult } from 'express-validator';

export const validateReqMiddleware = (req, res, next) => {
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return res.status(422).json({
      description: errs.array(),
      status: 'failed'
    });
  }

  return next();
};
