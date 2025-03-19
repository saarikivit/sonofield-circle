import { SynthPreset } from '$lib/types/synth-preset';
import * as Tone from 'tone';
import type { CurrentPresetService } from './current-preset-service.svelte';

export class SynthService {
	public static instance: SynthService;

	private constructor(private currentPresetService: CurrentPresetService) {}

	public static getInstance(currentPresetService: CurrentPresetService): SynthService {
		if (!SynthService.instance) {
			SynthService.instance = new SynthService(currentPresetService);
		}
		return SynthService.instance;
	}

	private droneSynth?: Tone.PolySynth;
	private melodySynth?: Tone.PolySynth | Tone.MonoSynth;

	#isInitialized = $state(false);
	public get isInitialized() {
		return this.#isInitialized;
	}

	#isPlaying = $state<boolean>(false);
	public get isPlaying() {
		return this.#isPlaying;
	}

	public async initialize() {
		await Tone.start();
		this.droneSynth = new Tone.PolySynth(Tone.Synth, SynthPreset.drone.config).toDestination();
		this.setMelodySynth(this.currentPresetService.currentPreset.id);
		this.#isInitialized = true;
	}

	public setMelodySynth(presetId: string) {
		const preset = SynthPreset.asList.find((p) => p.id === presetId);
		if (!preset) return;

		// If there's an existing synth, dispose of it
		this.melodySynth?.dispose();
		this.currentPresetService.setPreset(presetId);

		// Create new synth with the selected preset
		if (preset.type === 'poly') {
			this.melodySynth = new Tone.PolySynth(Tone.Synth, preset.config).toDestination();
		} else {
			this.melodySynth = new Tone.MonoSynth(preset.config).toDestination();
		}
	}

	private midiToNote(midi: number): string {
		return Tone.Frequency(midi, 'midi').toNote();
	}

	public playDrone(midi: number) {
		if (this.#isPlaying) return;
		this.#isPlaying = true;

		const note = this.midiToNote(midi);
		this.droneSynth?.triggerAttack(note);
	}

	public playMelody(midi: number) {
		const note = this.midiToNote(midi);
		this.melodySynth?.triggerAttack(note);
	}

	public stopDrone() {
		if (!this.#isPlaying) return;
		this.#isPlaying = false;

		this.droneSynth?.releaseAll();
	}

	public stopMelody(midi: number) {
		const note = this.midiToNote(midi);
		if (this.melodySynth instanceof Tone.PolySynth) {
			this.melodySynth?.triggerRelease(note);
		} else if (this.melodySynth instanceof Tone.MonoSynth) {
			this.melodySynth.triggerRelease();
		}
	}

	public stopAll() {
		this.stopDrone();

		if (this.melodySynth instanceof Tone.PolySynth) {
			this.melodySynth.releaseAll();
		} else if (this.melodySynth instanceof Tone.MonoSynth) {
			this.melodySynth.triggerRelease();
		}
	}
}
