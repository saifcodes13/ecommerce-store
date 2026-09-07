import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import AllCategoriesMenuDisplay from './AllCategoriesMenuDisplay';
import MegaMenuItem from './MegaMenuItem';
import MenMenuDisplay from './MenMenuDisplay';
import WomenMenuDisplay from './WomenMenuDisplay';
import KidsMenuDisplay from './KidsMenuDisplay';
import CollectionsMenuDisplay from './CollectionsMenuDisplay';
import WatchesMenuDisplay from './WatchesMenuDisplay';
import ShoesMenuDisplay from './ShoesMenuDisplay';
import AccessoriesMenuDisplay from './AccessoriesMenuDisplay';
import SaleMenuDisplay from './SaleMenuDisplay';

const menuComponents = {
	'All Categories': AllCategoriesMenuDisplay,
	Men: MenMenuDisplay,
	Women: WomenMenuDisplay,
	Kids: KidsMenuDisplay,
	Collections: CollectionsMenuDisplay,
	Watches: WatchesMenuDisplay,
	Shoes: ShoesMenuDisplay,
	Accessories: AccessoriesMenuDisplay,
	Sale: SaleMenuDisplay,
};

const MegaMenu = () => {
	const [currentMenu, setCurrentMenu] = useState(null);
	const menuRef = useRef(null);
	const location = useLocation();

	const CurrentMenuComponent = currentMenu ? menuComponents[currentMenu] : null;

	// Close mega menu whenever navigation/route changes
	useEffect(() => {
		setCurrentMenu(null);
	}, [location]);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setCurrentMenu(null);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<>
			<nav className='relative mx-auto hidden max-w-7xl gap-10 bg-white px-3 py-2.5 sm:px-6 lg:flex lg:px-8'>
				<MegaMenuItem
					label='All Categories'
					action={setCurrentMenu}
					currentMenuItem={currentMenu}
				/>
				<MegaMenuItem
					action={setCurrentMenu}
					currentMenuItem={currentMenu}
					label='Men'
				/>
				<MegaMenuItem
					action={setCurrentMenu}
					currentMenuItem={currentMenu}
					label='Women'
				/>
				<MegaMenuItem
					action={setCurrentMenu}
					currentMenuItem={currentMenu}
					label='Kids'
				/>
				<MegaMenuItem
					action={setCurrentMenu}
					currentMenuItem={currentMenu}
					label='Collections'
				/>
				<MegaMenuItem
					action={setCurrentMenu}
					currentMenuItem={currentMenu}
					label='Watches'
				/>
				<MegaMenuItem
					action={setCurrentMenu}
					currentMenuItem={currentMenu}
					label='Shoes'
				/>
				<MegaMenuItem
					action={setCurrentMenu}
					currentMenuItem={currentMenu}
					label='Accessories'
				/>
				<MegaMenuItem
					action={setCurrentMenu}
					currentMenuItem={currentMenu}
					label='Sale'
				/>
			</nav>

			<div
				ref={menuRef}
				onClick={(e) => {
					if (e.target.closest('a') || e.target.closest('button')) {
						setCurrentMenu(null);
					}
				}}
			>
				{CurrentMenuComponent && <CurrentMenuComponent />}
			</div>
		</>
	);
};

export default MegaMenu;
