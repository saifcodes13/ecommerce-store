import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

const ItemQuantityDropdown = ({ product, handleAddToCart }) => {
	const currentQty = product.qty || 1;
	const maxStock = product.countInStock || 10;

	return (
		<div className='inline-flex items-center rounded-lg border border-slate-200 bg-white shadow-xs'>
			<button
				type='button'
				onClick={() => handleAddToCart(product, currentQty - 1)}
				disabled={currentQty <= 1}
				aria-label='Decrease quantity'
				className='flex h-8 w-8 items-center justify-center text-slate-500 transition-colors hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30'
			>
				<MinusIcon className='h-3.5 w-3.5' strokeWidth={2} />
			</button>

			<span className='min-w-8 text-center text-xs font-semibold text-slate-900'>
				{currentQty}
			</span>

			<button
				type='button'
				onClick={() => handleAddToCart(product, currentQty + 1)}
				disabled={currentQty >= maxStock}
				aria-label='Increase quantity'
				className='flex h-8 w-8 items-center justify-center text-slate-500 transition-colors hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30'
			>
				<PlusIcon className='h-3.5 w-3.5' strokeWidth={2} />
			</button>
		</div>
	);
};

export default ItemQuantityDropdown;
