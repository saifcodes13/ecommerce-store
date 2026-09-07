import fs from 'fs';
import path from 'path';
import ProductModel from '#models/product.model.js';

const localProductsPath = new URL('../data/products.json', import.meta.url);

const getLocalProducts = () => {
	try {
		const rawData = fs.readFileSync(localProductsPath, 'utf-8');
		return JSON.parse(rawData);
	} catch (err) {
		console.error('Failed to load local products.json:', err.message);
		return [];
	}
};

/**
 * Helper to combine DB products + local JSON products
 */
const getAllCombinedProducts = async () => {
	const localList = getLocalProducts();
	let dbProducts = [];
	try {
		dbProducts = await ProductModel.find({}).lean();
	} catch (err) {
		// Fallback to local
	}

	// Use map by ID so local accurate products are merged smoothly
	const combinedMap = new Map();
	// Add local first
	for (const p of localList) {
		combinedMap.set(p._id.toString(), p);
	}
	// Add DB products if not already present
	for (const p of dbProducts) {
		if (!combinedMap.has(p._id.toString())) {
			combinedMap.set(p._id.toString(), p);
		}
	}

	return Array.from(combinedMap.values());
};

/**
 * @desc		Fetch all products
 * @route		GET /api/v1/products
 * @access	Public
 */
const getProducts = async (req, res) => {
	const pageSize = req.user?.isAdmin ? 50 : 12;
	const page = +req.query.pageNumber || 1;
	const rawKeyword = (req.query.keyword || '').trim().toLowerCase();

	const allProducts = await getAllCombinedProducts();

	let filtered = allProducts;
	if (rawKeyword) {
		filtered = allProducts.filter((product) => {
			const name = (product.name || '').toLowerCase();
			const category = (product.category || '').toLowerCase();
			const brand = (product.brand || '').toLowerCase();
			const desc = (product.description || '').toLowerCase();

			// Broad matching so "Women", "Men", "Watches", "Shoes", "Kids", "Accessories", "Sale" all find matching items
			return (
				name.includes(rawKeyword) ||
				category.includes(rawKeyword) ||
				brand.includes(rawKeyword) ||
				desc.includes(rawKeyword)
			);
		});
	}

	const total = filtered.length;
	const startIndex = (page - 1) * pageSize;
	const products = filtered.slice(startIndex, startIndex + pageSize);

	res.json({
		products,
		page,
		pages: Math.ceil(total / pageSize) || 1,
		total,
	});
};

const getAllProductsAdmin = async (req, res) => {
	const allProducts = await getAllCombinedProducts();
	res.json(allProducts);
};

/**
 * @desc		Fetch single product by ID
 * @route		GET /api/v1/products/:id
 * @access	Public
 */
const getProductById = async (req, res) => {
	const targetId = req.params.id;

	// Check DB first
	try {
		const dbProduct = await ProductModel.findById(targetId);
		if (dbProduct) {
			return res.json(dbProduct);
		}
	} catch (err) {
		// Continue to local check
	}

	// Check local products
	const localProd = getLocalProducts().find((p) => p._id === targetId);
	if (localProd) {
		return res.json({
			...localProd,
			reviews: localProd.reviews || [],
		});
	}

	res.status(404);
	throw new Error('Product not found.');
};

/**
 * @desc		Create product
 * @route		POST /api/v1/products
 * @access	Private/Admin
 */
const createProduct = async (req, res) => {
	const product = new ProductModel({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/product-1.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description',
		content: 'Sample content',
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
};

/**
 * @desc		Update product
 * @route		PUT /api/v1/products/:id
 * @access	Private/Admin
 */
const updateProduct = async (req, res) => {
	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
		content,
	} = req.body;

	const product = await ProductModel.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;
		product.content = content;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
};

/**
 * @desc		Delete product
 * @route		DELETE /api/v1/products/:id
 * @access	Private/Admin
 */
const deleteProduct = async (req, res) => {
	const product = await ProductModel.findById(req.params.id);

	if (product) {
		await ProductModel.deleteOne({ _id: product._id });
		res.status(200).json({ message: 'Product removed' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
};

/**
 * @desc		Create new review
 * @route		POST /api/v1/products/:id/reviews
 * @access	Private
 */
const createProductReview = async (req, res) => {
	const { rating, comment } = req.body;

	try {
		const product = await ProductModel.findById(req.params.id);

		if (product) {
			const alreadyReviewed = product.reviews.find(
				(review) => review.user._id.toString() === req.user._id.toString()
			);

			if (alreadyReviewed) {
				res.status(400);
				throw new Error('Product already reviewed!');
			}

			const review = {
				name: req.user.name,
				rating: +rating,
				comment,
				user: req.user._id,
			};

			product.reviews.push(review);
			product.numReviews = product.reviews.length;
			product.rating =
				product.reviews.reduce((acc, currVal) => currVal.rating + acc, 0) /
				product.reviews.length;

			await product.save();
			return res.status(201).json({ message: 'Review added' });
		}
	} catch (err) {
		// Check if local product
	}

	const localProd = localProducts.find((p) => p._id === req.params.id);
	if (localProd) {
		if (!localProd.reviews) localProd.reviews = [];
		localProd.reviews.push({
			_id: 'rev_' + Date.now(),
			name: req.user.name,
			rating: +rating,
			comment,
			createdAt: new Date().toISOString(),
		});
		localProd.numReviews = localProd.reviews.length;
		return res.status(201).json({ message: 'Review added' });
	}

	res.status(404);
	throw new Error('Product not found');
};

export {
	createProduct,
	createProductReview,
	deleteProduct,
	getProductById,
	getProducts,
	updateProduct,
	getAllProductsAdmin,
};
