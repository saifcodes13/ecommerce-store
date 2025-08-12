import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '@components/Layout';
import CartScreen from '@screens/Cart';
import ErrorScreen from '@screens/Error';
import HomeScreen from '@screens/Home';
import LoginScreen from '@screens/Login';
import ProductDetails from '@screens/ProductDetails';
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
