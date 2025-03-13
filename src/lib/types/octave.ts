export class Octave {
	public constructor(
		public readonly name: string,
		public readonly value: number,
		public readonly tuning: number
	) {}
}

export const OCTAVES = {
	three: new Octave('3', 3, -12),
	four: new Octave('4', 4, 0),
	five: new Octave('5', 5, 12)
};
