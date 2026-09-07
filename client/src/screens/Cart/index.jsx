import { ArrowLeftIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { addToCart, removeFromCart } from '@slices/cartSlice';
import CartItem from './CartItem';
import Summary from './Summary';

const CartScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const handleAddToCart = (product, qty) => {
		dispatch(addToCart({ ...product, qty }));
	};

	const handleRemoveFromCart = (productId) => {
		dispatch(removeFromCart(productId));
	};

	const handleCheckout = () => {
		navigate('/login?redirect=/shipping');
	};

	return (
		<div className='min-h-[70vh] bg-white'>
			<div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
				{/* Header with Continue Shopping link */}
				<div className='flex items-center justify-between border-b border-slate-200 pb-6'>
					<div>
						<h1 className='text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl'>
							Shopping Bag
						</h1>
						<p className='mt-1 text-xs text-slate-500'>
							Review your selected items before checkout
						</p>
					</div>

					<Link
						to='/'
						className='inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition-colors hover:text-slate-900'
					>
						<ArrowLeftIcon className='h-3.5 w-3.5' />
						<span>Continue Shopping</span>
					</Link>
				</div>

				{cartItems.length === 0 ? (
					/* Empty Cart State */
					<div className='py-20 text-center'>
						<div className='mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400'>
							<ShoppingBagIcon className='h-8 w-8' strokeWidth={1.5} />
						</div>

						<h2 className='mt-5 text-lg font-bold text-slate-900'>
							Your shopping bag is empty
						</h2>
						<p className='mt-1.5 text-xs text-slate-500'>
							Discover our curated apparel, timepieces, and accessories.
						</p>

						<div className='mt-6'>
							<Link
								to='/'
								className='inline-flex items-center rounded-xl bg-slate-900 px-6 py-3 text-xs font-semibold text-white transition-colors hover:bg-slate-800'
							>
								Explore Catalog
							</Link>
						</div>
					</div>
				) : (
					/* Active Cart Content */
					<div className='mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12'>
						{/* Cart Items List */}
						<section className='lg:col-span-7'>
							<ul className='divide-y divide-slate-200'>
								{cartItems.map((product, index) => (
									<CartItem
										key={product._id}
										product={product}
										index={index}
										handleAddToCart={handleAddToCart}
										handleRemoveFromCart={handleRemoveFromCart}
									/>
								))}
							</ul>
						</section>

						{/* Order Summary */}
						<Summary
							cartItems={cartItems}
							itemsPrice={cart.itemsPrice}
							shippingPrice={cart.shippingPrice}
							taxPrice={cart.taxPrice}
							totalPrice={cart.totalPrice}
							handleCheckout={handleCheckout}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default CartScreen;
