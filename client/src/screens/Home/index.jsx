import ProductCard from '@components/ProductCard';
import products from '@data/products';

const HomeScreen = () => {
	return (
		<section className='bg-white'>
			<div className='mx-auto max-w-7xl px-3 py-10 sm:px-6 lg:px-8'>
				<h1 className='text-2xl font-bold text-slate-900'>Latest Products</h1>

				<div className='grid mt-6 grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
					{products.map((prod) => (
						<ProductCard key={prod._id} product={prod} />
					))}
				</div>
			</div>
		</section>
	);
};

export default HomeScreen;
