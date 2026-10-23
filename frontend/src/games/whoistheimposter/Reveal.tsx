import { useState } from 'react';
import Button from '../../components/Button';
import type { Player } from './types';
import BigCard from './BigCard';

type Props = {
	players: Player[];
	secretWord: string;
	onDone: () => void;
};

function Reveal({ players, secretWord, onDone }: Props) {
	const [index, setIndex] = useState(0);
	const [showing, setShowing] = useState(false);
	const player = players[index];

	if (!player) return null;
	const isLastPlayer = index === players.length - 1;

	const handleHideAndPass = () => {
		setShowing(false);
		if (isLastPlayer) onDone();
		else setIndex((currentIndex) => currentIndex + 1);
	};

	return (
		<div className="pb-28">
			<h1 className="font-heading text-3xl font-bold leading-tight">Pass the phone</h1>
			<p className="mt-2 text-sm text-ink/70">Each player should keep their role secret.</p>

			<p className="mt-6 text-center font-heading text-sm font-bold uppercase tracking-wide">Player {index + 1} / {players.length}</p>
			<BigCard
				key={showing ? 'shown' : 'hidden'}
				className="mt-3"
				tone={showing ? (player.isImposter ? 'tomato' : 'mustard') : 'surface'}
				animated
			>
				{showing ? (
					player.isImposter ? (
						<div>
							<p className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">IMPOSTER</p>
							<p className="mt-4 font-medium">Blend in. Don’t get caught.</p>
						</div>
					) : (
					<div>
						<p className="text-sm font-bold uppercase tracking-widest">Your secret word</p>
						<p className="mt-3 break-words font-heading text-4xl font-bold sm:text-5xl">{secretWord}</p>
					</div>
					)
				) : (
					<div>
						<p className="text-sm font-bold uppercase tracking-widest">Pass the phone to</p>
					<p className="mt-3 break-words font-heading text-4xl font-bold sm:text-5xl">{player.name}</p>
					<p className="mt-4 text-sm text-ink/70">Make sure only {player.name} can see the screen.</p>
					</div>
				)}
			</BigCard>

			<div className="fixed inset-x-0 bottom-0 z-10 border-t-2 border-ink bg-bg px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:sticky sm:mt-8 sm:border-0 sm:bg-transparent sm:p-0">
				<div className="mx-auto w-full max-w-md sm:max-w-none">
					{showing ? (
						<Button type="button" className="w-full" onClick={handleHideAndPass}>{isLastPlayer ? 'Start discussion' : 'Hide & pass'}</Button>
					) : (
					<Button type="button" className="w-full" onClick={() => setShowing(true)}>Tap to reveal</Button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Reveal;
