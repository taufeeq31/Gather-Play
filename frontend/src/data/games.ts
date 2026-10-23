export type Game = {
	name: string;
	tagline: string;
	players: string;
	path?: string;
	status: 'live' | 'soon';
};

export const games: Game[] = [
	{
		name: 'Who Is the Imposter?',
		tagline: 'Everyone gets the secret word—except the imposter. Can you spot who’s bluffing?',
		players: '3–12 players',
		path: '/whoisimposter',
		status: 'live',
	},
	{
		name: 'Find the Mafia',
		tagline: 'Read the room, spot the mafia, and save the town.',
		players: '4–12 players',
		status: 'soon',
	},
	{
		name: 'Word Bomb',
		tagline: 'Find the right words fast as the pressure keeps ticking up.',
		players: '2–8 players',
		status: 'soon',
	},
	{
		name: 'Bluff Club',
		tagline: 'Make your story sound real. Catch the bluff before it catches you.',
		players: '3–10 players',
		status: 'soon',
	},
];
