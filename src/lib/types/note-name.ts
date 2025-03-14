export class NoteName {
	public static readonly c = new NoteName('C', 0, 5);
	public static readonly cSharpDb = new NoteName('C#/Db', 1, 6);
	public static readonly d = new NoteName('D', 2, 7);
	public static readonly dSharpEb = new NoteName('D#/Eb', 3, 8);
	public static readonly e = new NoteName('E', 4, 9);
	public static readonly f = new NoteName('F', 5, 10);
	public static readonly fSharpGb = new NoteName('F#/Gb', 6, 11);
	public static readonly g = new NoteName('G', 7, 0);
	public static readonly gSharpAb = new NoteName('G#/Ab', 8, 1);
	public static readonly a = new NoteName('A', 9, 2);
	public static readonly aSharpBb = new NoteName('A#/Bb', 10, 3);
	public static readonly b = new NoteName('B', 11, 4);

	constructor(
		public name: string,
		public distance: number,
		public distanceFromG: number
	) {}

	public static readonly asToneList: NoteName[] = [
		this.c,
		this.cSharpDb,
		this.d,
		this.dSharpEb,
		this.e,
		this.f,
		this.fSharpGb,
		this.g,
		this.gSharpAb,
		this.a,
		this.aSharpBb,
		this.b
	];

	public static readonly asCOFList: NoteName[] = [
		this.c,
		this.g,
		this.d,
		this.a,
		this.e,
		this.b,
		this.fSharpGb,
		this.cSharpDb,
		this.gSharpAb,
		this.dSharpEb,
		this.aSharpBb,
		this.f
	];

	public static readonly asGRootList: NoteName[] = [
		this.g,
		this.gSharpAb,
		this.a,
		this.aSharpBb,
		this.b,
		this.c,
		this.cSharpDb,
		this.d,
		this.dSharpEb,
		this.e,
		this.f,
		this.fSharpGb
	];
}
