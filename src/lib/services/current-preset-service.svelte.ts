import type { SynthConfig } from '$lib/types/synth-preset';
import { SynthPreset } from '$lib/types/synth-preset';

export class CurrentPresetService {
	private static instance: CurrentPresetService;
	private static readonly STORAGE_KEY = 'current-preset-id';

	#currentPreset = $state<SynthConfig>(this.getStoredPreset());

	private constructor() {}

	public static getInstance(): CurrentPresetService {
		if (!CurrentPresetService.instance) {
			CurrentPresetService.instance = new CurrentPresetService();
		}
		return CurrentPresetService.instance;
	}

	public get currentPreset(): SynthConfig {
		return this.#currentPreset;
	}

	public setPreset(presetId: string): void {
		const preset = SynthPreset.asList.find((p) => p.id === presetId);
		if (preset) {
			this.#currentPreset = preset;
			this.savePresetToStorage(preset);
		}
	}

	private getStoredPreset(): SynthConfig {
		try {
			const stored = localStorage.getItem(CurrentPresetService.STORAGE_KEY);
			if (stored) {
				const preset = SynthPreset.asList.find((p) => p.id === stored);
				if (preset) {
					return preset;
				}
			}
		} catch (error) {
			console.warn('Failed to read preset from localStorage:', error);
		}
		return SynthPreset.default;
	}

	private savePresetToStorage(preset: SynthConfig): void {
		try {
			localStorage.setItem(CurrentPresetService.STORAGE_KEY, preset.id);
		} catch (error) {
			console.warn('Failed to save preset to localStorage:', error);
		}
	}
}
