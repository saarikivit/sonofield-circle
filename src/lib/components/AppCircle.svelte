<script lang="ts">
	import {
		CurrentKeyService,
		DegreeHelper,
		NoteNameHelper,
		SynthService,
		type AppRiveEvent
	} from '$lib';
	import { NoteDegree } from '$lib/types/note-degree';
	import { Octave } from '$lib/types/octave';
	import * as rive from '@rive-app/canvas';

	let size = 600; // Default size in pixels

	const synthService = SynthService.getInstance();
	const tonicService = CurrentKeyService.getInstance();
	let r: rive.Rive | null = null;

	$effect(() => {
		r = new rive.Rive({
			canvas: document.getElementById('circle') as HTMLCanvasElement,
			src: '/rive/circle.riv',
			autoplay: true,
			artboard: 'Sonofield',
			stateMachines: 'Sonofield',
			onLoad: () => {
				// TODO canvas sizing controls
				r!.resizeDrawingSurfaceToCanvas();
				NoteDegree.asCOFList.forEach((degree) => {
					// TODO only the current mode
					r!.setBooleanStateAtPath('isHighlighted', true, `Nip ${degree.name}`);
				});
			}
		});

		r!.on(rive.EventType.RiveEvent, (event) => {
			const data = event.data as rive.RiveEventPayload;
			if (data.name) {
				handleRiveEvent(data.name as AppRiveEvent);
			}
		});

		function handleRiveEvent(name: AppRiveEvent) {
			switch (name) {
				case '0Up':
					return handleDegreeUp(0);
				case '0Down':
					return handleDegreeDown(0);
				case '1Up':
					return handleDegreeUp(1);
				case '1Down':
					return handleDegreeDown(1);
				case '2Up':
					return handleDegreeUp(2);
				case '2Down':
					return handleDegreeDown(2);
				case '3Up':
					return handleDegreeUp(3);
				case '3Down':
					return handleDegreeDown(3);
				case '4Up':
					return handleDegreeUp(4);
				case '4Down':
					return handleDegreeDown(4);
				case '5Up':
					return handleDegreeUp(5);
				case '5Down':
					return handleDegreeDown(5);
				case '6Up':
					return handleDegreeUp(6);
				case '6Down':
					return handleDegreeDown(6);
				case '7Up':
					return handleDegreeUp(7);
				case '7Down':
					return handleDegreeDown(7);
				case '8Up':
					return handleDegreeUp(8);
				case '8Down':
					return handleDegreeDown(8);
				case '9Up':
					return handleDegreeUp(9);
				case '9Down':
					return handleDegreeDown(9);
				case '10Up':
					return handleDegreeUp(10);
				case '10Down':
					return handleDegreeDown(10);
				case '11Up':
					return handleDegreeUp(11);
				case '11Down':
					return handleDegreeDown(11);
			}
		}

		function handleDegreeUp(index: number) {
			if (!synthService.isPlaying) return;

			const key = NoteNameHelper.keyRelativeToIndexAndTonicGRoot({
				index,
				tonic: tonicService.currentKey,
				octave: Octave.four
			});
			synthService.stopMelody(key);
			return handleDegreeUI(index, false);
		}

		function handleDegreeDown(index: number) {
			if (!synthService.isPlaying) return;

			const key = NoteNameHelper.keyRelativeToIndexAndTonicGRoot({
				index,
				tonic: tonicService.currentKey,
				octave: Octave.four
			});
			synthService.playMelody(key);
			return handleDegreeUI(index, true);
		}

		return () => {
			r!.removeAllRiveEventListeners();
			r!.cleanup();
		};
	});

	function handleDegreeUI(index: number, value: boolean) {
		const degree = DegreeHelper.getDegreeByIndexCOF(index);
		r!.setBooleanStateAtPath('isActive', value, `Active ${degree.name}`);
		r!.setBooleanStateAtPath('isActive', value, `Num ${degree.name}`);
	}

	async function handlePlayPause() {
		if (synthService.isPlaying) {
			handlePause();
		} else {
			await synthService.initialize();
			handlePlay();
		}
	}

	function handlePlay() {
		const key = NoteNameHelper.keyTonicFromOctave({
			tonic: tonicService.currentKey,
			octave: Octave.two
		});
		synthService.playDrone(key);
	}

	function unhighlightAll() {
		for (let i = 0; i < 12; i++) {
			handleDegreeUI(i, false);
		}
	}

	function handlePause() {
		synthService.stopAll();
		unhighlightAll();
	}
</script>

<div class="relative flex w-full items-center justify-center">
	<canvas id="circle" style="width: {size}px; height: {size}px;"></canvas>
	<button
		onclick={handlePlayPause}
		class="absolute flex h-32 w-32 items-center justify-center opacity-50"
	>
		{#if synthService.isPlaying}
			<img src="/icons/pause.svg" alt="Pause" class="h-32 w-32" />
		{:else}
			<img src="/icons/play.svg" alt="Play" class="h-32 w-32" />
		{/if}
	</button>
</div>
