import { SynthEffect, SynthFilter, SynthPreset } from '$lib/types/synth-preset';
import * as Tone from 'tone';
import type { CurrentPresetService } from './current-preset-service.svelte';

export class SynthService {
	public static instance: SynthService;

	public static getInstance(currentPresetService: CurrentPresetService): SynthService {
		if (!SynthService.instance) {
			SynthService.instance = new SynthService(currentPresetService);
		}
		return SynthService.instance;
	}

	private constructor(private currentPresetService: CurrentPresetService) {}

	// Master channel components
	private masterChannel?: Tone.Channel;
	private masterCompressor?: Tone.Compressor;
	private masterReverb?: Tone.Freeverb;
	private masterChorus?: Tone.Chorus;

	private initializeMasterChannel() {
		// Create master compressor to prevent clipping
		const compressor = new Tone.Compressor({
			threshold: -15,
			ratio: 3,
			attack: 0.05,
			release: 0.1
		});
		this.masterCompressor = compressor;

		// Create master channel with moderate gain reduction
		const channel = new Tone.Channel({
			volume: -6, // Reduce overall volume to prevent clipping
			pan: 0
		}).toDestination();
		this.masterChannel = channel;

		// Initialize and connect effects
		const reverb = this.reverb;
		const chorus = this.chorus;
		this.masterReverb = reverb;
		this.masterChorus = chorus;

		// Connect effects chain with guaranteed non-null values
		reverb.connect(compressor);
		chorus.connect(compressor);
		compressor.connect(channel);
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

	private get reverb() {
		return new Tone.Freeverb(SynthEffect.reverb.config);
	}

	private get chorus() {
		return new Tone.Chorus(SynthEffect.chorus.config);
	}

	private get melodyFilter() {
		const filter = new Tone.Filter(SynthFilter.melodyFilter.config);
		if (this.masterReverb && this.masterChorus) {
			filter.connect(this.masterReverb);
			filter.connect(this.masterChorus);
		}
		return filter;
	}

	public async initialize() {
		await Tone.start();

		this.initializeMasterChannel();

		// Connect drone synth to master channel
		this.droneSynth = new Tone.PolySynth(Tone.Synth, {
			...SynthPreset.drone.config,
			volume: -12 // Reduce drone volume
		});

		if (this.masterCompressor) {
			this.droneSynth.connect(this.masterCompressor);
		}

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
			this.melodySynth = new Tone.PolySynth(Tone.Synth, {
				...preset.config,
				volume: -6 // Add volume control
			}).connect(this.melodyFilter);
		} else {
			this.melodySynth = new Tone.MonoSynth({
				...preset.config,
				volume: -6 // Add volume control
			}).connect(this.melodyFilter);
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
