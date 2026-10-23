function Marquee() {
	const message = 'ONE PHONE ✦ ZERO SETUP ✦ MAXIMUM CHAOS ✦ ';

	return (
		<div className="overflow-hidden border-y-2 border-ink bg-mustard py-3">
			<div className="flex w-max animate-marquee motion-reduce:animate-none font-heading text-sm font-bold tracking-[0.12em] sm:text-base">
				<span className="shrink-0 pr-8">{message}</span>
				<span aria-hidden="true" className="shrink-0 pr-8">{message}</span>
			</div>
		</div>
	);
}

export default Marquee;
