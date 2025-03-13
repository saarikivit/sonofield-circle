import { NoteNameHelper, type NoteName } from '$lib';

export class CurrentKeyService {
	private static instance: CurrentKeyService;

	#currentKey = $state<NoteName>(NoteNameHelper.NOTE_NAMES.c);

	private constructor() {}

	public static getInstance(): CurrentKeyService {
		if (!CurrentKeyService.instance) {
			CurrentKeyService.instance = new CurrentKeyService();
		}
		return CurrentKeyService.instance;
	}

	public get currentKey(): NoteName {
		return this.#currentKey;
	}

	public setKey(key: NoteName): void {
		if (NoteNameHelper.asToneList.includes(key)) {
			this.#currentKey = key;
		}
	}

	public setRandomKey(): void {
		const randomIndex = Math.floor(Math.random() * 12);
		this.#currentKey = NoteNameHelper.asToneList[randomIndex];
	}
}
