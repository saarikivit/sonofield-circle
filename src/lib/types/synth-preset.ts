import * as Tone from 'tone';

export interface SynthConfig {
	id: string;
	name: string;
	type: 'poly' | 'mono';
	config: Partial<Tone.SynthOptions>;
}

export interface SynthFilterConfig {
	id: string;
	name: string;
	config: Partial<Tone.FilterOptions>;
}

export interface ChorusConfig {
	id: string;
	name: string;
	config: Partial<Tone.ChorusOptions>;
}

export interface ReverbConfig {
	id: string;
	name: string;
	config: any;
}

export interface FilterEnvelopeConfig {
	id: string;
	name: string;
	config: Partial<Tone.FrequencyEnvelopeOptions>;
}

export class SynthEffect {
	public static readonly reverb: ReverbConfig = {
		id: 'reverb',
		name: 'Reverb',
		config: {
			decay: 3,
			preDelay: 0.1,
			wet: 0.5
		}
	};

	public static readonly chorus: ChorusConfig = {
		id: 'chorus',
		name: 'Chorus',
		config: {
			depth: 0.5,
			feedback: 0.5,
			delayTime: 0.1,
			wet: 0.5,
			type: 'sine',
			spread: 180,
			frequency: 0
		}
	};
}

export class SynthFilter {
	public static readonly melodyFilter: SynthFilterConfig = {
		id: 'melody',
		name: 'Melody',
		config: {
			type: 'highpass',
			frequency: 1500,
			Q: 1,
			rolloff: -24
		}
	};

	public static readonly droneFilter: SynthFilterConfig = {
		id: 'drone',
		name: 'Drone',
		config: {
			type: 'lowpass',
			frequency: 1500,
			Q: 1,
			rolloff: -24
		}
	};

	public static readonly melodyFilterEnvelope: FilterEnvelopeConfig = {
		id: 'melody',
		name: 'Melody',
		config: {
			attack: 0.01,
			decay: 0.1,
			sustain: 0.5,
			release: 0.1,
			baseFrequency: 1500,
			octaves: 4,
			exponent: 2
		}
	};

	public static readonly droneFilterEnvelope: FilterEnvelopeConfig = {
		id: 'drone',
		name: 'Drone',
		config: {
			attack: 0.01,
			decay: 0.1,
			sustain: 0.5,
			release: 0.1,
			baseFrequency: 1500,
			octaves: 4,
			exponent: 2
		}
	};
}

export class SynthPreset {
	public static readonly drone: SynthConfig = {
		id: 'drone',
		name: 'Drone',
		type: 'mono',
		config: {
			oscillator: {
				type: 'sine',
				phase: 0,
				volume: 0,
				mute: false,
				onstop: () => {}
			},
			envelope: {
				attack: 2,
				decay: 0.2,
				sustain: 1,
				release: 3,
				attackCurve: 'linear',
				decayCurve: 'exponential',
				releaseCurve: 'exponential'
			}
		}
	};

	public static readonly default: SynthConfig = {
		id: 'default',
		name: 'Default',
		type: 'poly',
		config: {
			oscillator: {
				type: 'sine',
				phase: 0,
				volume: 0,
				mute: false,
				partialCount: 1,
				onstop: () => {}
			},
			envelope: {
				attack: 0.01,
				decay: 0.1,
				sustain: 0.5,
				release: 0.1,
				attackCurve: 'linear',
				decayCurve: 'exponential',
				releaseCurve: 'exponential'
			},
			portamento: 0,
			detune: 0,
			volume: 0,
			onsilence: () => {}
		}
	};

	public static readonly bright: SynthConfig = {
		id: 'bright',
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
	};

	public static readonly soft: SynthConfig = {
		id: 'soft',
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
	};

	public static readonly pluck: SynthConfig = {
		id: 'pluck',
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
	};

	public static readonly lead: SynthConfig = {
		id: 'lead',
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
	};

	public static readonly asList = [
		this.default,
		this.bright,
		this.soft,
		this.pluck,
		this.lead
	] as const;
}
