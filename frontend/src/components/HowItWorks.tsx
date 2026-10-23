import Card from './Card';

const steps = [
	{ number: '1', title: 'Add players', detail: 'Put everyone in the room into the game.', color: 'bg-tomato' },
	{ number: '2', title: 'Pass the phone, see your secret', detail: 'Each player gets a private turn to see their role.', color: 'bg-mustard' },
	{ number: '3', title: 'Discuss, vote, reveal', detail: 'Make your case, cast a vote, and find out who fooled you.', color: 'bg-green' },
];

function HowItWorks() {
	return (
		<section id="how-it-works" className="scroll-mt-6 bg-surface px-5 py-16 sm:px-8 sm:py-20">
			<div className="mx-auto max-w-7xl">
				<div className="mb-8 max-w-2xl sm:mb-10">
					<p className="mb-2 font-heading text-sm font-bold uppercase tracking-[0.16em] text-tomato">Easy to start</p>
					<h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">Three steps to chaos</h2>
				</div>
				<div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
					{steps.map((step) => (
						<Card key={step.number} className="flex min-h-64 flex-col p-6 sm:p-7">
							<span className={`grid size-14 place-items-center rounded-lg border-2 border-ink ${step.color} font-heading text-3xl font-bold shadow-[3px_3px_0_0_#141414]`}>
								{step.number}
							</span>
							<h3 className="mt-7 font-heading text-xl leading-snug font-bold sm:text-2xl">{step.title}</h3>
							<p className="mt-2 leading-relaxed text-ink/70">{step.detail}</p>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

export default HowItWorks;
