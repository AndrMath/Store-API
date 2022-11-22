import express from 'express';
import cors from 'cors'
import clientsRouter from './routers/clients.router.js';
import suppliersRouter from './routers/suppliers.router.js';
import productsRouter from './routers/products.router.js';
import salesRouter from './routers/sales.router.js';
import winston from 'winston';
const { printf, combine, label, timestamp } = winston.format;

const myformat = printf(({ level, message, label, timestamp}) => {
  return `${timestamp} [${label}] ${level} : ${message}`;
})

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({filename: "myLojinha.log"})
  ],
  format: combine(
    label({label: "lojinha"}),
    timestamp(),
    myformat
  )
})

const app = express();
app.use(cors())
app.use(express.json());
app.use('/clients', clientsRouter);
app.use('/suppliers', suppliersRouter);
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.use((err, req, res, next) => {
  logger.error(`${req.method} - ${req.baseUrl} - ${err.message}`)
  res.status(400).send({error: err.message})
})

app.listen(8080, () => console.log('API started'));