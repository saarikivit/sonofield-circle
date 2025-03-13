export interface SynthPreset {
	name: string;
	rootIndex: number;
}

export class PresetHelper {
	public static readonly SYNTH_PRESETS: { [key: string]: SynthPreset } = {
		drone: { name: 'Drones', rootIndex: 48 },
		melody: { name: 'Melodies', rootIndex: 60 }
	};
}
