import { browser } from '$app/environment';
import { Octave } from '$lib/types/octave';

export class CurrentOctaveService {
	private static instance: CurrentOctaveService;
	private static readonly STORAGE_KEY = 'current-octave-id';

	#currentOctave = $state<Octave>(this.getStoredOctave());

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
			this.saveOctaveToStorage(octave);
		}
	}

	private getStoredOctave(): Octave {
		if (!browser) return Octave.four;
		try {
			const stored = localStorage.getItem(CurrentOctaveService.STORAGE_KEY);
			const octave = Octave.asList.find((o) => o.id === stored);
			if (octave) {
				return octave;
			}
		} catch (error) {
			console.warn('Failed to read octave from localStorage:', error);
		}
		return Octave.four;
	}

	private saveOctaveToStorage(octave: Octave): void {
		if (!browser) return;
		try {
			localStorage.setItem(CurrentOctaveService.STORAGE_KEY, octave.id);
		} catch (error) {
			console.warn('Failed to save octave to localStorage:', error);
		}
	}
}
