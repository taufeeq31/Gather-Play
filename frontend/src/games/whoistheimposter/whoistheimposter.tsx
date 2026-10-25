import { useState, useEffect } from 'react';
import type { GameState, Player } from './types';
import Setup from './Setup';
import { getRandomWord } from './words';
import Reveal from './Reveal';
import Discussion from './Discussion';
import Voting from './Voting';
import Result from './Result';
import GameShell from './GameShell';
import { load, save, remove } from '../../utils/storage';

const INITIAL_GAME_STATE: GameState = {
	phase: 'setup',
	players: [],
	secretWord: '',
	votes: {},
	discussionSeconds: 180,
	category: 'random',
};

const STORAGE_KEY = 'gather-play:imposter:game-state';

const WhoIsTheImposter = () => {
	const [game, setGame] = useState<GameState>(() => load(STORAGE_KEY, INITIAL_GAME_STATE));

	useEffect(() => {
		if (game.phase === 'setup') remove(STORAGE_KEY);
		else save(STORAGE_KEY, game);
	}, [game]);

	const makeId = () =>
		typeof crypto !== 'undefined' && 'randomUUID' in crypto
			? crypto.randomUUID()
			: `${Date.now()}-${Math.random().toString(36).slice(2)}`;

	const handleStart = (
		names: string[],
		imposterCount: number,
		category: string,
		discussionSeconds: number
	) => {
		// pick random indexes to be imposters
		const shuffledIndices = names.map((_, index) => index);

		for (let i = shuffledIndices.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));

			[shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
		}

		const imposterIndices = new Set(shuffledIndices.slice(0, imposterCount));

		const players: Player[] = names.map((name, index) => ({
			id: makeId(),

			name,

			isImposter: imposterIndices.has(index),
		}));

		setGame({
			phase: 'reveal',
			players,
			secretWord: getRandomWord(category),
			votes: {},
			discussionSeconds,
			category,
		});
	};

	const shuffle = <T,>(items: T[]): T[] => {
		const copy = [...items];
		for (let i = copy.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[copy[i], copy[j]] = [copy[j], copy[i]];
		}
		return copy;
	};

	const handlePlayAgain = () => {
		const { players, category } = game;
		const count = players.filter((p) => p.isImposter).length;
		const previousIds = new Set(players.filter((p) => p.isImposter).map((p) => p.id));

		let newIds: string[];
		do {
			newIds = shuffle(players)
				.slice(0, count)
				.map((p) => p.id);
		} while (count > 0 && count < players.length && newIds.every((id) => previousIds.has(id)));

		setGame({
			...game,
			phase: 'reveal',
			players: players.map((p) => ({ ...p, isImposter: newIds.includes(p.id) })),
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
			<meta
				name="description"
				content="Play Who Is the Imposter? for free on one phone. Pass it around, keep the secret word hidden, and find the bluffers."
			/>
			<meta
				property="og:title"
				content="Who Is the Imposter? Free One-Phone Party Game | Gather &amp; Play"
			/>
			<meta
				property="og:description"
				content="A free one-phone party game. Pass the phone, discover your role, and spot the imposters."
			/>
			<meta property="og:type" content="website" />
			<meta property="og:image" content={`${window.location.origin}/imposter-social.svg`} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta
				name="twitter:title"
				content="Who Is the Imposter? Free One-Phone Party Game | Gather &amp; Play"
			/>
			<meta
				name="twitter:description"
				content="A free one-phone party game. Pass the phone, discover your role, and spot the imposters."
			/>
			<meta name="twitter:image" content={`${window.location.origin}/imposter-social.svg`} />
			<GameShell phase={game.phase}>{renderPhase()}</GameShell>
		</>
	);
};

export default WhoIsTheImposter;
