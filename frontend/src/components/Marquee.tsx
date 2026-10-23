const PHRASES = ['ONE PHONE', 'ZERO SETUP', 'MAXIMUM CHAOS', 'NO SIGNUP', 'PASS & PLAY'];
const ITEMS = [...PHRASES, ...PHRASES]; // each copy must be wider than the screen

function Group({ hidden = false }: { hidden?: boolean }) {
	return (
		<ul
			aria-hidden={hidden || undefined}
			className={`flex shrink-0 items-center motion-reduce:flex-wrap motion-reduce:justify-center ${
				hidden ? 'motion-reduce:hidden' : ''
			}`}
		>
			{ITEMS.map((text, i) => (
				<li
					key={i}
					className={`flex items-center ${i >= PHRASES.length ? 'motion-reduce:hidden' : ''}`}
				>
					<span className="px-4">{text}</span>
					<span aria-hidden="true" className="text-tomato">
						✦
					</span>
				</li>
			))}
		</ul>
	);
}

function Marquee() {
	return (
		<div className="group overflow-hidden border-y-2 border-ink bg-mustard py-3 font-heading text-sm font-bold tracking-[0.12em] sm:text-base">
			<div className="flex w-max animate-marquee will-change-transform group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none">
				<Group />
				<Group hidden />
			</div>
		</div>
	);
}

export default Marquee;
