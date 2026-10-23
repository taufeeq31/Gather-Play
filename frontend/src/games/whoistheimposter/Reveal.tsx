import { useState } from 'react';
import type { Player } from './types';

type Props = {
	players: Player[];
	secretWord: string;
	onDone: () => void;
};

const Reveal = ({ players, secretWord, onDone }: Props) => {
	const [index, setIndex] = useState(0);
	const [showing, setShowing] = useState(false);

	const player = players[index];

	if (!player) return null;

	const handleHideAndPass = () => {
		setShowing(false);

		if (index === players.length - 1) {
			onDone();
		} else {
			setIndex((currentIndex) => currentIndex + 1);
		}
	};

	return (
		<div>
			{!showing ? (
				<>
					<h2>Pass the phone to {player.name}</h2>

					<button onClick={() => setShowing(true)}>Tap to reveal</button>
				</>
			) : (
				<>
					<h2>{player.isImposter ? 'IMPOSTER' : secretWord}</h2>

					<button onClick={handleHideAndPass}>Hide &amp; pass</button>
				</>
			)}
		</div>
	);
};

export default Reveal;
