import { Octave, SynthPreset } from '$lib';

export interface NoteName {
	name: string;
	distance: number;
	distanceFromG: number;
}

const _cofMemory: { [key: string]: NoteName[] } = {};
const _toneMemory: { [key: string]: NoteName[] } = {};

export class NoteNameHelper {
	public static readonly NOTE_NAMES: { [key: string]: NoteName } = {
		c: {
			name: 'C',
			distance: 0,
			distanceFromG: 5
		},
		cSharpDb: {
			name: 'C#/Db',
			distance: 1,
			distanceFromG: 6
		},
		d: {
			name: 'D',
			distance: 2,
			distanceFromG: 7
		},
		dSharpEb: {
			name: 'D#/Eb',
			distance: 3,
			distanceFromG: 8
		},
		e: {
			name: 'E',
			distance: 4,
			distanceFromG: 9
		},
		f: {
			name: 'F',
			distance: 5,
			distanceFromG: 10
		},
		fSharpGb: {
			name: 'F#/Gb',
			distance: 6,
			distanceFromG: 11
		},
		g: {
			name: 'G',
			distance: 7,
			distanceFromG: 0
		},
		gSharpAb: {
			name: 'G#/Ab',
			distance: 8,
			distanceFromG: 1
		},
		aSharpBb: {
			name: 'A#/Bb',
			distance: 10,
			distanceFromG: 3
		}
	};

	public static readonly asToneList: NoteName[] = [
		this.NOTE_NAMES.c,
		this.NOTE_NAMES.cSharpDb,
		this.NOTE_NAMES.d,
		this.NOTE_NAMES.dSharpEb,
		this.NOTE_NAMES.e,
		this.NOTE_NAMES.f,
		this.NOTE_NAMES.fSharpGb,
		this.NOTE_NAMES.g,
		this.NOTE_NAMES.gSharpAb,
		this.NOTE_NAMES.a,
		this.NOTE_NAMES.aSharpBb,
		this.NOTE_NAMES.b
	];

	public static readonly asCOFList: NoteName[] = [
		this.NOTE_NAMES.c,
		this.NOTE_NAMES.g,
		this.NOTE_NAMES.d,
		this.NOTE_NAMES.a,
		this.NOTE_NAMES.e,
		this.NOTE_NAMES.b,
		this.NOTE_NAMES.fSharpGb,
		this.NOTE_NAMES.cSharpDb,
		this.NOTE_NAMES.gSharpAb,
		this.NOTE_NAMES.dSharpEb,
		this.NOTE_NAMES.aSharpBb
	];

	public static readonly asGRootList: NoteName[] = [
		this.NOTE_NAMES.g,
		this.NOTE_NAMES.gSharpAb,
		this.NOTE_NAMES.a,
		this.NOTE_NAMES.aSharpBb,
		this.NOTE_NAMES.b,
		this.NOTE_NAMES.c,
		this.NOTE_NAMES.cSharpDb,
		this.NOTE_NAMES.d,
		this.NOTE_NAMES.dSharpEb,
		this.NOTE_NAMES.e,
		this.NOTE_NAMES.f,
		this.NOTE_NAMES.fSharpGb
	];

	public static getTonicRootedCOFList(tonic: NoteName): NoteName[] {
		if (_cofMemory[tonic.name]) {
			return _cofMemory[tonic.name];
		}

		const tonicIndex = this.asCOFList.indexOf(tonic);
		const end = this.asCOFList.slice(0, tonicIndex);
		const start = this.asCOFList.slice(tonicIndex);
		const result = [...start, ...end];

		_cofMemory[tonic.name] = result;
		return result;
	}

	public static getTonicRootedToneList(tonic: NoteName): NoteName[] {
		if (_toneMemory[tonic.name]) {
			return _toneMemory[tonic.name];
		}

		const tonicIndex = this.asToneList.indexOf(tonic);
		const end = this.asToneList.slice(0, tonicIndex);
		const start = this.asToneList.slice(tonicIndex);
		const result = [...start, ...end];

		_toneMemory[tonic.name] = result;
		return result;
	}

	public static keyRelativeToIndexAndTonicGRoot({
		index,
		tonic,
		octave
	}: {
		index: number;
		tonic: NoteName;
		octave: Octave;
	}): number {
		const cofList = this.getTonicRootedCOFList(tonic);
		const note = cofList[index];
		const toneList = this.getTonicRootedToneList(tonic);
		const toneDistance = toneList.indexOf(note);
		const rootDistance = this.asGRootList.indexOf(tonic);
		const octaveRootKey = 55 + rootDistance;
		const degreeKey = octaveRootKey + octave.tuning + toneDistance;
		return degreeKey;
	}

	public static keyRelativeToIndexAndTonic({
		index,
		tonic,
		octave,
		preset
	}: {
		index: number;
		tonic: NoteName;
		octave: Octave;
		preset: SynthPreset;
	}): number {
		const cofList = this.getTonicRootedCOFList(tonic);
		const note = cofList[index];
		return preset.rootIndex + octave.tuning + note.distance;
	}

	public static keyTonicFromOctave({
		tonic,
		octave,
		preset
	}: {
		tonic: NoteName;
		octave: Octave;
		preset: SynthPreset;
	}): number {
		const tonicIndex = this.asToneList.indexOf(tonic);
		return preset.rootIndex + octave.tuning + tonicIndex;
	}
}
