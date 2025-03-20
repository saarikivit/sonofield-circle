import { SynthEffect, SynthPreset } from '$lib/types/synth-preset';
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

	private melodyInputChannel?: Tone.Channel;
	private droneInputChannel?: Tone.Channel;

	private initializeMasterChannel() {
		// Create master compressor to prevent clipping
		const compressor = new Tone.Compressor({
			threshold: -15,
			ratio: 3,
			attack: 0.05,
			release: 0.1
		});

		// Create master channel with moderate gain reduction
		const masterChannel = new Tone.Channel({
			volume: -6,
			pan: 0
		}).toDestination();

		this.melodyInputChannel = new Tone.Channel();
		this.droneInputChannel = new Tone.Channel();

		const reverb = this.reverb;
		const chorus = this.chorus;

		// Connect effects chain: effects -> compressor -> master channel -> destination
		this.melodyInputChannel.chain(reverb, chorus, compressor, masterChannel);
		// Connect drone synth to compressor and master channel
		this.droneInputChannel.chain(compressor, masterChannel);
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

	public async initialize() {
		await Tone.start();

		this.initializeMasterChannel();

		this.setDroneSynth();
		this.setMelodySynth(this.currentPresetService.currentPreset.id);

		this.#isInitialized = true;
	}

	private setDroneSynth() {
		// Connect drone synth through the effects chain
		this.droneSynth = new Tone.PolySynth(Tone.Synth, {
			...SynthPreset.drone.config,
			volume: -12 // Reduce drone volume
		});
		this.droneSynth.connect(this.droneInputChannel!);
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
				volume: -6
			});
		} else {
			this.melodySynth = new Tone.MonoSynth({
				...preset.config,
				volume: -6
			});
		}

		// Connect through filter then to effects for parallel processing
		this.melodySynth.connect(this.melodyInputChannel!);
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
			// Properly release the voice for this note
			this.melodySynth.triggerRelease(note);
		} else if (this.melodySynth instanceof Tone.MonoSynth) {
			this.melodySynth.triggerRelease();
		}
	}

	public stopAll() {
		this.stopDrone();
		this.stopAllMelodyNotes();
	}

	private stopAllMelodyNotes() {
		if (this.melodySynth instanceof Tone.PolySynth) {
			// Use releaseAll to properly clear all voices
			this.melodySynth.releaseAll();
		} else if (this.melodySynth instanceof Tone.MonoSynth) {
			this.melodySynth.triggerRelease();
		}
	}
}
