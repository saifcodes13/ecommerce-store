import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	MapPinIcon,
	CreditCardIcon,
	ShoppingBagIcon,
	LockClosedIcon,
	ShieldCheckIcon,
	PencilSquareIcon,
} from '@heroicons/react/24/outline';

import CheckoutSteps from '@components/CheckoutSteps';
import Loader from '@components/Loader';
import { clearCartItems } from '@slices/cartSlice';
import { useCreateOrderMutation } from '@slices/orderApiSlice';

const PlaceOrderScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress, paymentMethod, cartItems } = cart;

	useEffect(() => {
		if (!shippingAddress?.address) {
			navigate('/shipping');
		} else if (!paymentMethod) {
			navigate('/payment');
		}
	}, [shippingAddress, paymentMethod, navigate]);

	const [createOrder, { isLoading }] = useCreateOrderMutation();

	const handlerPlaceOrder = async () => {
		try {
			const response = await createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			}).unwrap();

			dispatch(clearCartItems());
			navigate(`/order/${response._id}`);
		} catch (error) {
			toast.error(error?.data?.message || error?.error || 'Failed to place order');
		}
	};

	const numItemsPrice = Number(cart.itemsPrice) || 0;
	const numShippingPrice = Number(cart.shippingPrice) || 0;
	const numTaxPrice = Number(cart.taxPrice) || 0;
	const numTotalPrice = Number(cart.totalPrice) || 0;

	return (
		<div className='min-h-[75vh] bg-white'>
			<div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
				{/* Stepper */}
				<div className='flex items-center justify-center pb-8 border-b border-slate-200'>
					<CheckoutSteps step1 step2 step3 step4 />
				</div>

				<div className='mt-8 flex flex-col gap-2'>
					<h1 className='text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl'>
						Review & Place Order
					</h1>
					<p className='text-xs text-slate-500'>
						Please review your shipping details, payment method, and items before placing your order.
					</p>
				</div>

				<div className='mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12'>
					{/* Left Section: Order Details */}
					<div className='flex flex-col gap-6 lg:col-span-7'>
						{/* 1. Shipping Information */}
						<div className='rounded-2xl border border-slate-200 p-5 sm:p-6 bg-white'>
							<div className='flex items-center justify-between border-b border-slate-100 pb-3'>
								<div className='flex items-center gap-2 text-slate-900'>
									<MapPinIcon className='h-4 w-4 text-slate-500' />
									<h2 className='text-sm font-semibold'>Shipping Address</h2>
								</div>
								<Link
									to='/shipping'
									className='inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900'
								>
									<PencilSquareIcon className='h-3.5 w-3.5' />
									<span>Edit</span>
								</Link>
							</div>

							<div className='mt-3 text-xs leading-relaxed text-slate-600'>
								<p className='font-semibold text-slate-900'>{shippingAddress.address}</p>
								<p>{shippingAddress.city}, {shippingAddress.postalCode}</p>
								<p>{shippingAddress.country}</p>
							</div>
						</div>

						{/* 2. Payment Method */}
						<div className='rounded-2xl border border-slate-200 p-5 sm:p-6 bg-white'>
							<div className='flex items-center justify-between border-b border-slate-100 pb-3'>
								<div className='flex items-center gap-2 text-slate-900'>
									<CreditCardIcon className='h-4 w-4 text-slate-500' />
									<h2 className='text-sm font-semibold'>Payment Method</h2>
								</div>
								<Link
									to='/payment'
									className='inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900'
								>
									<PencilSquareIcon className='h-3.5 w-3.5' />
									<span>Edit</span>
								</Link>
							</div>

							<div className='mt-3 flex items-center gap-2 text-xs'>
								<span className='rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-semibold uppercase tracking-wider text-slate-800'>
									{paymentMethod}
								</span>
								<span className='text-slate-500'>Selected for final payment</span>
							</div>
						</div>

						{/* 3. Items Review */}
						<div className='rounded-2xl border border-slate-200 p-5 sm:p-6 bg-white'>
							<div className='flex items-center justify-between border-b border-slate-100 pb-3'>
								<div className='flex items-center gap-2 text-slate-900'>
									<ShoppingBagIcon className='h-4 w-4 text-slate-500' />
									<h2 className='text-sm font-semibold'>
										Order Items ({cartItems?.length || 0})
									</h2>
								</div>
								<Link
									to='/cart'
									className='inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900'
								>
									<PencilSquareIcon className='h-3.5 w-3.5' />
									<span>Edit Bag</span>
								</Link>
							</div>

							<ul className='mt-3 divide-y divide-slate-100'>
								{cartItems?.map((item) => {
									const itemTotal = (item.price * item.qty).toLocaleString('en-IN');
									return (
										<li key={item._id} className='flex items-center gap-4 py-3.5'>
											<Link
												to={`/product/${item._id}`}
												className='h-16 w-14 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50'
											>
												<img
													src={item.image}
													alt={item.name}
													className='h-full w-full object-cover object-center'
												/>
											</Link>

											<div className='flex flex-1 flex-col justify-between'>
												<Link
													to={`/product/${item._id}`}
													className='text-xs font-semibold text-slate-900 hover:underline line-clamp-1'
												>
													{item.name}
												</Link>
												<p className='mt-0.5 text-[11px] text-slate-500'>
													Quantity: {item.qty} × ₹{item.price.toLocaleString('en-IN')}
												</p>
											</div>

											<div className='text-right'>
												<p className='text-xs font-bold text-slate-900'>
													₹{itemTotal}
												</p>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
					</div>

					{/* Right Section: Order Summary */}
					<div className='lg:col-span-5'>
						<div className='rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7'>
							<h2 className='text-lg font-semibold text-slate-900'>
								Order Summary
							</h2>
							<p className='mt-0.5 text-xs text-slate-500'>
								Final cost breakdown including GST
							</p>

							<dl className='mt-6 space-y-3.5 text-sm'>
								<div className='flex items-center justify-between text-slate-600'>
									<dt>Items Subtotal</dt>
									<dd className='font-medium text-slate-900'>
										₹{numItemsPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
									</dd>
								</div>

								<div className='flex items-center justify-between text-slate-600'>
									<dt>Shipping</dt>
									<dd className='font-medium text-slate-900'>
										{numShippingPrice === 0 ? (
											<span className='font-semibold text-emerald-600'>Free</span>
										) : (
											`₹${numShippingPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
										)}
									</dd>
								</div>

								<div className='flex items-center justify-between text-slate-600'>
									<dt>Estimated Taxes (18% GST)</dt>
									<dd className='font-medium text-slate-900'>
										₹{numTaxPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
									</dd>
								</div>

								<div className='flex items-center justify-between border-t border-slate-200 pt-3.5 text-base'>
									<dt className='font-semibold text-slate-900'>Order Total</dt>
									<dd className='font-bold text-slate-900'>
										₹{numTotalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
									</dd>
								</div>
							</dl>

							<div className='mt-6'>
								<button
									type='button'
									onClick={handlerPlaceOrder}
									disabled={isLoading || cartItems?.length === 0}
									className='flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50'
								>
									{isLoading ? (
										<div className='flex items-center gap-2'>
											<Loader />
											<span>Placing Order...</span>
										</div>
									) : (
										<>
											<LockClosedIcon className='h-4 w-4' />
											<span>Confirm & Place Order</span>
										</>
									)}
								</button>
							</div>

							<div className='mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500'>
								<ShieldCheckIcon className='h-3.5 w-3.5 text-slate-400' />
								<span>256-bit SSL encrypted secure checkout</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaceOrderScreen;
