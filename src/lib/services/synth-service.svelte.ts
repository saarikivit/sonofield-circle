import * as Tone from 'tone';

interface SynthConfig {
	name: string;
	type: 'poly' | 'mono';
	config: Partial<Tone.SynthOptions>;
}

const SYNTH_PRESETS: Record<string, SynthConfig> = {
	default: {
		name: 'Default',
		type: 'poly',
		config: {
			oscillator: {
				type: 'triangle',
				phase: 0,
				volume: 0,
				mute: false,
				onstop: () => {}
			},
			envelope: {
				attack: 0.1,
				decay: 0.1,
				sustain: 0.8,
				release: 0.8,
				attackCurve: 'linear',
				decayCurve: 'exponential',
				releaseCurve: 'exponential'
			},
			portamento: 0,
			detune: 0,
			volume: 0,
			onsilence: () => {}
		}
	},
	bright: {
		name: 'Bright',
		type: 'poly',
		config: {
			oscillator: {
				type: 'square',
				phase: 0,
				volume: 0,
				mute: false,
				onstop: () => {}
			},
			envelope: {
				attack: 0.05,
				decay: 0.2,
				sustain: 0.6,
				release: 0.4,
				attackCurve: 'linear',
				decayCurve: 'exponential',
				releaseCurve: 'exponential'
			},
			portamento: 0,
			detune: 0,
			volume: 0,
			onsilence: () => {}
		}
	},
	soft: {
		name: 'Soft',
		type: 'poly',
		config: {
			oscillator: {
				type: 'sine',
				phase: 0,
				volume: 0,
				mute: false,
				onstop: () => {}
			},
			envelope: {
				attack: 0.3,
				decay: 0.3,
				sustain: 0.7,
				release: 1.2,
				attackCurve: 'linear',
				decayCurve: 'exponential',
				releaseCurve: 'exponential'
			},
			portamento: 0,
			detune: 0,
			volume: 0,
			onsilence: () => {}
		}
	},
	pluck: {
		name: 'Pluck',
		type: 'poly',
		config: {
			oscillator: {
				type: 'triangle',
				phase: 0,
				volume: 0,
				mute: false,
				onstop: () => {}
			},
			envelope: {
				attack: 0.02,
				decay: 0.15,
				sustain: 0.2,
				release: 0.3,
				attackCurve: 'linear',
				decayCurve: 'exponential',
				releaseCurve: 'exponential'
			},
			portamento: 0,
			detune: 0,
			volume: 0,
			onsilence: () => {}
		}
	},
	lead: {
		name: 'Lead',
		type: 'mono',
		config: {
			oscillator: {
				type: 'sawtooth',
				phase: 0,
				volume: 0,
				mute: false,
				onstop: () => {}
			},
			envelope: {
				attack: 0.05,
				decay: 0.1,
				sustain: 0.9,
				release: 0.4,
				attackCurve: 'linear',
				decayCurve: 'exponential',
				releaseCurve: 'exponential'
			},
			portamento: 0.05,
			detune: 0,
			volume: 0,
			onsilence: () => {}
		}
	}
};

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
	public get isPlaying() {
		return this.#droneKey !== null;
	}

	#currentPreset = $state('default');
	public get currentPreset() {
		return this.#currentPreset;
	}

	public get availablePresets() {
		return Object.entries(SYNTH_PRESETS).map(([id, preset]) => ({
			id,
			name: preset.name
		}));
	}

	public async initialize() {
		console.log('initialize');

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
		this.updateMelodySynth(this.#currentPreset);

		this.#isInitialized = true;
	}

	public updateMelodySynth(presetId: string) {
		const preset = SYNTH_PRESETS[presetId];
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
		console.log('stopDrone', this.#droneKey);
		if (this.#droneKey === null) return;
		this.droneSynth?.triggerRelease(this.#droneKey);
		this.#droneKey = null;
	}

	public stopMelody(midi: number) {
		const note = this.midiToNote(midi);
		this.melodySynth?.triggerRelease(note);
	}
}
