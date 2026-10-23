import type { Player } from './types';

type Props = {
	players: Player[];
	votes: Record<string, string>;
	secretWord: string;
	onPlayAgain: () => void;
};

const Result = ({ players, votes, secretWord, onPlayAgain }: Props) => {
	// Count votes received by each player.
	const counts: Record<string, number> = {};

	for (const playerId of Object.values(votes)) {
		counts[playerId] = (counts[playerId] ?? 0) + 1;
	}

	// Find the highest vote count.
	const highestCount = Math.max(0, ...Object.values(counts));

	// Find every player tied for the highest count.
	const topIds = players
		.filter((player) => (counts[player.id] ?? 0) === highestCount)
		.map((player) => player.id);

	const isTie = topIds.length > 1;

	const votedOut = !isTie ? players.find((player) => player.id === topIds[0]) : undefined;

	// Catching at least one imposter means the crew wins.
	const crewWon = !isTie && votedOut?.isImposter === true;

	const imposters = players.filter((player) => player.isImposter);

	return (
		<div>
			<h2>Game Results</h2>

			<p>Voted out: {isTie ? 'Tie' : (votedOut?.name ?? 'Nobody')}</p>

			<h3>Winner: {crewWon ? 'Crew' : 'Imposters'}</h3>

			<p>Secret word: {secretWord}</p>

			<p>
				Imposter{imposters.length === 1 ? '' : 's'}:{' '}
				{imposters.map((player) => player.name).join(', ') || 'None'}
			</p>

			<h3>Vote Counts</h3>

			<ul>
				{players.map((player) => (
					<li key={player.id}>
						{player.name}: {counts[player.id] ?? 0} vote(s)
					</li>
				))}
			</ul>

			<button onClick={onPlayAgain}>Play again</button>
		</div>
	);
};

export default Result;
