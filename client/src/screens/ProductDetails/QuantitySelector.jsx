import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

const QuantitySelector = ({ countInStock, quantity, setQuantity }) => {
	const handleIncrement = () => {
		setQuantity((prev) => Math.min(prev + 1, countInStock));
	};

	const handleDecrement = () => {
		setQuantity((prev) => Math.max(prev - 1, 1));
	};

	return (
		<div className='flex items-center gap-4'>
			<span className='text-xs font-bold uppercase tracking-wider text-slate-700'>
				Quantity
			</span>
			<div className='inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1 shadow-xs'>
				<button
					type='button'
					onClick={handleDecrement}
					disabled={quantity <= 1}
					aria-label='Decrease quantity'
					className='flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-700 shadow-xs transition-all hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95'
				>
					<MinusIcon className='h-3.5 w-3.5' strokeWidth={2.5} />
				</button>

				<span className='w-10 text-center font-mono text-sm font-bold text-slate-900'>
					{quantity}
				</span>

				<button
					type='button'
					onClick={handleIncrement}
					disabled={quantity >= countInStock}
					aria-label='Increase quantity'
					className='flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-700 shadow-xs transition-all hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95'
				>
					<PlusIcon className='h-3.5 w-3.5' strokeWidth={2.5} />
				</button>
			</div>

			<span className='text-xs text-slate-500'>
				({countInStock} available in stock)
			</span>
		</div>
	);
};

export default QuantitySelector;
