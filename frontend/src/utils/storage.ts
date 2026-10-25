export function load<T>(key: string, fallback: T): T {
	try {
		const storedValue = sessionStorage.getItem(key);
		return storedValue === null ? fallback : (JSON.parse(storedValue) as T);
	} catch (error) {
		console.error(`Could not load "${key}" from sessionStorage:`, error);
		return fallback;
	}
}
export function save<T>(key: string, value: T): void {
	try {
		sessionStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.error(`Could not save "${key}" to sessionStorage:`, error);
	}
}

export function remove(key: string): void {
	try {
		sessionStorage.removeItem(key);
	} catch (error) {
		console.error(`Could not remove "${key}" from sessionStorage:`, error);
	}
}
