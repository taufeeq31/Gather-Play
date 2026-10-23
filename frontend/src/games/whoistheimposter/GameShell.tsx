import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { GameState } from './types';
import StepIndicator from './StepIndicator';

type Props = {
	phase: GameState['phase'];
	children: ReactNode;
};

function GameShell({ phase, children }: Props) {
	return (
		<div className="flex min-h-dvh flex-col">
			<header className="h-14 shrink-0 border-b-2 border-ink">
				<div className="mx-auto flex h-full w-full max-w-md items-center justify-between px-4">
					<Link
						to="/"
						className="inline-flex min-h-12 items-center rounded px-2 font-heading font-bold focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-2"
					>
						<span aria-hidden="true">←</span>
						<span className="ml-2">Home</span>
					</Link>
					<StepIndicator phase={phase} />
				</div>
			</header>
			<main className="mx-auto w-full max-w-md flex-1 px-4 py-6">
				<div key={phase} className="game-screen-enter motion-reduce:animate-none">
					{children}
				</div>
			</main>
		</div>
	);
}

export default GameShell;
