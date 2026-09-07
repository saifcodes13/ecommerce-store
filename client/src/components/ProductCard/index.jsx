import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import CardImage from './CardImage';
import Rating from './Rating';

const ProductCard = ({ product }) => {
	const originalPrice = Math.round(product.price * 1.25);

	return (
		<Link
			to={`/product/${product._id}`}
			className='group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl'
		>
			<div>
				<CardImage
					name={product.name}
					image={product.image}
					brand={product.brand}
					countInStock={product.countInStock}
				/>

				<div className='mt-3.5 flex flex-col gap-1.5'>
					{product.category && (
						<p className='text-[11px] font-semibold uppercase tracking-wider text-slate-400'>
							{product.category}
						</p>
					)}

					<h3 className='line-clamp-1 text-sm font-bold text-slate-900 transition-colors group-hover:text-amber-600'>
						{product.name}
					</h3>

					<Rating value={product.rating} numReviews={product.numReviews} />
				</div>
			</div>

			<div className='mt-3 flex items-center justify-between border-t border-slate-100 pt-3'>
				<div className='flex items-baseline gap-2'>
					<span className='text-base font-extrabold text-slate-900'>
						₹{product.price.toLocaleString('en-IN')}
					</span>
					<span className='text-xs text-slate-400 line-through'>
						₹{originalPrice.toLocaleString('en-IN')}
					</span>
				</div>

				<span className='inline-flex items-center gap-0.5 text-xs font-semibold text-amber-600 transition-transform duration-200 group-hover:translate-x-0.5'>
					<span>View</span>
					<ArrowUpRightIcon className='h-3.5 w-3.5' strokeWidth={2.5} />
				</span>
			</div>
		</Link>
	);
};

export default ProductCard;
