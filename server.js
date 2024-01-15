import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import connectDatabase from './config/database.js';
import config from './config/config.js';
//import { clearDatabase } from './config/database.js'; 
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}));
app.use(cookieParser());
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie:{
      expires: new Date(Date.now() + (60 * 60 * 24 * 1000)),
    }
}))
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/product', productRoutes);

// Connect to the database and then start the server
connectDatabase(config.dbUri)
  .then(() => console.log("database connected succefully"))
  .catch(err => console.error('Error connecting the database', err.messge));

app.listen(config.port, () => {
  console.log(`Server listening at http://localhost:${config.port}`);
});
