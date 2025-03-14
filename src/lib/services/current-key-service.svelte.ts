import { NoteName } from '$lib/types/note-name';

export class CurrentKeyService {
	private static instance: CurrentKeyService;

	#currentKey = $state<NoteName>(NoteName.c);

	private constructor() {}

	public static getInstance(): CurrentKeyService {
		if (!CurrentKeyService.instance) {
			CurrentKeyService.instance = new CurrentKeyService();
		}
		return CurrentKeyService.instance;
	}

	public get currentKey(): NoteName {
		return $state.snapshot(this.#currentKey);
	}

	public setKey(key: NoteName): void {
		if (NoteName.asToneList.includes(key)) {
			this.#currentKey = key;
		}
	}

	public setRandomKey(): void {
		const randomIndex = Math.floor(Math.random() * 12);
		this.#currentKey = NoteName.asToneList[randomIndex];
	}
}
