import { OctaveHelper, type Octave } from '$lib';

export class CurrentOctaveService {
	private static instance: CurrentOctaveService;

	#currentOctave = $state<Octave>(OctaveHelper.OCTAVES.four);

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
		if (OctaveHelper.asList.includes(octave)) {
			this.#currentOctave = octave;
		}
	}
}
