import CategoryImageBox from './CategoryImageBox';
import LinkItem from './LinkItem';

const AccessoriesMenuDisplay = () => {
	return (
		<section className='border-t border-slate-300'>
			<div className='relative z-50 mx-auto hidden max-w-7xl gap-10 bg-white px-3 py-8 sm:px-6 lg:flex lg:px-8'>
				<div className='grid w-full grid-cols-12 gap-8'>
					<div className='col-span-2'>
						<h6 className='mb-6 text-sm font-semibold text-slate-900'>
							Leather & Accents
						</h6>
						<ul className='flex flex-col gap-y-3'>
							<LinkItem url='/search/Accessories' label='All Luxury Accents' />
							<LinkItem url='/search/Briefcase' label='Leather Briefcases' />
							<LinkItem url='/search/Cardholder' label='Saffiano Cardholders' />
							<LinkItem url='/search/Bag' label='Quilted Chain Bags' />
						</ul>
					</div>

					<div className='col-span-2'>
						<h6 className='mb-6 text-sm font-semibold text-slate-900'>
							Artisans
						</h6>
						<ul className='flex flex-col gap-y-3'>
							<LinkItem url='/search/Heritage' label='Heritage Craft' />
							<LinkItem url='/search/Maison' label='Maison Luxe' />
							<LinkItem url='/search/Accessories' label='View All Accents' />
						</ul>
					</div>

					<div className='col-span-5'>
						<CategoryImageBox
							url='/search/Briefcase'
							imageUrl='/images/accessories-category.jpg'
							label='Handcrafted Leather'
						/>
					</div>

					<div className='col-span-3'>
						<CategoryImageBox
							url='/search/Bag'
							imageUrl='/images/product-9.jpg'
							label='Quilted Chain Bags'
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AccessoriesMenuDisplay;
