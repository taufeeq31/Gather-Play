function Footer() {
	return (
		<footer className="bg-ink px-5 py-10 text-bg sm:px-8 sm:py-12">
			<div className="mx-auto max-w-7xl">
				<div className="flex flex-col gap-8 border-b border-bg/25 pb-8 sm:flex-row sm:items-center sm:justify-between">
					<a href="#top" className="flex w-fit items-center gap-3 rounded-lg focus-visible:outline-3 focus-visible:outline-bg focus-visible:outline-offset-4">
						<span className="grid size-11 place-items-center rounded-lg border-2 border-bg bg-mustard font-heading text-xl font-bold text-ink shadow-[3px_3px_0_0_#FFFDF8]">G</span>
						<span className="font-heading text-xl font-bold tracking-tight">Gather <span className="text-tomato">&amp;</span> Play</span>
					</a>
					<nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 font-semibold">
						<a className="rounded-sm hover:text-mustard focus-visible:outline-3 focus-visible:outline-bg focus-visible:outline-offset-4" href="#games">Games</a>
						<a className="rounded-sm hover:text-mustard focus-visible:outline-3 focus-visible:outline-bg focus-visible:outline-offset-4" href="#how-it-works">How it works</a>
						<a className="rounded-sm hover:text-mustard focus-visible:outline-3 focus-visible:outline-bg focus-visible:outline-offset-4" href="mailto:?subject=Suggest%20a%20game%20for%20Gather%20%26%20Play">Suggest a game</a>
					</nav>
				</div>
				<div className="flex flex-col gap-2 pt-6 text-sm text-bg/75 sm:flex-row sm:items-center sm:justify-between">
					<p>Made with <span className="text-tomato">♥</span> by Taufiq</p>
					<p>© {new Date().getFullYear()} Gather &amp; Play</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
