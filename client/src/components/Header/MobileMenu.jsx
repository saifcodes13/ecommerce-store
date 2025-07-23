import {
	ShoppingBagIcon,
	TagIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import MenuItemMobile from './MenuItemMobile';
import MobileSearchBar from './MobileSearchBar';

const MobileMenu = ({ setIsOpen }) => {
	return (
		<nav className='relative z-10 w-full bg-white pb-2 sm:max-w-sm overflow-y-auto'>
			<MobileSearchBar />
			<div className='h-2' />
			<div>
				<MenuItemMobile
					url='/categories'
					label='Categories'
					icon={TagIcon}
					closeMenu={setIsOpen}
				/>
				<MenuItemMobile
					url='/login'
					label='Login'
					icon={UserIcon}
					closeMenu={setIsOpen}
				/>
				<MenuItemMobile
					url='/cart'
					label='Cart'
					icon={ShoppingBagIcon}
					closeMenu={setIsOpen}
				/>
			</div>
		</nav>
	);
};

export default MobileMenu;
