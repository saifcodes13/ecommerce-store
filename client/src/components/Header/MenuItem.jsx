const MenuItem = ({ url, label, icon: Icon }) => {
	return (
		<a
			href={url}
			className='flex items-center gap-1 text-sm font-semibold text-slate-950 hover:text-slate-600 transition-all'>
			<Icon className='h-4 w-4' strokeWidth={2} />
			{label}
		</a>
	);
};

export default MenuItem;
