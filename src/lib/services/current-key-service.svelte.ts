import { NoteName } from '$lib/types/note-name';

export class CurrentKeyService {
	private static instance: CurrentKeyService;
	private static readonly STORAGE_KEY = 'current-key-id';

	#currentKey = $state<NoteName>(this.getStoredKey());

	private constructor() {}

	public static getInstance(): CurrentKeyService {
		if (!CurrentKeyService.instance) {
			CurrentKeyService.instance = new CurrentKeyService();
		}
		return CurrentKeyService.instance;
	}

	public get currentKey(): NoteName {
		return this.#currentKey;
	}

	public setKey(key: NoteName): void {
		if (NoteName.asToneList.includes(key)) {
			this.#currentKey = key;
			this.saveKeyToStorage(key);
		}
	}

	public setRandomKey(): void {
		const randomIndex = Math.floor(Math.random() * 12);
		const key = NoteName.asToneList[randomIndex];
		this.#currentKey = key;
		this.saveKeyToStorage(key);
	}

	private getStoredKey(): NoteName {
		try {
			const stored = localStorage.getItem(CurrentKeyService.STORAGE_KEY);
			if (stored) {
				const key = NoteName.asToneList.find((k) => k.id === stored);
				if (key) {
					return key;
				}
			}
		} catch (error) {
			console.warn('Failed to read key from localStorage:', error);
		}
		return NoteName.c;
	}

	private saveKeyToStorage(key: NoteName): void {
		try {
			localStorage.setItem(CurrentKeyService.STORAGE_KEY, key.id);
		} catch (error) {
			console.warn('Failed to save key to localStorage:', error);
		}
	}
}
