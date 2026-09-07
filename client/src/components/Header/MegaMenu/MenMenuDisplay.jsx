import CategoryImageBox from './CategoryImageBox';
import LinkItem from './LinkItem';

const MenMenuDisplay = () => {
	return (
		<section className='border-t border-slate-300'>
			<div className='relative z-50 mx-auto hidden max-w-7xl gap-10 bg-white px-3 py-8 sm:px-6 lg:flex lg:px-8'>
				<div className='grid w-full grid-cols-12 gap-8'>
					<div className='col-span-2'>
						<h6 className='mb-6 text-sm font-semibold text-slate-900'>
							Categories
						</h6>
						<ul className='flex flex-col gap-y-3'>
							<LinkItem url='/search/Men' label="All Men's Collection" />
							<LinkItem url='/search/Jeans' label='Denim & Jeans' />
							<LinkItem url='/search/Suit' label='Tailored Suits' />
							<LinkItem url='/search/Polo' label='Shirts & Polos' />
							<LinkItem url='/search/Shoes' label='Footwear & Boots' />
							<LinkItem url='/search/Watches' label='Timepieces' />
							<LinkItem url='/search/Sweater' label='Cashmere & Knits' />
						</ul>
					</div>

					<div className='col-span-2'>
						<h6 className='mb-6 text-sm font-semibold text-slate-900'>
							Top Brands
						</h6>
						<ul className='flex flex-col gap-y-3'>
							<LinkItem url='/search/DenimPro' label='DenimPro' />
							<LinkItem url='/search/Atelier' label='Atelier Milano' />
							<LinkItem url='/search/Club' label='Club Sartoria' />
							<LinkItem url='/search/Cobbler' label='Cobbler & Co' />
							<LinkItem url='/search/Geneva' label='Geneva Chrono' />
						</ul>
					</div>

					<div className='col-span-5'>
						<CategoryImageBox
							url='/search/Watches'
							imageUrl='/images/men-watches-category.jpg'
							label='Luxury Watches'
						/>
					</div>

					<div className='col-span-3'>
						<CategoryImageBox
							url='/search/Suit'
							imageUrl='/images/mens-suit-category.jpg'
							label="Men's Suits"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MenMenuDisplay;
