import Card from '../../components/Card';

type Props = {
	secondsLeft: number;
	durationSeconds: number;
};

function TimerCard({ secondsLeft, durationSeconds }: Props) {
	const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
	const seconds = String(secondsLeft % 60).padStart(2, '0');
	const progress = durationSeconds > 0 ? Math.max(0, Math.min(100, (secondsLeft / durationSeconds) * 100)) : 0;
	const urgent = secondsLeft <= 10;

	return (
		<Card className={`mt-5 px-5 py-6 text-center ${urgent ? 'timer-card-urgent bg-tomato' : 'bg-mustard'}`}>
			<p className="text-sm font-bold uppercase tracking-widest">Time left</p>
			<p role="timer" aria-live="off" className="mt-2 font-heading text-6xl font-bold tabular-nums sm:text-7xl">{minutes}:{seconds}</p>
			<div className="mt-5 h-3 overflow-hidden rounded-full border-2 border-ink bg-surface" role="progressbar" aria-label="Discussion time remaining" aria-valuemin={0} aria-valuemax={Math.max(durationSeconds, secondsLeft)} aria-valuenow={secondsLeft}>
				<div className="h-full bg-green transition-[width] duration-500" style={{ width: `${progress}%` }} />
			</div>
		</Card>
	);
}

export default TimerCard;
