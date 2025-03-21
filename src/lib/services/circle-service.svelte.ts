import {
	CurrentKeyService,
	CurrentOctaveService,
	DegreeHelper,
	NoteNameHelper,
	SynthService,
	type AppRiveEvent
} from '$lib';
import { NoteDegree } from '$lib/types/note-degree';
import * as rive from '@rive-app/canvas';
import { getContext, setContext } from 'svelte';

export class CircleService {
	public static readonly maxSize = 600;
	private static readonly key = {};

	public static initializeContext({
		synthService,
		tonicService,
		octaveService
	}: {
		synthService: SynthService;
		tonicService: CurrentKeyService;
		octaveService: CurrentOctaveService;
	}): CircleService {
		return setContext(this.key, new CircleService(synthService, tonicService, octaveService));
	}

	public static getContext() {
		return getContext(this.key) as CircleService;
	}

	private constructor(
		private synthService: SynthService,
		private tonicService: CurrentKeyService,
		private octaveService: CurrentOctaveService
	) {}

	private r: rive.Rive | null = null;

	public initialize() {
		this.r = new rive.Rive({
			canvas: document.getElementById('circle') as HTMLCanvasElement,
			src: '/rive/circle.riv',
			autoplay: true,
			artboard: 'Sonofield',
			stateMachines: 'Sonofield',
			isTouchScrollEnabled: true,
			onLoad: () => {
				this.resetCanvas();
				NoteDegree.asCOFList.forEach((degree) => {
					this.r!.setBooleanStateAtPath('isHighlighted', true, `Nip ${degree.name}`);
				});
			}
		});

		this.r!.on(rive.EventType.RiveEvent, (event) => {
			const data = event.data as rive.RiveEventPayload;
			if (data.name) {
				this.handleRiveEvent(data.name as AppRiveEvent);
			}
		});
	}

	public resetCanvas = () => {
		this.r!.resizeDrawingSurfaceToCanvas();
	};

	private handleRiveEvent = (name: AppRiveEvent) => {
		switch (name) {
			case '0Up':
				return this.handleDegreeUp(0);
			case '0Down':
				return this.handleDegreeDown(0);
			case '1Up':
				return this.handleDegreeUp(1);
			case '1Down':
				return this.handleDegreeDown(1);
			case '2Up':
				return this.handleDegreeUp(2);
			case '2Down':
				return this.handleDegreeDown(2);
			case '3Up':
				return this.handleDegreeUp(3);
			case '3Down':
				return this.handleDegreeDown(3);
			case '4Up':
				return this.handleDegreeUp(4);
			case '4Down':
				return this.handleDegreeDown(4);
			case '5Up':
				return this.handleDegreeUp(5);
			case '5Down':
				return this.handleDegreeDown(5);
			case '6Up':
				return this.handleDegreeUp(6);
			case '6Down':
				return this.handleDegreeDown(6);
			case '7Up':
				return this.handleDegreeUp(7);
			case '7Down':
				return this.handleDegreeDown(7);
			case '8Up':
				return this.handleDegreeUp(8);
			case '8Down':
				return this.handleDegreeDown(8);
			case '9Up':
				return this.handleDegreeUp(9);
			case '9Down':
				return this.handleDegreeDown(9);
			case '10Up':
				return this.handleDegreeUp(10);
			case '10Down':
				return this.handleDegreeDown(10);
			case '11Up':
				return this.handleDegreeUp(11);
			case '11Down':
				return this.handleDegreeDown(11);
		}
	};

	private handleDegreeUp = (index: number) => {
		if (!this.synthService.isPlaying) return;

		const key = NoteNameHelper.keyRelativeToIndexAndTonicGRoot({
			index,
			tonic: this.tonicService.currentKey,
			octave: this.octaveService.currentOctave
		});
		this.synthService.stopMelody(key);
		return this.handleDegreeUI(index, false);
	};

	private handleDegreeDown = (index: number) => {
		if (!this.synthService.isPlaying) return;

		const key = NoteNameHelper.keyRelativeToIndexAndTonicGRoot({
			index,
			tonic: this.tonicService.currentKey,
			octave: this.octaveService.currentOctave
		});
		this.synthService.playMelody(key);
		return this.handleDegreeUI(index, true);
	};

	public unhighlightAll = () => {
		for (let i = 0; i < 12; i++) {
			this.handleDegreeUI(i, false);
		}
	};

	public dispose = () => {
		this.unhighlightAll();
		this.r!.removeAllRiveEventListeners();
		this.r!.cleanup();
	};

	public highlightDegree = (index: number) => {
		this.handleDegreeUI(index, true);
	};

	public unhighlightDegree = (index: number) => {
		this.handleDegreeUI(index, false);
	};

	private handleDegreeUI = (index: number, value: boolean) => {
		const degree = DegreeHelper.getDegreeByIndexCOF(index);
		this.r!.setBooleanStateAtPath('isActive', value, `Active ${degree.name}`);
		this.r!.setBooleanStateAtPath('isActive', value, `Num ${degree.name}`);
	};
}
