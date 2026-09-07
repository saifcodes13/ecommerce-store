import CategoryImageBox from './CategoryImageBox';
import LinkItem from './LinkItem';

const WatchesMenuDisplay = () => {
	return (
		<section className='border-t border-slate-300'>
			<div className='relative z-50 mx-auto hidden max-w-7xl gap-10 bg-white px-3 py-8 sm:px-6 lg:flex lg:px-8'>
				<div className='grid w-full grid-cols-12 gap-8'>
					<div className='col-span-2'>
						<h6 className='mb-6 text-sm font-semibold text-slate-900'>
							Watch Categories
						</h6>
						<ul className='flex flex-col gap-y-3'>
							<LinkItem url='/search/Watches' label='All Luxury Timepieces' />
							<LinkItem url='/search/Automatic' label='Automatic Watches' />
							<LinkItem url='/search/Chrono' label='Chronographs' />
							<LinkItem url='/search/Diver' label='Diver Collection' />
							<LinkItem url='/search/Minimalist' label='Minimalist Timepieces' />
						</ul>
					</div>

					<div className='col-span-2'>
						<h6 className='mb-6 text-sm font-semibold text-slate-900'>
							Horology Brands
						</h6>
						<ul className='flex flex-col gap-y-3'>
							<LinkItem url='/search/Geneva' label='Geneva Chrono' />
							<LinkItem url='/search/Aethelgard' label='Aethelgard' />
							<LinkItem url='/search/Watches' label='View All Houses' />
						</ul>
					</div>

					<div className='col-span-5'>
						<CategoryImageBox
							url='/search/Watches'
							imageUrl='/images/watches-category.jpg'
							label='Rose Gold Minimalist'
						/>
					</div>

					<div className='col-span-3'>
						<CategoryImageBox
							url='/search/Chrono'
							imageUrl='/images/men-watches-category.jpg'
							label='Swiss Chronograph'
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WatchesMenuDisplay;
