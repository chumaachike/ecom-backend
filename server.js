import express from 'express';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import connectDatabase from './config/database.js';
import config from './config/config.js';

const app = express();
app.use(express.json());

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/product', productRoutes)

connectDatabase(config.dbUri);

app.listen(config.port, () => {
  console.log(`Server listening at http://localhost:${config.port}`);
});
