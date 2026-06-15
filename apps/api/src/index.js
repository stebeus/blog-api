import cors from 'cors';
import express from 'express';

import { PORT } from './config.js';
import { logger, pino } from './lib/logger.js';
import { handleError, handleNotFoundError } from './middleware/errors.js';
import { api } from './routes.js';

const app = express();

app.use(pino);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', api);

app.use(handleNotFoundError);
app.use(handleError);

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
