export class CurrentOctaveService {
	private static instance: CurrentOctaveService;

	public readonly availableOctaves = [3, 4, 5];

	#currentOctave = $state<number>(4);

	private constructor() {}

	public static getInstance(): CurrentOctaveService {
		if (!CurrentOctaveService.instance) {
			CurrentOctaveService.instance = new CurrentOctaveService();
		}
		return CurrentOctaveService.instance;
	}

	public get currentOctave(): number {
		return this.#currentOctave;
	}

	public setOctave(octave: number): void {
		if (this.availableOctaves.includes(octave)) {
			this.#currentOctave = octave;
		}
	}
}
