import * as Tone from 'tone';

export interface SynthConfig {
	id: string;
	name: string;
	type: 'poly' | 'mono';
	config: Partial<Tone.SynthOptions>;
}

export class SynthPreset {
	public static readonly default: SynthConfig = {
		id: 'default',
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
