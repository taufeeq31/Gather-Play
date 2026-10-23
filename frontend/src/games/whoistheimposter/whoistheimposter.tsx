import { useState } from 'react';
import type { GameState, Player } from './types';
import Setup from './Setup';
import { getRandomWord } from './words';
import Reveal from './Reveal';
import Discussion from './Discussion';
import Voting from './Voting';
import Result from './Result';
import GameShell from './GameShell';

const INITIAL_GAME_STATE: GameState = {
	phase: 'setup',
	players: [],
	secretWord: '',
	votes: {},
	discussionSeconds: 180,
	category: 'random',
};

const WhoIsTheImposter = () => {
	const [game, setGame] = useState<GameState>(INITIAL_GAME_STATE);

	const handleStart = (names: string[], imposterCount: number, category: string, discussionSeconds: number) => {
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
			discussionSeconds,
			category,
		});
	};

	const handlePlayAgain = () => {
		setGame((previous) => {
			const players = previous.players.map((player) => ({ ...player, isImposter: false }));
			const imposterCount = previous.players.filter((player) => player.isImposter).length;
			const indexes = players.map((_, index) => index);
			for (let index = indexes.length - 1; index > 0; index -= 1) {
				const randomIndex = Math.floor(Math.random() * (index + 1));
				[indexes[index], indexes[randomIndex]] = [indexes[randomIndex], indexes[index]];
			}
			const previousImposterIds = new Set(previous.players.filter((player) => player.isImposter).map((player) => player.id));
			const sameImposters = indexes.slice(0, imposterCount).every((index) => previousImposterIds.has(players[index].id));
			if (imposterCount > 0 && sameImposters && imposterCount < indexes.length) {
				[indexes[imposterCount - 1], indexes[imposterCount]] = [indexes[imposterCount], indexes[imposterCount - 1]];
			}
			indexes.slice(0, imposterCount).forEach((index) => {
				players[index].isImposter = true;
			});

			return {
				...previous,
				phase: 'reveal',
				players,
				secretWord: getRandomWord(previous.category, previous.secretWord),
				votes: {},
			};
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
						players={game.players}
						durationSeconds={game.discussionSeconds}
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
						onPlayAgain={handlePlayAgain}
						onNewGame={() => setGame({ ...INITIAL_GAME_STATE })}
					/>
				);
		}
	};

	return (
		<>
			<title>Who Is the Imposter? Free One-Phone Party Game | Gather &amp; Play</title>
			<meta name="description" content="Play Who Is the Imposter? for free on one phone. Pass it around, keep the secret word hidden, and find the bluffers." />
			<meta property="og:title" content="Who Is the Imposter? Free One-Phone Party Game | Gather &amp; Play" />
			<meta property="og:description" content="A free one-phone party game. Pass the phone, discover your role, and spot the imposters." />
			<meta property="og:type" content="website" />
			<meta property="og:image" content={`${window.location.origin}/imposter-social.svg`} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content="Who Is the Imposter? Free One-Phone Party Game | Gather &amp; Play" />
			<meta name="twitter:description" content="A free one-phone party game. Pass the phone, discover your role, and spot the imposters." />
			<meta name="twitter:image" content={`${window.location.origin}/imposter-social.svg`} />
			<GameShell phase={game.phase}>{renderPhase()}</GameShell>
		</>
	);
};

export default WhoIsTheImposter;
