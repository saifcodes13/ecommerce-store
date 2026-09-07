import { LockClosedIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const Summary = ({
	cartItems,
	itemsPrice,
	shippingPrice,
	taxPrice,
	totalPrice,
	handleCheckout,
}) => {
	const totalItems = cartItems.reduce((acc, curr) => acc + curr.qty, 0);
	const numSubtotal = Number(itemsPrice) || 0;
	const numShipping = Number(shippingPrice) || 0;
	const numTax = Number(taxPrice) || 0;
	const numTotal = Number(totalPrice) || 0;

	return (
		<section className='mt-10 lg:col-span-5 lg:mt-0'>
			<div className='rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7'>
				<h2 className='text-lg font-semibold text-slate-900'>
					Order Summary
				</h2>
				<p className='mt-0.5 text-xs text-slate-500'>
					{totalItems} {totalItems === 1 ? 'item' : 'items'} in your bag
				</p>

				<dl className='mt-6 space-y-3.5 text-sm'>
					<div className='flex items-center justify-between text-slate-600'>
						<dt>Subtotal</dt>
						<dd className='font-medium text-slate-900'>
							₹{numSubtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
						</dd>
					</div>

					<div className='flex items-center justify-between text-slate-600'>
						<dt>Shipping</dt>
						<dd className='font-medium text-slate-900'>
							{numShipping === 0 ? (
								<span className='font-semibold text-emerald-600'>Free</span>
							) : (
								`₹${numShipping.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
							)}
						</dd>
					</div>

					<div className='flex items-center justify-between text-slate-600'>
						<dt>Estimated Tax (18% GST)</dt>
						<dd className='font-medium text-slate-900'>
							₹{numTax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
						</dd>
					</div>

					<div className='flex items-center justify-between border-t border-slate-200 pt-3.5 text-base'>
						<dt className='font-semibold text-slate-900'>Order Total</dt>
						<dd className='font-bold text-slate-900'>
							₹{numTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
						</dd>
					</div>
				</dl>

				{/* Checkout Action Button */}
				<div className='mt-6'>
					<button
						type='button'
						onClick={handleCheckout}
						className='flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 active:scale-[0.99]'
					>
						<LockClosedIcon className='h-4 w-4' />
						<span>Proceed to Checkout</span>
					</button>
				</div>

				{/* Reassurance notes */}
				<div className='mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500'>
					<ShieldCheckIcon className='h-3.5 w-3.5 text-slate-400' />
					<span>Secure 256-bit encrypted checkout</span>
				</div>
			</div>
		</section>
	);
};

export default Summary;
