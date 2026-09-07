import { CheckIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const steps = [
	{ id: 1, name: 'Sign In', to: '/login', prop: 'step1' },
	{ id: 2, name: 'Shipping', to: '/shipping', prop: 'step2' },
	{ id: 3, name: 'Payment', to: '/payment', prop: 'step3' },
	{ id: 4, name: 'Place Order', to: '/place-order', prop: 'step4' },
];

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	const stepProps = { step1, step2, step3, step4 };

	return (
		<nav aria-label='Checkout Progress' className='w-full max-w-2xl py-4'>
			<ol className='flex items-center justify-between'>
				{steps.map((step, idx) => {
					const isCompleted = stepProps[step.prop];
					const isCurrent = (step.id === 4 && step4) || 
						(step.id === 3 && step3 && !step4) ||
						(step.id === 2 && step2 && !step3) ||
						(step.id === 1 && step1 && !step2);

					return (
						<li key={step.id} className='flex flex-1 items-center last:flex-none'>
							<div className='flex flex-col items-center sm:flex-row sm:gap-2'>
								<div
									className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
										isCompleted
											? 'bg-slate-900 text-white'
											: 'border border-slate-300 bg-white text-slate-400'
									}`}
								>
									{isCompleted && step.id < 4 ? (
										<CheckIcon className='h-3.5 w-3.5 stroke-[3]' />
									) : (
										step.id
									)}
								</div>

								{isCompleted ? (
									<Link
										to={step.to}
										className={`mt-1 text-xs sm:mt-0 font-medium transition-colors ${
											isCurrent ? 'font-bold text-slate-900' : 'text-slate-600 hover:text-slate-900'
										}`}
									>
										{step.name}
									</Link>
								) : (
									<span className='mt-1 text-xs text-slate-400 sm:mt-0 font-medium'>
										{step.name}
									</span>
								)}
							</div>

							{idx < steps.length - 1 && (
								<div
									className={`mx-2 hidden h-0.5 flex-1 sm:block ${
										stepProps[steps[idx + 1].prop]
											? 'bg-slate-900'
											: 'bg-slate-200'
									}`}
								/>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

export default CheckoutSteps;
