import { Link } from 'react-router-dom';
import Card from './Card';
import { games, type Game } from '../data/games';

function LiveGameCard({ game }: { game: Game }) {
	if (!game.path) return null;

	return (
		<Link
			to={game.path}
			aria-label={`${game.name}, ${game.players}. Play now.`}
			className="group flex min-h-72 flex-col rounded-xl border-[3px] border-ink bg-surface p-6 shadow-[4px_4px_0_0_#141414] transition-[transform,box-shadow] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[6px_6px_0_0_#141414] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-4"
		>
			<div className="flex items-start justify-between gap-3">
				<span className="rounded-lg border-2 border-ink bg-green px-2.5 py-1 font-heading text-xs font-bold tracking-wide">LIVE</span>
				<span className="rounded-lg border-2 border-ink bg-bg px-2.5 py-1 text-xs font-semibold">{game.players}</span>
			</div>
			<div className="flex flex-1 flex-col justify-center py-6">
				<h3 className="font-heading text-2xl leading-tight font-bold tracking-tight sm:text-3xl">{game.name}</h3>
				<p className="mt-3 max-w-sm leading-relaxed text-ink/75">{game.tagline}</p>
			</div>
			<span aria-hidden="true" className="inline-flex h-12 min-h-12 w-fit items-center justify-center rounded-lg border-2 border-ink bg-tomato px-5 font-heading font-bold shadow-[3px_3px_0_0_#141414] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[5px_5px_0_0_#141414]">
				Play <span className="ml-2">↗</span>
			</span>
		</Link>
	);
}

function ComingSoonCard({ game }: { game: Game }) {
	return (
		<Card aria-disabled="true" shadow={false} className="flex min-h-72 flex-col border-dashed bg-[#E9E5DB] p-6 opacity-80">
			<div className="flex items-start justify-between gap-3">
				<span className="rounded-lg border-2 border-ink/60 px-2.5 py-1 font-heading text-xs font-bold tracking-wide text-ink/70">COMING SOON</span>
				<span className="rounded-lg border-2 border-ink/50 px-2.5 py-1 text-xs font-semibold text-ink/70">{game.players}</span>
			</div>
			<div className="flex flex-1 flex-col justify-center py-6">
				<h3 className="font-heading text-2xl leading-tight font-bold tracking-tight text-ink/75 sm:text-3xl">{game.name}</h3>
				<p className="mt-3 max-w-sm leading-relaxed text-ink/60">{game.tagline}</p>
			</div>
		</Card>
	);
}

function GamesSection() {
	return (
		<section id="games" className="scroll-mt-6 bg-bg px-5 py-16 sm:px-8 sm:py-20">
			<div className="mx-auto max-w-7xl">
				<div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="mb-2 font-heading text-sm font-bold uppercase tracking-[0.16em] text-tomato">Find your next favorite</p>
						<h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">Games for the group</h2>
					</div>
					<p className="max-w-md leading-relaxed text-ink/75">Choose from quick group games, all ready to play on one phone. New ways to play are on the way.</p>
				</div>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{games.map((game) => (
						game.status === 'live' ? (
							<LiveGameCard key={game.name} game={game} />
						) : (
							<ComingSoonCard key={game.name} game={game} />
						)
					))}
				</div>
			</div>
		</section>
	);
}

export default GamesSection;
