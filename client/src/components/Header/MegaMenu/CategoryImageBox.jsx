const CategoryImageBox = ({ url, imageUrl, label }) => {
	return (
		<div>
			<a href={url} className='relative block rounded-xl overflow-hidden'>
				<span className='absolute bottom bg-white px-3 py-2 text-center text-sm font-semibold uppercase tracking-wide rounded-lg z-10 transform -translate-x-1/2 translate-y-1/2 left-1/2 bottom-10'>
					{label}
				</span>
				<img
					src={imageUrl}
					alt={label}
					className='h-64 w-full rounded-xl object-cover object-top hover:scale-105 transition-all duration-500'
				/>
			</a>
		</div>
	);
};

export default CategoryImageBox;
