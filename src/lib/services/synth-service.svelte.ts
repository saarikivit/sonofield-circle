import { SynthPreset } from '$lib/types/synth-preset';
import * as Tone from 'tone';

export class SynthService {
	public static instance: SynthService;

	private constructor() {}

	public static getInstance(): SynthService {
		if (!SynthService.instance) {
			SynthService.instance = new SynthService();
		}
		return SynthService.instance;
	}

	private droneSynth?: Tone.PolySynth;
	private melodySynth?: Tone.PolySynth | Tone.MonoSynth;

	#isInitialized = $state(false);
	public get isInitialized() {
		return this.#isInitialized;
	}

	#droneKey = $state<string | null>(null);
	public readonly isPlaying = $derived(this.#droneKey !== null);

	#currentPreset = $state('default');
	public get currentPreset() {
		return this.#currentPreset;
	}

	public async initialize() {
		await Tone.start();

		// Initialize drone synth with a deep, rich sound
		this.droneSynth = new Tone.PolySynth(Tone.Synth, {
			oscillator: {
				type: 'sine'
			},
			envelope: {
				attack: 2,
				decay: 0.2,
				sustain: 1,
				release: 3
			}
		}).toDestination();

		this.droneSynth.volume.value = -10; // Slightly quieter for background

		// Initialize melody synth with default preset
		this.setMelodySynth(this.#currentPreset);

		this.#isInitialized = true;
	}

	public setMelodySynth(presetId: string) {
		const preset = SynthPreset.asList.find((p) => p.id === presetId);
		if (!preset) return;

		// If there's an existing synth, dispose of it
		this.melodySynth?.dispose();

		// Create new synth with the selected preset
		if (preset.type === 'poly') {
			this.melodySynth = new Tone.PolySynth(Tone.Synth, preset.config).toDestination();
		} else {
			this.melodySynth = new Tone.MonoSynth(preset.config).toDestination();
		}
		this.#currentPreset = presetId;
	}

	private midiToNote(midi: number): string {
		return Tone.Frequency(midi, 'midi').toNote();
	}

	public playDrone(midi: number) {
		if (this.#droneKey !== null) return;
		const note = this.midiToNote(midi);
		this.droneSynth?.triggerAttack(note);
		this.#droneKey = note;
	}

	public playMelody(midi: number) {
		const note = this.midiToNote(midi);
		this.melodySynth?.triggerAttack(note);
	}

	public stopDrone() {
		if (this.#droneKey === null) return;
		this.droneSynth?.triggerRelease(this.#droneKey);
		this.#droneKey = null;
	}

	public stopMelody(midi: number) {
		const note = this.midiToNote(midi);
		this.melodySynth?.triggerRelease(note);
	}

	public stopAll() {
		this.droneSynth?.releaseAll();
		if (this.melodySynth instanceof Tone.PolySynth) {
			this.melodySynth.releaseAll();
		} else if (this.melodySynth instanceof Tone.MonoSynth) {
			this.melodySynth.triggerRelease();
		}
	}
}
