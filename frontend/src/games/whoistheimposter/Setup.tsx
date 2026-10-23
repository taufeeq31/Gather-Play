import { useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { WORDS } from './words';

type Props = {
	onStart: (names: string[], imposterCount: number, category: string, discussionSeconds: number) => void;
};

const categories = ['random', ...Object.keys(WORDS)];
const categoryLabels: Record<string, string> = {
	random: 'Random',
	animals: 'Animals',
	food: 'Food',
	places: 'Places',
	things: 'Things',
};
const discussionOptions = [2, 3, 5];
const playerColors = ['bg-mustard', 'bg-tomato', 'bg-green'];

function Setup({ onStart }: Props) {
	const [names, setNames] = useState<string[]>([]);
	const [input, setInput] = useState('');
	const [imposterCount, setImposterCount] = useState(1);
	const [category, setCategory] = useState('random');
	const [discussionMinutes, setDiscussionMinutes] = useState(3);
	const [duplicateName, setDuplicateName] = useState(false);

	const maxImposters = Math.max(1, Math.floor((names.length - 1) / 2));
	const safeCount = Math.min(imposterCount, maxImposters);
	const canStart = names.length >= 3 && safeCount < names.length / 2;

	const addPlayer = () => {
		const name = input.trim();
		if (!name || names.length >= 12) return;
		if (names.some((existing) => existing.toLocaleLowerCase() === name.toLocaleLowerCase())) {
			setDuplicateName(true);
			return;
		}
		setNames((currentNames) => [...currentNames, name]);
		setInput('');
		setDuplicateName(false);
	};

	const removePlayer = (index: number) => {
		setNames((currentNames) => currentNames.filter((_, i) => i !== index));
	};

	return (
		<div className="pb-28">
			<h1 className="font-heading text-3xl font-bold leading-tight sm:text-4xl">Set up your game</h1>
			<p className="mt-2 text-sm text-ink/75">Add everyone who’s playing on this phone.</p>

			<form
				className="mt-6 flex gap-2"
				onSubmit={(event) => {
					event.preventDefault();
					addPlayer();
				}}
			>
				<label className="sr-only" htmlFor="player-name">Player name</label>
				<input
					id="player-name"
					type="text"
					placeholder="Enter a name"
					maxLength={15}
					value={input}
					onChange={(event) => {
						setInput(event.target.value);
						setDuplicateName(false);
					}}
					className="h-12 min-w-0 flex-1 rounded-lg border-2 border-ink bg-surface px-3 font-medium placeholder:text-ink/50 focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-2"
				/>
				<Button type="submit" variant="secondary" disabled={names.length >= 12}>Add</Button>
			</form>
			{duplicateName && <p role="alert" className="mt-2 text-sm font-bold text-tomato">That name is already in the game.</p>}

			<section className="mt-6" aria-labelledby="players-heading">
				<div className="flex items-center justify-between">
					<h2 id="players-heading" className="font-heading text-lg font-bold">Players {names.length}/12</h2>
				</div>
				{names.length ? (
					<ul className="mt-3 flex flex-wrap gap-2">
						{names.map((name, index) => (
							<li key={`${name}-${index}`} className={`inline-flex max-w-full items-center gap-2 rounded-md border-2 border-ink px-3 py-1.5 font-bold ${playerColors[index % playerColors.length]}`}>
								<span className="max-w-[12rem] truncate">{name}</span>
								<button
									type="button"
									aria-label={`Remove ${name}`}
									onClick={() => removePlayer(index)}
									className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded font-heading text-xl leading-none focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-1"
								>×</button>
							</li>
						))}
					</ul>
				) : <p className="mt-2 text-sm text-ink/65">No players added yet.</p>}
			</section>

			<section className="mt-6" aria-labelledby="imposters-heading">
				<div className="flex items-center justify-between gap-3">
					<div>
						<h2 id="imposters-heading" className="font-heading text-lg font-bold">Imposters</h2>
						<p className="text-sm text-ink/65">Choose how many are hiding.</p>
					</div>
					<div className="flex h-12 items-center rounded-lg border-2 border-ink bg-surface">
						<button type="button" aria-label="Remove one imposter" disabled={safeCount <= 1} onClick={() => setImposterCount(Math.max(1, safeCount - 1))} className="h-full w-11 rounded-l-md text-xl font-bold disabled:opacity-35 focus-visible:outline-3 focus-visible:outline-ink">−</button>
						<span aria-live="polite" className="min-w-8 text-center font-heading text-lg font-bold">{safeCount}</span>
						<button type="button" aria-label="Add one imposter" disabled={safeCount >= maxImposters} onClick={() => setImposterCount(Math.min(maxImposters, safeCount + 1))} className="h-full w-11 rounded-r-md text-xl font-bold disabled:opacity-35 focus-visible:outline-3 focus-visible:outline-ink">+</button>
					</div>
				</div>
			</section>

			<fieldset className="mt-6">
				<legend className="font-heading text-lg font-bold">Category</legend>
				<div className="mt-3 flex flex-wrap gap-2">
					{categories.map((value) => {
						const selected = category === value;
						return <button key={value} type="button" aria-pressed={selected} onClick={() => setCategory(value)} className={`min-h-12 rounded-full border-2 border-ink px-4 font-bold transition-[transform,box-shadow] focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-2 ${selected ? 'bg-mustard shadow-[3px_3px_0_0_#141414] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none' : 'bg-surface'}`}>{categoryLabels[value] ?? value}</button>;
					})}
				</div>
			</fieldset>

			<fieldset className="mt-6">
				<legend className="font-heading text-lg font-bold">Discussion time</legend>
				<div className="mt-3 flex gap-2">
					{discussionOptions.map((minutes) => {
						const selected = discussionMinutes === minutes;
						return <button key={minutes} type="button" aria-pressed={selected} onClick={() => setDiscussionMinutes(minutes)} className={`min-h-12 flex-1 rounded-full border-2 border-ink font-bold focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-2 ${selected ? 'bg-mustard shadow-[3px_3px_0_0_#141414]' : 'bg-surface'}`}>{minutes} min</button>;
					})}
				</div>
			</fieldset>

			<details className="mt-6">
				<summary className="cursor-pointer list-inside rounded-lg focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-2"><Card className="inline-block px-4 py-3 font-heading font-bold">How to play <span aria-hidden="true">＋</span></Card></summary>
				<Card className="mt-3 px-4 py-3 text-sm leading-relaxed" shadow={false}>
					<p>Pass the phone so each player can see their role.</p>
					<p>Talk about the secret word without saying it.</p>
					<p>Vote for the player you think is the imposter.</p>
				</Card>
			</details>

			<div className="fixed inset-x-0 bottom-0 z-10 border-t-2 border-ink bg-bg px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:sticky sm:mt-8 sm:border-0 sm:p-0">
				<div className="mx-auto w-full max-w-md sm:max-w-none">
					<Button type="button" className="w-full" disabled={!canStart} onClick={() => onStart(names, safeCount, category, discussionMinutes * 60)}>Start game</Button>
					<p className="mt-2 min-h-5 text-center text-sm font-medium" aria-live="polite">{!canStart ? (names.length < 3 ? 'Add at least 3 players' : 'Keep at least one player on the crew') : 'Ready when you are'}</p>
				</div>
			</div>
		</div>
	);
}

export default Setup;
