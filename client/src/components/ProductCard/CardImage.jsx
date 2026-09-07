import { EyeIcon } from '@heroicons/react/24/outline';

const CardImage = ({ image, name, brand, countInStock }) => {
	return (
		<div className='relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-100'>
			<img
				src={image}
				alt={name}
				loading='lazy'
				className='h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105'
			/>

			{/* Top Badges */}
			<div className='absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none'>
				{brand ? (
					<span className='rounded-full bg-white/85 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-800 shadow-xs backdrop-blur-md'>
						{brand}
					</span>
				) : <span />}

				{countInStock === 0 ? (
					<span className='rounded-full bg-slate-900/90 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-xs backdrop-blur-md'>
						Sold Out
					</span>
				) : countInStock <= 5 ? (
					<span className='rounded-full bg-rose-500/90 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-xs backdrop-blur-md'>
						Only {countInStock} Left
					</span>
				) : null}
			</div>

			{/* Subtle hover overlay with Quick View */}
			<div className='absolute inset-0 flex items-center justify-center bg-slate-950/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
				<span className='inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-slate-900 shadow-md backdrop-blur-md transition-transform duration-200 group-hover:scale-100 scale-90'>
					<EyeIcon className='h-4 w-4 text-slate-800' strokeWidth={2} />
					<span>Quick View</span>
				</span>
			</div>
		</div>
	);
};

export default CardImage;
