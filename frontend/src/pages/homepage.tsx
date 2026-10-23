import { Link } from 'react-router-dom';
import { games } from '../data/games';
import Footer from '../components/Footer';
import GamesSection from '../components/GamesSection';
import HowItWorks from '../components/HowItWorks';
import Marquee from '../components/Marquee';

const liveGame = games.find((game) => game.status === 'live' && game.path);

const linkButtonClasses =
	'inline-flex h-12 min-h-12 items-center justify-center rounded-lg border-2 border-ink px-5 font-heading text-base font-bold shadow-[4px_4px_0_0_#141414] transition-[transform,box-shadow] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[6px_6px_0_0_#141414] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-2';

function Navbar() {
	return (
		<header className="h-16 shrink-0 border-b-2 border-ink bg-bg">
			<nav
				aria-label="Main navigation"
				className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-8"
			>
				<a
					href="#top"
					className="flex items-center gap-2.5 rounded-lg focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-2"
				>
					<span className="grid size-10 w-20 place-items-center rounded-lg border-2 border-ink bg-mustard font-heading text-xl font-bold shadow-[3px_3px_0_0_#141414]">
						G&P
					</span>
					<span className="font-heading text-lg font-bold tracking-tight sm:text-xl">
						Gather <span className="text-tomato">&amp;</span> Play
					</span>
				</a>

				<div className="hidden items-center gap-8 md:flex">
					<a
						className="font-semibold hover:underline focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-4"
						href="#games"
					>
						Games
					</a>
					<a
						className="font-semibold hover:underline focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-4"
						href="#how-it-works"
					>
						How it works
					</a>
				</div>

				{liveGame?.path ? (
					<Link
						className={`${linkButtonClasses} bg-tomato px-4 text-sm sm:px-5 sm:text-base`}
						to={liveGame.path}
					>
						Play now
					</Link>
				) : (
					<a
						className={`${linkButtonClasses} bg-tomato px-4 text-sm sm:px-5 sm:text-base`}
						href="#games"
					>
						Play now
					</a>
				)}
			</nav>
		</header>
	);
}

function HeroCards() {
	return (
		<div
			aria-hidden="true"
			className="relative mx-auto hidden h-[28rem] w-full max-w-[27rem] lg:block [@media(max-height:699px)]:hidden"
		>
			<div className="absolute left-3 top-7 z-10 grid h-40 w-72 -rotate-6 place-items-center rounded-xl border-[3px] border-ink bg-tomato shadow-[8px_8px_0_0_#141414]">
				<span className="font-heading text-4xl font-bold tracking-tight">IMPOSTER</span>
			</div>
			<div className="absolute right-1 top-28 z-20 grid size-36 rotate-6 place-items-center rounded-xl border-[3px] border-ink bg-mustard shadow-[6px_6px_0_0_#141414]">
				<span className="font-heading text-8xl font-bold leading-none">?</span>
			</div>
			<div className="absolute bottom-8 left-5 z-30 flex h-44 w-72 -rotate-3 flex-col justify-between rounded-xl border-[3px] border-ink bg-surface p-5 shadow-[8px_8px_0_0_#141414]">
				<span className="font-heading text-xs font-bold uppercase tracking-[0.2em]">
					Your secret word
				</span>
				<span className="font-heading text-4xl font-bold tracking-tight">PINEAPPLE</span>
				<span className="w-fit rounded-md border-2 border-ink bg-green px-2 py-1 font-heading text-xs font-bold">
					KEEP IT SECRET
				</span>
			</div>
		</div>
	);
}

function Homepage() {
	return (
		<>
			<div id="top" className="flex min-h-dvh flex-col bg-bg">
				<Navbar />
				<main className="flex flex-1 items-center">
					<section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center px-5 py-7 sm:px-8 sm:py-10 lg:grid-cols-[1fr_0.9fr] lg:gap-10 lg:px-10 lg:py-8">
						<div className="flex flex-col items-start gap-4 sm:gap-6">
							<p className="rounded-lg border-2 border-ink bg-mustard px-3 py-2 font-heading text-xs font-bold shadow-[3px_3px_0_0_#141414] sm:text-sm">
								1 phone <span aria-hidden="true">·</span> No signup{' '}
								<span aria-hidden="true">·</span> Free
							</p>
							<h1 className="max-w-3xl font-heading text-5xl leading-[0.95] font-bold tracking-[-0.06em] sm:text-6xl lg:text-8xl max-[380px]:text-[2.7rem]">
								Pass the phone.
								<br />
								Spot the liar.
							</h1>
							<p className="max-w-xl text-base leading-relaxed sm:text-lg">
								A collection of quick party games for the people in the room. Pick
								one, pass the phone, and let the friendly suspicion begin.
							</p>
							<div className="flex flex-wrap gap-3 sm:gap-4">
								{liveGame?.path ? (
									<Link
										className={`${linkButtonClasses} bg-tomato`}
										to={liveGame.path}
									>
										Play Imposter{' '}
										<span aria-hidden="true" className="ml-2">
											↗
										</span>
									</Link>
								) : null}
								<a className={`${linkButtonClasses} bg-surface`} href="#games">
									Explore games{' '}
									<span aria-hidden="true" className="ml-2">
										↓
									</span>
								</a>
							</div>
						</div>
						<HeroCards />
					</section>
				</main>
			</div>
			<Marquee />
			<GamesSection />
			<div aria-hidden="true" className="h-28 shrink-0" />
			<HowItWorks />
			<Footer />
		</>
	);
}

export default Homepage;
