import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';
import fileUpload from 'express-fileupload';

import { logger, loggingMiddleware } from './utils/logger';
import { initDb } from './utils/db';

import sampleController from './controllers/sampleController';
import qrCodeController from './controllers/qrCodeController';

const { PORT, MONGO_URI } = process.env;

// Patch duration library
dayjs.extend(duration);

const app = express();

// Initialize DB
// initDb(MONGO_URI);

// cors
const corsOptions = {
  origin: [`http://localhost:${PORT}`],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// middleware
app.use(loggingMiddleware());
app.use(loggingMiddleware());
app.use(bodyParser.json());
app.use(cors(corsOptions));
// file upload
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

// controllers
app.get('/', (req, res) => res.send('API Backend'));
// app.use('/sample', sampleController);
app.use('/qrcode', qrCodeController);

// start app
app.listen(PORT, () => logger.info(`Example app listening on port ${PORT}!`));
