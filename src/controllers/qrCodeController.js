import { Router } from 'express';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

import { body, param, query } from 'express-validator';
import { logger } from '../utils/logger';
import { validateReqMiddleware } from '../middleware/validateMiddleware';

const routes = Router();

routes.get('/', async (req, res) => {
  res.json({ message: 'Welcome to sample controller!' });
});

/**
 * GET custom ID
 */
routes.post(
  '/generate',
  [body('text').notEmpty().isString(), body('width').optional().isNumeric()],
  validateReqMiddleware,
  async (req, res) => {
    try {
      const { text, width } = req.body;

      const b64ImgUrl = await QRCode.toDataURL(text, { width: width || 100 });

      return res.json({ b64ImgUrl });
    } catch (e) {
      return res.status(400).json({
        description: e.message,
        status: 'failed',
      });
    }
  }
);

routes.post('/convert', [], validateReqMiddleware, async (req, res) => {
  try {
    const { logo } = req.files;

    const b64Str = logo.data.toString('base64');

    return res.json({ b64Str });
  } catch (e) {
    return res.status(400).json({
      description: e.message,
      status: 'failed',
    });
  }
});

export default routes;
