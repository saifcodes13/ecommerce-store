import Footer from '@components/Footer';
import Header from '@components/Header';

const App = () => {
	return (
		<div className='flex min-h-screen flex-col bg-slate-100'>
			<Header />
			<div className='flex-grow'></div>
			<Footer />
		</div>
	);
};

export default App;
