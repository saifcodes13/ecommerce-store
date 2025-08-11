import {
	ShoppingBagIcon,
	TagIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';

import MenuItem from './MenuItem';

const DesktopMenu = () => {
	const { cartItems } = useSelector((state) => state.cart);

	return (
		<nav className='hidden items-center sm:ml-6 sm:flex sm:space-x-8'>
			<MenuItem url='/categories' label='Categories' icon={TagIcon} />
			<MenuItem url='/login' label='Login' icon={UserIcon} />

			<div className='flex items-center gap-2'>
				<MenuItem url='/cart' label='Cart' icon={ShoppingBagIcon} />
				<span className='min-w-5 rounded-full bg-indigo-700 text-center text-sm font-semibold text-white'>
					{cartItems.length}
				</span>
			</div>
		</nav>
	);
};

export default DesktopMenu;
