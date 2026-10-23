import { useState } from 'react';
import type { GameState, Player } from './types';
import Setup from './Setup';
import { getRandomWord } from './words';
import Reveal from './Reveal';
import Discussion from './Discussion';
import Voting from './Voting';
import Result from './Result';
import { Link } from 'react-router-dom';

const INITIAL_GAME_STATE: GameState = {
	phase: 'setup',
	players: [],
	secretWord: '',
	votes: {},
};

const WhoIsTheImposter = () => {
	const [game, setGame] = useState<GameState>(INITIAL_GAME_STATE);

	const handleStart = (names: string[], imposterCount: number, category: string) => {
		const players: Player[] = names.map((name) => ({
			id: crypto.randomUUID(),
			name,
			isImposter: false,
		}));

		// pick random indexes to be imposters
		const indexes = players.map((_, i) => i).sort(() => Math.random() - 0.5);
		indexes.slice(0, imposterCount).forEach((i) => {
			players[i].isImposter = true;
		});

		setGame({
			phase: 'reveal',
			players,
			secretWord: getRandomWord(category),
			votes: {},
		});
	};

	const renderPhase = () => {
		switch (game.phase) {
			case 'setup':
				return <Setup onStart={handleStart} />;

			case 'reveal':
				return (
					<Reveal
						players={game.players}
						secretWord={game.secretWord}
						onDone={() =>
							setGame((prev) => ({
								...prev,
								phase: 'discussion',
							}))
						}
					/>
				);

			case 'discussion':
				return (
					<Discussion
						durationSeconds={180}
						onDone={() =>
							setGame((prev) => ({
								...prev,
								phase: 'voting',
							}))
						}
					/>
				);

			case 'voting':
				return (
					<Voting
						players={game.players}
						onDone={(votes) =>
							setGame((prev) => ({
								...prev,
								votes,
								phase: 'result',
							}))
						}
					/>
				);

			case 'result':
				return (
					<Result
						players={game.players}
						votes={game.votes}
						secretWord={game.secretWord}
						onPlayAgain={() => setGame({ ...INITIAL_GAME_STATE })}
					/>
				);
		}
	};

	return (
		<div>
			<Link to="/">Home</Link>
			<h1>Who Is the Imposter?</h1>

			{renderPhase()}
		</div>
	);
};

export default WhoIsTheImposter;
