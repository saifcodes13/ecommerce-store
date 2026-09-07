import CategoryImageBox from './CategoryImageBox';
import LinkItem from './LinkItem';

const CollectionsMenuDisplay = () => {
	return (
		<section className='border-t border-slate-300'>
			<div className='relative z-50 mx-auto hidden max-w-7xl gap-10 bg-white px-3 py-8 sm:px-6 lg:flex lg:px-8'>
				<div className='grid w-full grid-cols-12 gap-8'>
					<div className='col-span-2'>
						<h6 className='mb-6 text-sm font-semibold text-slate-900'>
							Curated Drops
						</h6>
						<ul className='flex flex-col gap-y-3'>
							<LinkItem url='/search/Collections' label='All Exclusive Capsules' />
							<LinkItem url='/search/Silk' label='Haute Silk Edition' />
							<LinkItem url='/search/Suit' label='Bespoke Tailoring' />
							<LinkItem url='/search/Collections' label='Spring/Summer 2026' />
						</ul>
					</div>

					<div className='col-span-2'>
						<h6 className='mb-6 text-sm font-semibold text-slate-900'>
							Atelier Highlights
						</h6>
						<ul className='flex flex-col gap-y-3'>
							<LinkItem url='/search/SaifCart' label='SaifCart Atelier' />
							<LinkItem url='/search/Milano' label='Atelier Milano' />
							<LinkItem url='/search/Collections' label='Limited Run Series' />
						</ul>
					</div>

					<div className='col-span-5'>
						<CategoryImageBox
							url='/search/Collections'
							imageUrl='/images/collections-category.jpg'
							label='Summer Capsule'
						/>
					</div>

					<div className='col-span-3'>
						<CategoryImageBox
							url='/search/Suit'
							imageUrl='/images/mens-suit-category.jpg'
							label='Italian Tailoring'
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CollectionsMenuDisplay;
