export class MidiService {
	private static instance: MidiService;

	#hasAccess: boolean | null = $state(null);
	public get hasAccess(): boolean | null {
		return this.#hasAccess;
	}

	#devices: MIDIInput[] = $state([]);
	public get devices(): MIDIInput[] {
		return this.#devices;
	}

	private constructor() {}

	public static getInstance(): MidiService {
		if (!MidiService.instance) {
			MidiService.instance = new MidiService();
		}
		return MidiService.instance;
	}

	public requestAccess(onKeyDown: (key: number) => void, onKeyUp: (key: number) => void) {
		if (navigator.requestMIDIAccess) {
			navigator
				.requestMIDIAccess(/* {
					test
					sysex: true,
					software: true
				} */)
				.then(
					(access) => {
						console.log(access);
						this.#hasAccess = true;
						this.#devices = Array.from(access.inputs.values()) as MIDIInput[];
						// TODO handle midi messages elsewhere
						this.#devices.forEach((device) => {
							console.log(device);
							device.onmidimessage = (event) => this.onMIDIMessage(event, onKeyDown, onKeyUp);
						});
					},
					(failure) => {
						console.error(failure);
						this.#hasAccess = false;
						this.#devices = [];
					}
				);
		} else {
			console.error('Web MIDI API is not supported in your browser');
		}
	}

	onMIDIMessage(
		event: MIDIMessageEvent,
		onKeyDown: (key: number) => void,
		onKeyUp: (key: number) => void
	) {
		if (!event.data || event.data.length < 3) return;

		const [status, note, velocity] = event.data;

		// Check if it's a note on or note off event
		const isNoteOn = (status & 0xf0) === 0x90 && velocity > 0;
		const isNoteOff = (status & 0xf0) === 0x80 || ((status & 0xf0) === 0x90 && velocity === 0);

		if (isNoteOn) {
			console.log(`Note ON: ${note} with velocity ${velocity}`);
			onKeyDown(note);
		} else if (isNoteOff) {
			console.log(`Note OFF: ${note}`);
			onKeyUp(note);
		}

		// Debug logging
		/* let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
		for (const character of event.data) {
			str += `0x${character.toString(16)} `;
		}
		console.debug(str); */
	}
}
