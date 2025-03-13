export type MusicalKey = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

export class CurrentKeyService {
	private static instance: CurrentKeyService;

	public readonly availableKeys: MusicalKey[] = [
		'C',
		'C#',
		'D',
		'D#',
		'E',
		'F',
		'F#',
		'G',
		'G#',
		'A',
		'A#',
		'B'
	];

	#currentKey = $state<MusicalKey>('C');

	private constructor() {}

	public static getInstance(): CurrentKeyService {
		if (!CurrentKeyService.instance) {
			CurrentKeyService.instance = new CurrentKeyService();
		}
		return CurrentKeyService.instance;
	}

	public get currentKey(): MusicalKey {
		return this.#currentKey;
	}

	public setKey(key: MusicalKey): void {
		if (this.availableKeys.includes(key)) {
			this.#currentKey = key;
		}
	}

	public setRandomKey(): void {
		const randomIndex = Math.floor(Math.random() * this.availableKeys.length);
		this.#currentKey = this.availableKeys[randomIndex];
	}
}
