const MegaMenuItem = ({ label, action, currentMenuItem }) => {
	return (
		<button
			onClick={() => {
				if (currentMenuItem !== label) {
					action(label);
				} else {
					action(null);
				}
			}}
			className={`text-sm hover:text-slate-900 cursor-pointer ${
				currentMenuItem === label
					? 'font-bold text-indigo-700 underline underline-offset-4'
					: 'font-medium text-slate-700'
			}`}>
			{label}
		</button>
	);
};

export default MegaMenuItem;
