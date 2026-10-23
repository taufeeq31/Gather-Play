import { useState } from 'react';
import { WORDS } from './words';

type Props = {
	onStart: (names: string[], imposterCount: number, category: string) => void;
};

const Setup = ({ onStart }: Props) => {
	const [names, setNames] = useState<string[]>([]);
	const [input, setInput] = useState('');
	const [imposterCount, setImposterCount] = useState(1);

    const maxImposters = Math.max(1, Math.floor((names.length - 1) / 2));
	const safeCount = Math.min(imposterCount, maxImposters);

    const [category, setCategory] = useState('random');

	const addPlayer = () => {
		const name = input.trim();

		if (!name) return;

		setNames((currentNames) => [...currentNames, name]);
		setInput('');
	};

	const removePlayer = (index: number) => {
		setNames((currentNames) => currentNames.filter((_, i) => i !== index));
	};

	const isValid = names.length >= 3 && imposterCount < names.length / 2;

	return (
		<div>
			<h2>Game Setup</h2>

			<form
				onSubmit={(event) => {
					event.preventDefault();
					addPlayer();
				}}
			>
				<input
					type="text"
					placeholder="Enter player name"
					value={input}
					onChange={(event) => setInput(event.target.value)}
				/>

				<button type="submit">Add</button>
			</form>

			<h3>Players ({names.length})</h3>

			<ul>
				{names.map((name, index) => (
					<li key={`${name}-${index}`}>
						{name}{' '}
						<button type="button" onClick={() => removePlayer(index)}>
							Remove
						</button>
					</li>
				))}
			</ul>

			<div>
				<label htmlFor="imposterCount">Number of imposters: </label>

				<select
					id="imposterCount"
					value={safeCount}
					onChange={(event) => setImposterCount(Number(event.target.value))}
				>
					{Array.from(
						{ length: Math.max(1, Math.ceil(names.length / 2) - 1) },
						(_, index) => index + 1
					).map((count) => (
						<option key={count} value={count}>
							{count}
						</option>
					))}
				</select>
			</div>

			<div>
				<label htmlFor="category">Category: </label>
				<select
					id="category"
					value={category}
					onChange={(event) => setCategory(event.target.value)}
				>
					{['random', ...Object.keys(WORDS)].map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>
			</div>

			<button type="button" disabled={!isValid} onClick={() => onStart(names, imposterCount, category)}>
				Start
			</button>

			{!isValid && (
				<p>
					Add at least 3 players. The number of imposters must be less than half the
					number of players.
				</p>
			)}
		</div>
	);
};

export default Setup;
