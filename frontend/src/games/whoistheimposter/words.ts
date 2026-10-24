export const WORDS: Record<string, string[]> = {
	animals: [
		'Lion',
		'Elephant',
		'Penguin',
		'Giraffe',
		'Dolphin',
		'Kangaroo',
		'Tiger',
		'Monkey',
		'Camel',
		'Owl',
		'Zebra',
		'Crocodile',
		'Peacock',
		'Bear',
		'Rabbit',
	],
	food: [
		'Pizza',
		'Biryani',
		'Burger',
		'Samosa',
		'Noodles',
		'Ice Cream',
		'Pancake',
		'Sandwich',
		'Chocolate',
		'Popcorn',
		'Pasta',
		'Dosa',
		'Sushi',
		'Donut',
		'Paneer',
	],
	places: [
		'Airport',
		'Hospital',
		'School',
		'Beach',
		'Library',
		'Cinema',
		'Railway Station',
		'Zoo',
		'Temple',
		'Mall',
		'Hotel',
		'Stadium',
		'Farm',
		'Museum',
		'Market',
	],
	things: [
		'Umbrella',
		'Mirror',
		'Pillow',
		'Scissors',
		'Clock',
		'Backpack',
		'Candle',
		'Ladder',
		'Headphones',
		'Key',
		'Bicycle',
		'Toothbrush',
		'Wallet',
		'Fan',
		'Camera',
	],
};

const USED_KEY = 'imposter-used-words';

const loadUsed = (): string[] => {
	try {
		return JSON.parse(sessionStorage.getItem(USED_KEY) ?? '[]');
	} catch {
		return [];
	}
};

const saveUsed = (words: string[]) => {
	try {
		sessionStorage.setItem(USED_KEY, JSON.stringify(words));
	} catch {
		// storage blocked (e.g. private mode), just skip it
	}
};

export const getRandomWord = (category: string): string => {
	const pool =
		category === 'random' || !WORDS[category] ? Object.values(WORDS).flat() : WORDS[category];

	let used = loadUsed();
	let fresh = pool.filter((word) => !used.includes(word));

	// every word in this pool was used: forget them and start over
	if (fresh.length === 0) {
		used = used.filter((word) => !pool.includes(word));
		fresh = pool;
	}

	const word = fresh[Math.floor(Math.random() * fresh.length)];
	saveUsed([...used, word]);
	return word;
};
