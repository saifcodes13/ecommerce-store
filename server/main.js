import colors from 'colors';
import cors from "cors"
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import connectDB from '#config/db.config.js';
import { errorHandler } from '#middlewares/error.middleware.js';
import orderRoutes from '#routes/order.route.js';
import productRoutes from '#routes/product.route.js';
import uploadRoutes from '#routes/upload.route.js';
import userRoutes from '#routes/user.route.js';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(
	cors({
		origin:[
			"http://localhost:3000",
			"https://ecommerce-store-ten-chi-86.vercel.app"
		]
	})
)

app.use(express.json()); // Request body parsing
app.use(cookieParser()); // Cookies parsing and reading



app.use(morgan('dev'));

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/upload', uploadRoutes);

app.get('/api/v1/config/paypal', (req, res) => {
	res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//This part is for when frontend + backend are deployed together
// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static(path.join(__dirname, '/client/dist')));

// 	app.get('/*splat', (req, res) => {
// 		res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
// 	});
// } else {
// 	app.get('/', (req, res) => {
// 		res.json({
// 			message: 'API is running...',
// 		});
// 	});
// }


app.get('/', (req, res) => {
	res.send('API is running...');
})

app.use(errorHandler);

app.listen(port, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${port}.`.cyan.bold
	);
});
