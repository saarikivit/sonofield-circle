import { Octave } from '$lib/types/octave';

export class CurrentOctaveService {
	private static instance: CurrentOctaveService;

	#currentOctave = $state<Octave>(Octave.four);

	private constructor() {}

	public static getInstance(): CurrentOctaveService {
		if (!CurrentOctaveService.instance) {
			CurrentOctaveService.instance = new CurrentOctaveService();
		}
		return CurrentOctaveService.instance;
	}

	public get currentOctave(): Octave {
		return this.#currentOctave;
	}

	public setOctave(octave: Octave): void {
		if (Octave.asList.includes(octave)) {
			this.#currentOctave = octave;
		}
	}
}
