export type MusicalKey = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

export const availableKeys: MusicalKey[] = [
	'C',
	'C#',
	'D',
	'D#',
	'E',
	'F',
	'F#',
	'G',
	'G#',
	'A',
	'A#',
	'B'
];

let key = $state<MusicalKey>('C');

export const currentKey = {
	get key() {
		return key;
	},
	set key(value: MusicalKey) {
		key = value;
	},
	setRandomKey() {
		key = availableKeys[Math.floor(Math.random() * availableKeys.length)];
	}
};
