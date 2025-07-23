import {
	ShoppingBagIcon,
	TagIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import MenuItem from './MenuItem';

const DesktopMenu = () => {
	return (
		<nav className='hidden items-center sm:ml-6 sm:flex sm:space-x-8'>
			<MenuItem url='/categories' label='Categories' icon={TagIcon} />
			<MenuItem url='/login' label='Login' icon={UserIcon} />
			<MenuItem url='/cart' label='Cart' icon={ShoppingBagIcon} />
		</nav>
	);
};

export default DesktopMenu;
