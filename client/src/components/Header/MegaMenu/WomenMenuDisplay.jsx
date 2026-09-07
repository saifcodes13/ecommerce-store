import CategoryImageBox from './CategoryImageBox';
import LinkItem from './LinkItem';

const WomenMenuDisplay = () => {
	return (
		<section className='border-t border-slate-300'>
			<div className='relative z-50 mx-auto hidden max-w-7xl gap-10 bg-white px-3 py-8 sm:px-6 lg:flex lg:px-8'>
				<div className='grid w-full grid-cols-12 gap-8'>
					<div className='col-span-2'>
						<h6 className='mb-6 text-sm font-semibold text-slate-900'>
							Categories
						</h6>
						<ul className='flex flex-col gap-y-3'>
							<LinkItem url='/search/Women' label="All Women's Collection" />
							<LinkItem url='/search/Dress' label='Summer Dresses' />
							<LinkItem url='/search/Blouse' label='Silk Blouses' />
							<LinkItem url='/search/Coat' label='Trench Coats' />
							<LinkItem url='/search/Bag' label='Leather Bags' />
							<LinkItem url='/search/Shoes' label='Designer Footwear' />
						</ul>
					</div>

					<div className='col-span-2'>
						<h6 className='mb-6 text-sm font-semibold text-slate-900'>
							Top Designers
						</h6>
						<ul className='flex flex-col gap-y-3'>
							<LinkItem url='/search/Fashionista' label='Fashionista Atelier' />
							<LinkItem url='/search/Elegance' label='Elegance Paris' />
							<LinkItem url='/search/Maison' label='Maison Luxe' />
							<LinkItem url='/search/Women' label='View All Designers' />
						</ul>
					</div>

					<div className='col-span-5'>
						<CategoryImageBox
							url='/search/Women'
							imageUrl='/images/women-category.jpg'
							label="Women's Edit"
						/>
					</div>

					<div className='col-span-3'>
						<CategoryImageBox
							url='/search/Dress'
							imageUrl='/images/product-1.jpg'
							label='Floral Dresses'
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WomenMenuDisplay;
