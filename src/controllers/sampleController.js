import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { logger } from '../utils/logger';
import { validateReqMiddleware } from '../middleware/validateMiddleware';

const routes = Router();

/**
 * GET home page
 */
routes.get('/', async (req, res) => {
  res.json({ message: 'Welcome to sample controller!' });
});

/**
 * GET custom ID
 */
routes.get(
  '/id/:id',
  [param('id').notEmpty().isString()],
  validateReqMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      logger.info(id);

      return res.json({ message: `The ID is ${id}` });
    } catch (e) {
      return res.status(400).json({
        description: e.message,
        status: 'failed',
      });
    }
  }
);

export default routes;
