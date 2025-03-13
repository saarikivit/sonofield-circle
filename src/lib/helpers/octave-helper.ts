export interface Octave {
	name: string;
	value: number;
	tuning: number;
}

export class OctaveHelper {
	public static readonly OCTAVES: { [key: string]: Octave } = {
		three: {
			name: '3',
			value: 3,
			tuning: -12
		},
		four: {
			name: '4',
			value: 4,
			tuning: 0
		},
		five: {
			name: '5',
			value: 5,
			tuning: 12
		}
	};

	public static readonly asList = [this.OCTAVES.three, this.OCTAVES.four, this.OCTAVES.five];

	public static getOctaveByValue(value: number): Octave {
		return this.asList.find((octave) => octave.value === value)!;
	}
}
