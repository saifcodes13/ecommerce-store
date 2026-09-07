import CategoryImageBox from './CategoryImageBox';
import LinkItem from './LinkItem';

const ShoesMenuDisplay = () => {
	return (
		<section className='border-t border-slate-300'>
			<div className='relative z-50 mx-auto hidden max-w-7xl gap-10 bg-white px-3 py-8 sm:px-6 lg:flex lg:px-8'>
				<div className='grid w-full grid-cols-12 gap-8'>
					<div className='col-span-2'>
						<h6 className='mb-6 text-sm font-semibold text-slate-900'>
							Footwear Styles
						</h6>
						<ul className='flex flex-col gap-y-3'>
							<LinkItem url='/search/Shoes' label='All Designer Footwear' />
							<LinkItem url='/search/Oxford' label='Leather Oxfords' />
							<LinkItem url='/search/Sneakers' label='Minimalist Sneakers' />
							<LinkItem url='/search/Boots' label='Suede Chelsea Boots' />
							<LinkItem url='/search/Junior' label='Kids Active Footwear' />
						</ul>
					</div>

					<div className='col-span-2'>
						<h6 className='mb-6 text-sm font-semibold text-slate-900'>
							Featured Ateliers
						</h6>
						<ul className='flex flex-col gap-y-3'>
							<LinkItem url='/search/Cobbler' label='Cobbler & Co' />
							<LinkItem url='/search/Urban' label='Urban Atelier' />
							<LinkItem url='/search/Shoes' label='Explore All Styles' />
						</ul>
					</div>

					<div className='col-span-5'>
						<CategoryImageBox
							url='/search/Shoes'
							imageUrl='/images/shoes-category.jpg'
							label='Handcrafted Oxfords'
						/>
					</div>

					<div className='col-span-3'>
						<CategoryImageBox
							url='/search/Sneakers'
							imageUrl='/images/product-5.jpg'
							label='Urban Low-Tops'
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ShoesMenuDisplay;
