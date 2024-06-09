import express, { Application } from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './routes/orderRoutes';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors'

const app: Application = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors())
app.use(errorHandler);

app.use('/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app }
