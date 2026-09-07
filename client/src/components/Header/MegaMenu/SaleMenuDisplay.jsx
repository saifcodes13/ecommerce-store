import CategoryImageBox from './CategoryImageBox';
import LinkItem from './LinkItem';

const SaleMenuDisplay = () => {
	return (
		<section className='border-t border-slate-300'>
			<div className='relative z-50 mx-auto hidden max-w-7xl gap-10 bg-white px-3 py-8 sm:px-6 lg:flex lg:px-8'>
				<div className='grid w-full grid-cols-12 gap-8'>
					<div className='col-span-2'>
						<h6 className='mb-6 text-sm font-semibold text-rose-600'>
							Archive Markdowns
						</h6>
						<ul className='flex flex-col gap-y-3'>
							<LinkItem url='/search/Sale' label='All Markdown Pieces' />
							<LinkItem url='/search/Bomber' label='Bomber Jackets' />
							<LinkItem url='/search/Dress' label='Summer Dresses' />
							<LinkItem url='/search/Sneakers' label='Footwear Sale' />
							<LinkItem url='/search/Sale' label='Up to 40% Off' />
						</ul>
					</div>

					<div className='col-span-2'>
						<h6 className='mb-6 text-sm font-semibold text-slate-900'>
							Seasonal Deals
						</h6>
						<ul className='flex flex-col gap-y-3'>
							<LinkItem url='/search/Sale' label='Final Clearance' />
							<LinkItem url='/search/Sale' label='Under ₹4,999' />
							<LinkItem url='/search/Sale' label='Under ₹9,999' />
						</ul>
					</div>

					<div className='col-span-5'>
						<CategoryImageBox
							url='/search/Sale'
							imageUrl='/images/sale-category.jpg'
							label='Archive Reductions'
						/>
					</div>

					<div className='col-span-3'>
						<CategoryImageBox
							url='/search/Bomber'
							imageUrl='/images/product-8.jpg'
							label='Flight Bomber Deals'
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SaleMenuDisplay;
