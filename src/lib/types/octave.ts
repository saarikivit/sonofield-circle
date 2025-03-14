export class Octave {
	public static readonly three = new Octave('3', 3, -12);
	public static readonly four = new Octave('4', 4, 0);
	public static readonly five = new Octave('5', 5, 12);

	constructor(
		public readonly name: string,
		public readonly value: number,
		public readonly tuning: number
	) {}

	public static readonly asList = [this.three, this.four, this.five];
}
