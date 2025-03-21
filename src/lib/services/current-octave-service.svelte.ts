import { Octave } from '$lib/types/octave';
import { getContext, setContext } from 'svelte';

export class CurrentOctaveService {
	private static readonly STORAGE_KEY = 'current-octave-id';
	private static readonly key = {};

	public static initializeContext(): CurrentOctaveService {
		return setContext(this.key, new CurrentOctaveService());
	}

	public static getContext() {
		return getContext(this.key) as CurrentOctaveService;
	}

	#currentOctave = $state<Octave>(this.getStoredOctave());

	private constructor() {}

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
		try {
			localStorage.setItem(CurrentOctaveService.STORAGE_KEY, octave.id);
		} catch (error) {
			console.warn('Failed to save octave to localStorage:', error);
		}
	}
}
