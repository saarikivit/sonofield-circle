export class SynthPreset {
	public static readonly drone = new SynthPreset('Drones', 48);
	public static readonly melody = new SynthPreset('Melodies', 60);

	constructor(
		public readonly name: string,
		public readonly rootIndex: number
	) {}
}
