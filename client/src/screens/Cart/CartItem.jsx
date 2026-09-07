import { TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import ItemQuantityDropdown from './ItemQuantityDropdown';

const CartItem = ({
	product,
	index,
	handleAddToCart,
	handleRemoveFromCart,
}) => {
	const itemTotal = (product.price * product.qty).toLocaleString('en-IN');

	return (
		<li className='flex gap-4 py-6 sm:gap-6 sm:py-8'>
			{/* Product Thumbnail */}
			<Link
				to={`/product/${product._id}`}
				className='relative h-28 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 sm:h-32 sm:w-28'
			>
				<img
					src={product.image}
					alt={product.name}
					className='h-full w-full object-cover object-center transition-opacity hover:opacity-90'
				/>
			</Link>

			{/* Item Details */}
			<div className='flex flex-1 flex-col justify-between'>
				<div className='flex items-start justify-between gap-4'>
					<div>
						{product.brand && (
							<p className='text-[11px] font-semibold uppercase tracking-wider text-slate-400'>
								{product.brand}
							</p>
						)}

						<h3 className='mt-0.5 text-sm font-semibold text-slate-900 sm:text-base'>
							<Link
								to={`/product/${product._id}`}
								className='transition-colors hover:text-slate-600'
							>
								{product.name}
							</Link>
						</h3>

						<div className='mt-1.5 flex items-center gap-2'>
							<span className='inline-block h-1.5 w-1.5 rounded-full bg-emerald-500' />
							<span className='text-xs font-medium text-slate-600'>
								{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
							</span>
						</div>
					</div>

					{/* Price */}
					<div className='text-right'>
						<p className='text-base font-bold text-slate-900'>
							₹{itemTotal}
						</p>
						{product.qty > 1 && (
							<p className='text-[11px] text-slate-400'>
								₹{product.price.toLocaleString('en-IN')} each
							</p>
						)}
					</div>
				</div>

				{/* Quantity & Remove Row */}
				<div className='mt-4 flex items-center justify-between pt-2'>
					<ItemQuantityDropdown
						product={product}
						index={index}
						handleAddToCart={handleAddToCart}
					/>

					<button
						type='button'
						onClick={() => handleRemoveFromCart(product._id)}
						className='inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors hover:text-rose-600'
					>
						<TrashIcon className='h-3.5 w-3.5' />
						<span>Remove</span>
					</button>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
