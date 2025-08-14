import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '@components/Layout';
import PrivateRoute from '@components/PrivateRoute';
import CartScreen from '@screens/Cart';
import ErrorScreen from '@screens/Error';
import HomeScreen from '@screens/Home';
import LoginScreen from '@screens/Login';
import ProductDetails from '@screens/ProductDetails';
import RegisterScreen from '@screens/Register';
import ShippingScreen from '@screens/Shipping';
import store from './store';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorScreen />,
		children: [
			{
				index: true,
				element: <HomeScreen />,
			},
			{
				path: '/product/:id',
				element: <ProductDetails />,
			},
			{
				path: '/cart',
				element: <CartScreen />,
			},
			{
				path: '/login',
				element: <LoginScreen />,
			},
			{
				path: '/register',
				element: <RegisterScreen />,
			},
			{
				path: '',
				element: <PrivateRoute />,
				children: [
					{
						path: '/shipping',
						element: <ShippingScreen />,
					},
				],
			},
		],
	},
]);

const App = () => {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
			<ToastContainer
				position='bottom-right'
				hideProgressBar
				autoClose={5000}
			/>
		</Provider>
	);
};

export default App;
