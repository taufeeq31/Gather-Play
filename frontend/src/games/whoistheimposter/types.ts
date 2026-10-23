export type Phase = 'setup' | 'reveal' | 'discussion' | 'voting' | 'result';

export type Player = {
	id: string;
	name: string;
	isImposter: boolean;
};

export type GameState = {
	phase: Phase;
	players: Player[];
	secretWord: string;
	votes: Record<string, string>;
};
