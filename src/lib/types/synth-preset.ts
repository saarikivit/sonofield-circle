export class SynthPreset {
	public static readonly drone: SynthPreset = new SynthPreset('Drones', 48);
	public static readonly melody: SynthPreset = new SynthPreset('Melodies', 60);

	public constructor(
		public readonly name: string,
		public readonly rootIndex: number
	) {}
}
