import { useEffect, useState } from 'react';

type Props = {
	durationSeconds: number;
	onDone: () => void;
};

const Discussion = ({ durationSeconds, onDone }: Props) => {
	const [secondsLeft, setSecondsLeft] = useState(durationSeconds);

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			setSecondsLeft((s) => Math.max(0, s - 1));
		}, 1000);

		return () => window.clearInterval(intervalId);
	}, []);

	const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
	const seconds = String(secondsLeft % 60).padStart(2, '0');

	return (
		<div>
			<h2>Discussion</h2>
			<p>
				{minutes}:{seconds}
			</p>

			<button onClick={onDone}>Start voting</button>
		</div>
	);
};

export default Discussion;
