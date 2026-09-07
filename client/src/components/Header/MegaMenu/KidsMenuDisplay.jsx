import CategoryImageBox from './CategoryImageBox';
import LinkItem from './LinkItem';

const KidsMenuDisplay = () => {
	return (
		<section className='border-t border-slate-300'>
			<div className='relative z-50 mx-auto hidden max-w-7xl gap-10 bg-white px-3 py-8 sm:px-6 lg:flex lg:px-8'>
				<div className='grid w-full grid-cols-12 gap-8'>
					<div className='col-span-2'>
						<h6 className='mb-6 text-sm font-semibold text-slate-900'>
							Junior Categories
						</h6>
						<ul className='flex flex-col gap-y-3'>
							<LinkItem url='/search/Kids' label='All Kids Collection' />
							<LinkItem url='/search/Hoodie' label='Hoodies & Sweatshirts' />
							<LinkItem url='/search/Junior' label='Junior Activewear' />
							<LinkItem url='/search/Sneakers' label='Junior Footwear' />
						</ul>
					</div>

					<div className='col-span-2'>
						<h6 className='mb-6 text-sm font-semibold text-slate-900'>
							Featured Brands
						</h6>
						<ul className='flex flex-col gap-y-3'>
							<LinkItem url='/search/Junior Luxe' label='Junior Luxe' />
							<LinkItem url='/search/Kids' label='View All Brands' />
						</ul>
					</div>

					<div className='col-span-5'>
						<CategoryImageBox
							url='/search/Kids'
							imageUrl='/images/kids-category.jpg'
							label='Junior Collection'
						/>
					</div>

					<div className='col-span-3'>
						<CategoryImageBox
							url='/search/Kids'
							imageUrl='/images/product-10.jpg'
							label='Kids Trail Shoes'
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default KidsMenuDisplay;
