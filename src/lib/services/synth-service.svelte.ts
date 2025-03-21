import { SynthEffect, SynthPreset } from '$lib/types/synth-preset';
import { getContext, setContext } from 'svelte';
import * as Tone from 'tone';
import type { CurrentPresetService } from './current-preset-service.svelte';

export class SynthService {
	private static readonly key = {};

	public static initializeContext({
		currentPresetService
	}: {
		currentPresetService: CurrentPresetService;
	}): SynthService {
		return setContext(this.key, new SynthService(currentPresetService));
	}

	public static getContext() {
		return getContext(this.key) as SynthService;
	}

	private constructor(private currentPresetService: CurrentPresetService) {}

	private melodyInputChannel?: Tone.Channel;
	private droneInputChannel?: Tone.Channel;

	#melodyReverb?: Tone.Freeverb;
	public get melodyReverb() {
		return this.#melodyReverb;
	}
	#melodyChorus?: Tone.Chorus;
	public get melodyChorus() {
		return this.#melodyChorus;
	}
	#droneReverb?: Tone.Freeverb;
	public get droneReverb() {
		return this.#droneReverb;
	}
	#droneChorus?: Tone.Chorus;
	public get droneChorus() {
		return this.#droneChorus;
	}

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

		this.#melodyReverb = new Tone.Freeverb(SynthEffect.reverb.config);
		this.#melodyChorus = new Tone.Chorus(SynthEffect.chorus.config);
		this.#droneReverb = new Tone.Freeverb(SynthEffect.reverb.config);
		this.#droneChorus = new Tone.Chorus(SynthEffect.chorus.config);

		this.melodyInputChannel.chain(
			this.#melodyChorus,
			this.#melodyReverb,
			compressor,
			masterChannel
		);
		this.droneInputChannel.chain(this.#droneChorus, this.#droneReverb, compressor, masterChannel);
	}

	private droneSynth?: Tone.MonoSynth;
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

		this.initializeMasterChannel();

		this.setDroneSynth();
		this.setMelodySynth(this.currentPresetService.currentPreset.id);

		console.log('SynthService initialized');
		this.#isInitialized = true;
	}

	private setDroneSynth() {
		// Connect drone synth through the effects chain
		this.droneSynth = new Tone.MonoSynth({
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

		this.droneSynth?.triggerRelease();
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

	public configureMelodySynth = (options: Partial<Tone.SynthOptions>) => {
		if (!this.melodySynth) return;

		const nextOptions = this.calculateNextSynthOptions(this.melodySynth.get(), options);

		this.melodySynth.set(nextOptions);
	};

	public configureDroneSynth = (options: Partial<Tone.SynthOptions>) => {
		if (!this.droneSynth) return;

		const nextOptions = this.calculateNextSynthOptions(this.droneSynth.get(), options);

		this.droneSynth.set(nextOptions);
	};

	private calculateNextSynthOptions = (
		currentOptions: Tone.SynthOptions,
		nextOptions: Partial<Tone.SynthOptions>
	) => {
		let options = {
			...currentOptions,
			portamento: nextOptions.portamento
		};

		options.envelope = {
			...currentOptions.envelope,
			...nextOptions.envelope
		};
		options.oscillator = {
			...currentOptions.oscillator,
			...nextOptions.oscillator
		};

		return options;
	};

	public configureMelodyReverb = (options: Partial<Tone.FreeverbOptions>) => {
		if (!this.#melodyReverb) return;

		const nextOptions = this.calculateNextReverbOptions(this.#melodyReverb.get(), options);

		this.#melodyReverb.set(nextOptions);
	};

	public configureMelodyChorus = (options: Partial<Tone.ChorusOptions>) => {
		if (!this.#melodyChorus) return;

		const nextOptions = this.calculateNextChorusOptions(this.#melodyChorus.get(), options);

		this.#melodyChorus.set(nextOptions);
	};

	public configureDroneReverb = (options: Partial<Tone.FreeverbOptions>) => {
		if (!this.#droneReverb) return;

		const nextOptions = this.calculateNextReverbOptions(this.#droneReverb.get(), options);

		this.#droneReverb.set(nextOptions);
	};

	public configureDroneChorus = (options: Partial<Tone.ChorusOptions>) => {
		if (!this.#droneChorus) return;

		const nextOptions = this.calculateNextChorusOptions(this.#droneChorus.get(), options);

		this.#droneChorus.set(nextOptions);
	};

	private calculateNextReverbOptions = (
		currentOptions: Tone.FreeverbOptions,
		nextOptions: Partial<Tone.FreeverbOptions>
	) => {
		let options = {
			...currentOptions,
			...nextOptions
		};

		return options;
	};

	private calculateNextChorusOptions = (
		currentOptions: Tone.ChorusOptions,
		nextOptions: Partial<Tone.ChorusOptions>
	) => {
		let options = {
			...currentOptions,
			...nextOptions
		};

		return options;
	};
}
