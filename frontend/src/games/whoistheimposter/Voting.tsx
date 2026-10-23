import { useState } from 'react';
import type { Player } from './types';

type Props = {
	players: Player[];
	onDone: (votes: Record<string, string>) => void;
};

const Voting = ({ players, onDone }: Props) => {
	const [index, setIndex] = useState(0);
	const [votes, setVotes] = useState<Record<string, string>>({});
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [ready, setReady] = useState(false);

	const voter = players[index];

	if (!voter) return null;

	const handleConfirmVote = () => {
		if (!selectedId) return;

		// Build the updated votes before updating state.
		const updatedVotes = {
			...votes,
			[voter.id]: selectedId,
		};

		setVotes(updatedVotes);
		setSelectedId(null);
		setReady(false);

		if (index === players.length - 1) {
			onDone(updatedVotes);
		} else {
			setIndex((currentIndex) => currentIndex + 1);
		}
	};

	return (
		<div>
			{!ready ? (
				<>
					<h2>Pass the phone to {voter.name}</h2>

					<button onClick={() => setReady(true)}>Ready</button>
				</>
			) : (
				<>
					<h2>{voter.name}, cast your vote</h2>

					<div>
						{players
							.filter((player) => player.id !== voter.id)
							.map((player) => (
								<button
									key={player.id}
									type="button"
									onClick={() => setSelectedId(player.id)}
									aria-pressed={selectedId === player.id}
									style={{
										fontWeight: selectedId === player.id ? 'bold' : 'normal',
										outline:
											selectedId === player.id
												? '2px solid currentColor'
												: 'none',
									}}
								>
									{player.name}
								</button>
							))}
					</div>

					<button disabled={selectedId === null} onClick={handleConfirmVote}>
						Confirm vote
					</button>
				</>
			)}
		</div>
	);
};

export default Voting;
