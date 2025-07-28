import Footer from '@components/Footer';
import Header from '@components/Header';
import HomeScreen from '@screens/Home';

const App = () => {
	return (
		<div className='flex min-h-screen flex-col bg-slate-100'>
			<Header />
			<div className='h-[56px] sm:h-[64px] lg:h-[106px]'></div>
			<div className='flex-grow'>
				<HomeScreen />
			</div>
			<Footer />
		</div>
	);
};

export default App;
