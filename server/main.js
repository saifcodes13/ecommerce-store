import dotenv from 'dotenv';
import express from 'express';

import connectDB from './config/db.config.js';
import products from './data/products.data.js';

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
	res.json({
		message: 'API is running...',
	});
});

app.get('/api/v1/products', (req, res) => {
	res.json(products);
});

app.get('/api/v1/products/:id', (req, res) => {
	const product = products.find((p) => p._id === req.params.id);
	res.json(product);
});

app.listen(port, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${port}.`
	);
});
