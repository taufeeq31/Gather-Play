import type { GameState } from './types';

const steps = [
	{ id: 'setup', label: 'Setup' },
	{ id: 'reveal', label: 'Reveal' },
	{ id: 'discussion', label: 'Talk' },
	{ id: 'voting', label: 'Vote' },
	{ id: 'result', label: 'Result' },
] as const;

type Props = {
	phase: GameState['phase'];
};

function StepIndicator({ phase }: Props) {
	const currentIndex = steps.findIndex((step) => step.id === phase);

	return (
		<nav aria-label="Game progress">
			<ol className="flex items-center gap-1.5">
			{steps.map((step, index) => {
				const current = index === currentIndex;

				return (
					<li
						key={step.id}
						aria-current={current ? 'step' : undefined}
						className={`h-2.5 w-5 rounded-sm border-2 border-ink ${current ? 'bg-mustard' : 'bg-surface'}`}
					>
						<span className="sr-only">{step.label}{current ? ', current step' : ''}</span>
					</li>
				);
			})}
			</ol>
		</nav>
	);
}

export default StepIndicator;
