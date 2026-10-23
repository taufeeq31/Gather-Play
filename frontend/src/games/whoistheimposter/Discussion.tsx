import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import type { Player } from './types';
import TimerCard from './TimerCard';

type Props = {
	players: Player[];
	durationSeconds: number;
	onDone: () => void;
};

function Discussion({ players, durationSeconds, onDone }: Props) {
	const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
	const [paused, setPaused] = useState(false);
	const [starterId] = useState(() => players[Math.floor(Math.random() * players.length)]?.id);

	useEffect(() => {
		if (paused || secondsLeft <= 0) return;
		const intervalId = window.setInterval(() => {
			setSecondsLeft((current) => Math.max(0, current - 1));
		}, 1000);
		return () => window.clearInterval(intervalId);
	}, [paused, secondsLeft]);

	const starter = players.find((player) => player.id === starterId);

	return (
		<div className="pb-28">
			<h1 className="font-heading text-3xl font-bold leading-tight sm:text-4xl">Talk it out</h1>
			<p className="mt-2 text-sm text-ink/70">Give the imposters a chance to blend in.</p>

			<TimerCard secondsLeft={secondsLeft} durationSeconds={durationSeconds} />

			<div className="mt-4 grid grid-cols-2 gap-3">
				<Button type="button" variant="secondary" disabled={secondsLeft === 0} onClick={() => setPaused((current) => !current)}>{paused ? 'Resume' : 'Pause'}</Button>
				<Button type="button" variant="secondary" onClick={() => setSecondsLeft((current) => current + 30)}>+30 sec</Button>
			</div>

			<Card className="mt-6 px-4 py-4">
				<p className="text-xs font-bold uppercase tracking-widest">Who starts?</p>
				<p className="mt-1 break-words font-heading text-2xl font-bold">{starter?.name ?? 'Everyone'}</p>
				<p className="mt-1 text-sm text-ink/70">They can kick off the conversation.</p>
			</Card>

			<section className="mt-6" aria-labelledby="discussion-players">
				<h2 id="discussion-players" className="font-heading text-sm font-bold">Players</h2>
				<ul className="mt-2 flex flex-wrap gap-2">
					{players.map((player, index) => (
						<li key={player.id} className={`max-w-full truncate rounded-md border-2 border-ink px-3 py-1.5 text-sm font-bold ${['bg-mustard', 'bg-tomato', 'bg-green'][index % 3]}`}>{player.name}</li>
					))}
				</ul>
			</section>

			<div className="fixed inset-x-0 bottom-0 z-10 border-t-2 border-ink bg-bg px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:sticky sm:mt-8 sm:border-0 sm:bg-transparent sm:p-0">
				<div className="mx-auto w-full max-w-md sm:max-w-none">
					<Button type="button" className="w-full" onClick={onDone}>Start voting</Button>
				</div>
			</div>
		</div>
	);
}

export default Discussion;
