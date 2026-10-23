import { useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import type { Player } from './types';
import PlayerVoteCard from './PlayerVoteCard';

type Props = {
	players: Player[];
	onDone: (votes: Record<string, string>) => void;
};

function Voting({ players, onDone }: Props) {
	const [index, setIndex] = useState(0);
	const [votes, setVotes] = useState<Record<string, string>>({});
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [ready, setReady] = useState(false);
	const voter = players[index];

	if (!voter) return null;
	const isLastVoter = index === players.length - 1;

	const handleConfirmVote = () => {
		if (!selectedId) return;
		const updatedVotes = { ...votes, [voter.id]: selectedId };
		setVotes(updatedVotes);
		setSelectedId(null);
		setReady(false);
		if (isLastVoter) onDone(updatedVotes);
		else setIndex((currentIndex) => currentIndex + 1);
	};

	return (
		<div className="pb-28">
			<h1 className="font-heading text-3xl font-bold leading-tight sm:text-4xl">Cast your vote</h1>
			<p className="mt-2 text-sm text-ink/70">Votes are private. Pass the phone after each vote.</p>
			<p className="mt-6 text-center font-heading text-sm font-bold uppercase tracking-wide">Vote {index + 1} / {players.length}</p>

			{!ready ? (
				<>
					<Card className="mt-3 flex min-h-[22rem] flex-col items-center justify-center px-6 py-8 text-center">
						<p className="text-sm font-bold uppercase tracking-widest">Pass to</p>
						<p className="mt-3 max-w-full break-words font-heading text-4xl font-bold sm:text-5xl">{voter.name}</p>
						<p className="mt-4 text-sm text-ink/70">Ask everyone else to look away before continuing.</p>
					</Card>
					<div className="fixed inset-x-0 bottom-0 z-10 border-t-2 border-ink bg-bg px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:sticky sm:mt-8 sm:border-0 sm:bg-transparent sm:p-0">
						<div className="mx-auto w-full max-w-md sm:max-w-none">
							<Button type="button" className="w-full" onClick={() => setReady(true)}>I’m ready</Button>
						</div>
					</div>
				</>
			) : (
				<>
					<h2 className="mt-3 font-heading text-2xl font-bold">Choose a player</h2>
					<div className="mt-4 grid grid-cols-2 gap-3">
						{players.filter((player) => player.id !== voter.id).map((player) => (
							<PlayerVoteCard key={player.id} name={player.name} selected={selectedId === player.id} onSelect={() => setSelectedId(player.id)} />
						))}
					</div>
					<div className="fixed inset-x-0 bottom-0 z-10 border-t-2 border-ink bg-bg px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:sticky sm:mt-8 sm:border-0 sm:bg-transparent sm:p-0">
						<div className="mx-auto w-full max-w-md sm:max-w-none">
							<Button type="button" className="w-full" disabled={selectedId === null} onClick={handleConfirmVote}>Confirm vote</Button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Voting;
