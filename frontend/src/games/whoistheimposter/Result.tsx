import { useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import BigCard from './BigCard';
import type { Player } from './types';

type Props = {
	players: Player[];
	votes: Record<string, string>;
	secretWord: string;
	onPlayAgain: () => void;
	onNewGame: () => void;
};

function Result({ players, votes, secretWord, onPlayAgain, onNewGame }: Props) {
	const [revealed, setRevealed] = useState(false);
	const counts: Record<string, number> = {};
	for (const targetId of Object.values(votes)) counts[targetId] = (counts[targetId] ?? 0) + 1;

	const totalVotes = Object.keys(votes).length;
	const highestCount = Math.max(0, ...Object.values(counts));
	const topPlayers = players.filter((player) => (counts[player.id] ?? 0) === highestCount);
	const isTie = topPlayers.length !== 1;
	const votedOut = isTie ? undefined : topPlayers[0];
	const crewWon = !isTie && votedOut?.isImposter === true;
	const imposters = players.filter((player) => player.isImposter);

	if (!revealed) {
		return (
			<div className="pb-28">
				<h1 className="font-heading text-3xl font-bold leading-tight sm:text-4xl">The votes are in</h1>
				<BigCard className="mt-5">
					<p className="font-heading text-3xl font-bold">Everyone has voted</p>
					<p className="mt-3 text-sm text-ink/70">Ready to find out who fooled the group?</p>
				</BigCard>
				<div className="fixed inset-x-0 bottom-0 z-10 border-t-2 border-ink bg-bg px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:sticky sm:mt-8 sm:border-0 sm:bg-transparent sm:p-0">
					<div className="mx-auto w-full max-w-md sm:max-w-none">
						<Button type="button" className="w-full" onClick={() => setRevealed(true)}>Reveal results</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="pb-32">
			<h1 className="font-heading text-3xl font-bold leading-tight sm:text-4xl">Game results</h1>

			<BigCard className="mt-5">
				<p className="text-sm font-bold uppercase tracking-widest">{isTie ? 'No one is out' : 'Voted out'}</p>
				<p className="mt-3 break-words font-heading text-4xl font-bold">{isTie ? 'Tie, nobody is out' : votedOut?.name}</p>
				{votedOut && <p className="mt-2 font-bold">{votedOut.isImposter ? 'They were an imposter.' : 'They were crew.'}</p>}
			</BigCard>

			<Card className={`mt-5 px-5 py-5 text-center ${crewWon ? 'bg-mustard' : 'bg-tomato'}`}>
				<p className="text-xs font-bold uppercase tracking-widest">Winner</p>
				<p className="mt-1 font-heading text-4xl font-bold">{crewWon ? 'Crew' : 'Imposters'}</p>
			</Card>

			<div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
				<Card className="px-4 py-4">
					<p className="text-xs font-bold uppercase tracking-widest">Secret word</p>
					<p className="mt-1 break-words font-heading text-2xl font-bold">{secretWord}</p>
				</Card>
				<Card className="px-4 py-4">
					<p className="text-xs font-bold uppercase tracking-widest">Imposter{imposters.length === 1 ? '' : 's'}</p>
					<p className="mt-1 break-words font-heading text-xl font-bold">{imposters.map((player) => player.name).join(', ') || 'None'}</p>
				</Card>
			</div>

			<section className="mt-7" aria-labelledby="vote-counts-title">
				<h2 id="vote-counts-title" className="font-heading text-xl font-bold">Vote counts</h2>
				<ul className="mt-3 space-y-3">
					{players.map((player) => {
						const count = counts[player.id] ?? 0;
						const share = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
						return (
							<li key={player.id} className="grid grid-cols-[minmax(0,1fr)_2.5rem] items-center gap-x-3 gap-y-1">
								<span className="truncate font-semibold" title={player.name}>{player.name}</span>
								<span className="text-right font-heading font-bold">{count}</span>
								<div className="col-span-2 h-4 overflow-hidden rounded-md border-2 border-ink bg-surface" role="progressbar" aria-label={`${player.name} vote share`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(share)}>
									<div className="h-full bg-mustard" style={{ width: `${share}%` }} />
								</div>
							</li>
						);
					})}
				</ul>
			</section>

			<div className="fixed inset-x-0 bottom-0 z-10 border-t-2 border-ink bg-bg px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:sticky sm:mt-8 sm:border-0 sm:bg-transparent sm:p-0">
				<div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 sm:max-w-none">
					<Button type="button" onClick={onPlayAgain}>Play again</Button>
					<Button type="button" variant="secondary" onClick={onNewGame}>New game</Button>
				</div>
			</div>
		</div>
	);
}

export default Result;
