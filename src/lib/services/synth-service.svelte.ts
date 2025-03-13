import { Soundfont2Sampler } from 'smplr';
import * as sf2 from 'soundfont2';

export type InstrumentName = 'Drones' | 'Melody';

export class SynthService {
	public static instance: SynthService;

	private constructor() {}

	public static getInstance(): SynthService {
		if (!SynthService.instance) {
			SynthService.instance = new SynthService();
		}
		return SynthService.instance;
	}

	private sampler?: Soundfont2Sampler;

	#isInitialized = $state(false);

	public get isInitialized() {
		return this.#isInitialized;
	}

	public async initialize() {
		const context = new AudioContext();
		this.sampler = new Soundfont2Sampler(context, {
			url: 'https://hso6xk6uo0.ufs.sh/f/ab5FJrlC8mixwkurJ0X2DoeLrQmt3dPUVIzBuY72HbiNxKvJ',
			createSoundfont: (data) => new sf2.SoundFont2(data)
		});
		return this.sampler.load.then(() => {
			this.#isInitialized = true;
		});
	}

	private playMidi(instrument: InstrumentName, midi: number) {
		this.sampler?.loadInstrument(instrument);
		this.sampler?.start(midi);
	}

	private stopMidi(instrument: InstrumentName, midi: number) {
		this.sampler?.loadInstrument(instrument);
		this.sampler?.stop(midi);
	}

	public playDrone(midi: number) {
		this.playMidi('Drones', midi);
	}

	public playMelody(midi: number) {
		this.playMidi('Melody', midi);
	}

	public stopDrone(midi: number) {
		this.stopMidi('Drones', midi);
	}

	public stopMelody(midi: number) {
		this.stopMidi('Melody', midi);
	}
}
