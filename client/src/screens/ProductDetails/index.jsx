import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	ChevronRightIcon,
	ShoppingBagIcon,
	BoltIcon,
	ShieldCheckIcon,
	TruckIcon,
	ArrowPathRoundedSquareIcon,
	CheckCircleIcon,
	SparklesIcon,
} from '@heroicons/react/24/outline';
import { IoStar } from 'react-icons/io5';

import Alert from '@components/Alert';
import Loader from '@components/Loader';
import Rating from '@components/ProductCard/Rating';
import ProductCard from '@components/ProductCard';
import { addToCart } from '@slices/cartSlice';
import {
	useCreateReviewMutation,
	useGetProductDetailsQuery,
	useGetProductsQuery,
} from '@slices/productApiSlice';
import QuantitySelector from './QuantitySelector';

const ProductDetails = () => {
	const { id: productId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(5);
	const [comment, setComment] = useState('');
	const [activeTab, setActiveTab] = useState('overview');

	const {
		data: product,
		isLoading,
		isError,
		error,
		refetch,
	} = useGetProductDetailsQuery(productId);

	const { data: allProductsData } = useGetProductsQuery();

	const [createProductReview, { isLoading: loadingProductReview }] =
		useCreateReviewMutation();

	const { userInfo } = useSelector((state) => state.auth);

	const handleAddToCart = (shouldRedirectToCart = false) => {
		if (!product || product.countInStock === 0) {
			toast.error('Product is out of stock.');
			return;
		}

		dispatch(addToCart({ ...product, qty }));
		toast.success(`${product.name} added to your bag!`, {
			position: 'bottom-right',
			autoClose: 2000,
		});

		if (shouldRedirectToCart) {
			navigate('/cart');
		}
	};

	const handleReviewSubmit = async (e) => {
		e.preventDefault();
		if (!comment.trim()) {
			toast.error('Please write a short review comment.');
			return;
		}

		try {
			await createProductReview({
				productId,
				rating,
				comment,
				user: userInfo._id,
				name: userInfo.name,
			}).unwrap();
			toast.success('Thank you! Your review has been submitted.');
			setRating(5);
			setComment('');
			refetch();
		} catch (err) {
			toast.error(err?.data?.message || err?.error || 'Failed to submit review');
		}
	};

	if (isLoading) {
		return (
			<div className='flex min-h-[60vh] items-center justify-center bg-white'>
				<Loader />
			</div>
		);
	}

	if (isError) {
		return (
			<div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
				<Alert type='error'>{error?.data?.message || error?.error || 'Product not found'}</Alert>
				<Link to='/' className='mt-4 inline-block text-sm font-bold text-amber-600 hover:underline'>
					← Return to Catalog
				</Link>
			</div>
		);
	}

	const originalPrice = Math.round(product.price * 1.25);
	const emiPrice = Math.round(product.price / 3);

	// Filter related products
	const relatedProducts = (allProductsData?.products || [])
		.filter((p) => p._id !== product._id)
		.slice(0, 4);

	return (
		<div className='bg-white'>
			{/* Breadcrumb */}
			<nav className='border-b border-slate-200/80 bg-slate-50/50 py-3.5'>
				<div className='mx-auto flex max-w-7xl items-center gap-2 px-4 text-xs font-medium text-slate-500 sm:px-6 lg:px-8'>
					<Link to='/' className='transition hover:text-slate-900'>
						Home
					</Link>
					<ChevronRightIcon className='h-3 w-3 text-slate-400' />
					{product.category && (
						<>
							<span className='text-slate-600'>{product.category}</span>
							<ChevronRightIcon className='h-3 w-3 text-slate-400' />
						</>
					)}
					<span className='truncate font-semibold text-slate-900'>{product.name}</span>
				</div>
			</nav>

			{/* Main Product Details Section */}
			<section className='mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16'>
				<div className='grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16'>
					{/* Left: Product Image & Badges */}
					<div className='lg:col-span-6'>
						<div className='relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-100 p-2 shadow-lg'>
							<div className='relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-white'>
								<img
									src={product.image}
									alt={product.name}
									className='h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105'
								/>

								{/* Top Badges */}
								<div className='absolute top-4 left-4 flex flex-col gap-2'>
									{product.brand && (
										<span className='rounded-full border border-slate-200/80 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 backdrop-blur-md shadow-xs'>
											{product.brand}
										</span>
									)}
									<span className='inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-slate-950 shadow-xs'>
										<SparklesIcon className='h-3.5 w-3.5' />
										<span>Original Item</span>
									</span>
								</div>
							</div>
						</div>

						{/* Assurance Icons Row Under Image */}
						<div className='mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 text-center'>
							<div className='flex flex-col items-center gap-1.5'>
								<TruckIcon className='h-5 w-5 text-amber-600' />
								<span className='text-[11px] font-bold text-slate-800'>Free Express Delivery</span>
								<span className='text-[10px] text-slate-500'>2-3 Business Days</span>
							</div>

							<div className='flex flex-col items-center gap-1.5 border-x border-slate-200'>
								<ShieldCheckIcon className='h-5 w-5 text-amber-600' />
								<span className='text-[11px] font-bold text-slate-800'>100% Certified</span>
								<span className='text-[10px] text-slate-500'>Authenticity Assured</span>
							</div>

							<div className='flex flex-col items-center gap-1.5'>
								<ArrowPathRoundedSquareIcon className='h-5 w-5 text-amber-600' />
								<span className='text-[11px] font-bold text-slate-800'>30-Day Returns</span>
								<span className='text-[10px] text-slate-500'>Doorstep Pickup</span>
							</div>
						</div>
					</div>

					{/* Right: Buy Box & Product Info */}
					<div className='flex flex-col justify-between lg:col-span-6'>
						<div>
							{/* Category & Brand */}
							<div className='flex items-center gap-2'>
								<span className='rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-700'>
									{product.category || 'Luxury Goods'}
								</span>
								{product.brand && (
									<span className='text-xs font-semibold uppercase tracking-wider text-slate-400'>
										by {product.brand}
									</span>
								)}
							</div>

							{/* Title */}
							<h1 className='mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl font-serif'>
								{product.name}
							</h1>

							{/* Rating & Reviews Jump */}
							<div className='mt-3 flex items-center gap-3'>
								<Rating value={product.rating} numReviews={product.numReviews} />
								<span className='text-slate-300'>•</span>
								<button
									type='button'
									onClick={() => {
										setActiveTab('reviews');
										const el = document.getElementById('details-tabs');
										if (el) el.scrollIntoView({ behavior: 'smooth' });
									}}
									className='text-xs font-bold text-amber-600 hover:underline'
								>
									See customer reviews
								</button>
							</div>

							{/* Pricing Box */}
							<div className='mt-6 rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-white p-5 shadow-xs'>
								<div className='flex items-baseline gap-3'>
									<span className='text-3xl font-black text-slate-900 sm:text-4xl'>
										₹{product.price.toLocaleString('en-IN')}
									</span>
									<span className='text-base text-slate-400 line-through'>
										₹{originalPrice.toLocaleString('en-IN')}
									</span>
									<span className='rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-extrabold text-emerald-800'>
										Save 20%
									</span>
								</div>

								<div className='mt-2 flex items-center gap-2 text-xs text-slate-500'>
									<CheckCircleIcon className='h-4 w-4 text-emerald-600' />
									<span>Inclusive of all taxes • No hidden customs</span>
								</div>

								<p className='mt-1 text-xs text-slate-400'>
									Or 3 monthly interest-free payments of{' '}
									<strong className='text-slate-700 font-bold'>₹{emiPrice.toLocaleString('en-IN')}</strong> with PayPal / Cards.
								</p>
							</div>

							{/* Short Description */}
							<p className='mt-6 text-sm text-slate-600 leading-relaxed sm:text-base'>
								{product.description}
							</p>

							{/* Stock status */}
							<div className='mt-6 flex items-center gap-2'>
								{product.countInStock > 0 ? (
									<>
										<span className='relative flex h-2.5 w-2.5'>
											<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
											<span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500' />
										</span>
										<span className='text-xs font-bold text-emerald-700'>
											In Stock — Dispatches within 24 hours
										</span>
									</>
								) : (
									<span className='text-xs font-bold text-rose-600'>
										Currently Sold Out
									</span>
								)}
							</div>

							{/* Quantity Selector (if in stock) */}
							{product.countInStock > 0 && (
								<div className='mt-6'>
									<QuantitySelector
										countInStock={product.countInStock}
										quantity={qty}
										setQuantity={setQty}
									/>
								</div>
							)}

							{/* Action Buttons */}
							<div className='mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2'>
								<button
									type='button'
									onClick={() => handleAddToCart(false)}
									disabled={product.countInStock === 0}
									className='flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-amber-500 hover:text-slate-950 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 shadow-sm'
								>
									<ShoppingBagIcon className='h-4 w-4' />
									<span>Add to Bag</span>
								</button>

								<button
									type='button'
									onClick={() => handleAddToCart(true)}
									disabled={product.countInStock === 0}
									className='flex items-center justify-center gap-2 rounded-xl border-2 border-slate-950 bg-white px-8 py-3.5 text-sm font-bold text-slate-950 transition-all duration-200 hover:bg-slate-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40'
								>
									<BoltIcon className='h-4 w-4 text-amber-500' />
									<span>Buy Now</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Tabs Section: Overview / Specifications / Reviews */}
			<section id='details-tabs' className='border-t border-slate-200 bg-slate-50/60 py-16'>
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					{/* Tab Navigation */}
					<div className='flex border-b border-slate-200'>
						<button
							type='button'
							onClick={() => setActiveTab('overview')}
							className={`border-b-2 py-4 px-6 text-sm font-bold transition-all ${
								activeTab === 'overview'
									? 'border-slate-900 text-slate-900 bg-white rounded-t-xl'
									: 'border-transparent text-slate-500 hover:text-slate-800'
							}`}
						>
							Product Story & Details
						</button>

						<button
							type='button'
							onClick={() => setActiveTab('reviews')}
							className={`border-b-2 py-4 px-6 text-sm font-bold transition-all ${
								activeTab === 'reviews'
									? 'border-slate-900 text-slate-900 bg-white rounded-t-xl'
									: 'border-transparent text-slate-500 hover:text-slate-800'
							}`}
						>
							Customer Reviews ({product?.reviews?.length || 0})
						</button>

						<button
							type='button'
							onClick={() => setActiveTab('shipping')}
							className={`border-b-2 py-4 px-6 text-sm font-bold transition-all ${
								activeTab === 'shipping'
									? 'border-slate-900 text-slate-900 bg-white rounded-t-xl'
									: 'border-transparent text-slate-500 hover:text-slate-800'
							}`}
						>
							Shipping & Delivery
						</button>
					</div>

					{/* Tab 1: Product Story */}
					{activeTab === 'overview' && (
						<div className='rounded-b-2xl border-x border-b border-slate-200 bg-white p-6 sm:p-10 shadow-xs'>
							<h3 className='text-xl font-bold text-slate-900 font-serif'>Artisanal Description</h3>
							<div className='prose prose-slate mt-4 max-w-none text-slate-600 leading-relaxed'>
								{product.content ? (
									<ReactMarkdown>{product.content}</ReactMarkdown>
								) : (
									<p>{product.description}</p>
								)}
							</div>
						</div>
					)}

					{/* Tab 2: Shipping & Delivery */}
					{activeTab === 'shipping' && (
						<div className='rounded-b-2xl border-x border-b border-slate-200 bg-white p-6 sm:p-10 shadow-xs'>
							<h3 className='text-xl font-bold text-slate-900 font-serif'>Delivery & Returns Guarantee</h3>
							<div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2'>
								<div className='rounded-xl border border-slate-200 p-5'>
									<h4 className='text-sm font-bold text-slate-900'>Expedited Courier</h4>
									<p className='mt-2 text-xs text-slate-600 leading-relaxed'>
										Orders placed before 2:00 PM IST dispatch the same business day via BlueDart or Delhivery Air Express. Tracking details will be dispatched immediately via email.
									</p>
								</div>
								<div className='rounded-xl border border-slate-200 p-5'>
									<h4 className='text-sm font-bold text-slate-900'>Effortless 30-Day Returns</h4>
									<p className='mt-2 text-xs text-slate-600 leading-relaxed'>
										If the silhouette or fit does not meet your discerning expectations, initiate a pickup from your profile. Unworn items with tags are eligible for full refunds.
									</p>
								</div>
							</div>
						</div>
					)}

					{/* Tab 3: Customer Reviews */}
					{activeTab === 'reviews' && (
						<div className='rounded-b-2xl border-x border-b border-slate-200 bg-white p-6 sm:p-10 shadow-xs'>
							<div className='grid grid-cols-1 gap-12 lg:grid-cols-12'>
								{/* Left: Reviews List */}
								<div className='lg:col-span-7'>
									<div className='flex items-center justify-between border-b border-slate-100 pb-4'>
										<h3 className='text-xl font-bold text-slate-900 font-serif'>
											Customer Experiences
										</h3>
										<span className='text-xs font-bold text-slate-500'>
											{product?.reviews?.length || 0} Verified Reviews
										</span>
									</div>

									{!product?.reviews || product.reviews.length === 0 ? (
										<div className='py-12 text-center text-slate-400'>
											<p className='text-sm'>Be the first connoisseur to review this masterpiece.</p>
										</div>
									) : (
										<div className='mt-6 divide-y divide-slate-100'>
											{product.reviews.map((rev) => (
												<div key={rev._id || rev.createdAt} className='py-6'>
													<div className='flex items-center justify-between'>
														<div className='flex items-center gap-3'>
															<div className='flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800'>
																{(rev.name || 'U')[0].toUpperCase()}
															</div>
															<div>
																<p className='text-sm font-bold text-slate-900'>{rev.name}</p>
																<span className='text-[10px] font-semibold text-emerald-600'>
																	✓ Verified Purchase
																</span>
															</div>
														</div>
														<time className='text-xs text-slate-400'>
															{new Date(rev.createdAt).toLocaleDateString('en-US', {
																year: 'numeric',
																month: 'short',
																day: 'numeric',
															})}
														</time>
													</div>

													<div className='mt-2.5 flex items-center gap-1'>
														{[1, 2, 3, 4, 5].map((star) => (
															<IoStar
																key={star}
																className={`h-3.5 w-3.5 ${
																	star <= rev.rating ? 'text-amber-400' : 'text-slate-200'
																}`}
															/>
														))}
													</div>

													<p className='mt-3 text-sm text-slate-600 leading-relaxed'>
														{rev.comment}
													</p>
												</div>
											))}
										</div>
									)}
								</div>

								{/* Right: Write Review Form */}
								<div className='lg:col-span-5'>
									<div className='rounded-2xl border border-slate-200 bg-slate-50 p-6'>
										<h4 className='text-base font-bold text-slate-900'>
											Write a Verified Review
										</h4>
										<p className='mt-1 text-xs text-slate-500'>
											Share your impressions on craftsmanship, fit, and elegance.
										</p>

										{userInfo ? (
											<form onSubmit={handleReviewSubmit} className='mt-5 flex flex-col gap-4'>
												<div>
													<label className='block text-xs font-bold uppercase tracking-wider text-slate-700'>
														Your Rating
													</label>
													<div className='mt-2 flex items-center gap-1'>
														{[1, 2, 3, 4, 5].map((star) => (
															<button
																key={star}
																type='button'
																onClick={() => setRating(star)}
																className='p-1 transition-transform hover:scale-125 focus:outline-none'
																aria-label={`${star} star rating`}
															>
																<IoStar
																	className={`h-6 w-6 ${
																		star <= rating ? 'text-amber-400' : 'text-slate-300'
																	}`}
																/>
															</button>
														))}
														<span className='ml-2 text-xs font-bold text-slate-700'>
															{rating} / 5 Stars
														</span>
													</div>
												</div>

												<div>
													<label htmlFor='review-comment' className='block text-xs font-bold uppercase tracking-wider text-slate-700'>
														Feedback & Comments
													</label>
													<textarea
														id='review-comment'
														rows={4}
														value={comment}
														onChange={(e) => setComment(e.target.value)}
														placeholder='Detail your experience with the fabric, weight, or fit...'
														className='mt-1.5 w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-xs'
													/>
												</div>

												<button
													type='submit'
													disabled={loadingProductReview}
													className='rounded-xl bg-slate-950 py-3 text-xs font-bold text-white transition-all hover:bg-amber-500 hover:text-slate-950 active:scale-95 disabled:opacity-50'
												>
													{loadingProductReview ? 'Submitting...' : 'Post Review'}
												</button>
											</form>
										) : (
											<div className='mt-5 rounded-xl border border-dashed border-slate-300 p-6 text-center'>
												<p className='text-xs text-slate-600'>
													Please{' '}
													<Link to='/login' className='font-bold text-amber-600 underline'>
														sign in
													</Link>{' '}
													to submit your verified feedback.
												</p>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>

			{/* You May Also Like / Related Products Section */}
			{relatedProducts.length > 0 && (
				<section className='border-t border-slate-200 bg-white py-16'>
					<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
						<div className='flex items-center justify-between'>
							<div>
								<span className='text-xs font-bold uppercase tracking-wider text-amber-600'>
									Curated Suggestions
								</span>
								<h2 className='mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl font-serif'>
									You May Also Admire
								</h2>
							</div>

							<Link
								to='/'
								className='text-xs font-bold text-slate-700 hover:text-amber-600 hover:underline'
							>
								Explore Entire Vault →
							</Link>
						</div>

						<div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
							{relatedProducts.map((relProduct) => (
								<ProductCard key={relProduct._id} product={relProduct} />
							))}
						</div>
					</div>
				</section>
			)}
		</div>
	);
};

export default ProductDetails;
