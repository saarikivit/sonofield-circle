export interface NoteDegree {
	name: string;
	compareValue: number;
}

export class DegreeHelper {
	public static readonly NOTE_DEGREES = {
		one: {
			name: '1',
			compareValue: 0
		},
		flatTwo: {
			name: 'b2',
			compareValue: 1
		},
		two: {
			name: '2',
			compareValue: 2
		},
		flatThree: {
			name: 'b3',
			compareValue: 3
		},
		three: {
			name: '3',
			compareValue: 4
		},
		four: {
			name: '4',
			compareValue: 5
		},
		sharpFour: {
			name: '#4',
			compareValue: 6
		},
		five: {
			name: '5',
			compareValue: 7
		},
		flatSix: {
			name: 'b6',
			compareValue: 8
		},
		six: {
			name: '6',
			compareValue: 9
		},
		flatSeven: {
			name: 'b7',
			compareValue: 10
		},
		seven: {
			name: '7',
			compareValue: 11
		}
	};

	public static readonly asCOFList = [
		this.NOTE_DEGREES.one,
		this.NOTE_DEGREES.five,
		this.NOTE_DEGREES.two,
		this.NOTE_DEGREES.six,
		this.NOTE_DEGREES.three,
		this.NOTE_DEGREES.seven,
		this.NOTE_DEGREES.sharpFour,
		this.NOTE_DEGREES.flatTwo,
		this.NOTE_DEGREES.flatSix,
		this.NOTE_DEGREES.flatThree,
		this.NOTE_DEGREES.flatSeven,
		this.NOTE_DEGREES.four
	];

	public static getDegreeIndexCOF(degree: NoteDegree) {
		return this.asCOFList.indexOf(degree);
	}

	public static getDegreeByIndexCOF(index: number) {
		return this.asCOFList[index] as NoteDegree;
	}
}
