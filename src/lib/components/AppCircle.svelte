<script lang="ts">
	import { DegreeHelper, NoteNameHelper, OCTAVES, SynthService, type AppRiveEvent } from '$lib';
	import * as rive from '@rive-app/canvas';

	let size = 600; // Default size in pixels

	const synthService = SynthService.getInstance();

	$effect(() => {
		synthService.initialize();

		const r = new rive.Rive({
			canvas: document.getElementById('circle') as HTMLCanvasElement,
			src: '/rive/circle.riv',
			autoplay: true,
			artboard: 'Sonofield',
			stateMachines: 'Sonofield',
			onLoad: () => {
				// TODO canvas sizing controls
				r.resizeDrawingSurfaceToCanvas();
				DegreeHelper.asCOFList.forEach((degree) => {
					// TODO only the current mode
					r.setBooleanStateAtPath('isActive', true, `Nip ${degree.name}`);
					r.setBooleanStateAtPath('isHighlighted', true, `Nip ${degree.name}`);
				});
			}
		});

		r.on(rive.EventType.RiveEvent, (event) => {
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
			const key = NoteNameHelper.keyRelativeToIndexAndTonicGRoot({
				index,
				tonic: NoteNameHelper.NOTE_NAMES.c,
				octave: OCTAVES.four
			});
			synthService.stopMelody(key);
			return handleDegreeUI(index, false);
		}

		function handleDegreeDown(index: number) {
			const key = NoteNameHelper.keyRelativeToIndexAndTonicGRoot({
				index,
				tonic: NoteNameHelper.NOTE_NAMES.c,
				octave: OCTAVES.four
			});
			synthService.playMelody(key);
			return handleDegreeUI(index, true);
		}

		function handleDegreeUI(index: number, value: boolean) {
			const degree = DegreeHelper.getDegreeByIndexCOF(index);
			r.setBooleanStateAtPath('isActive', value, `Active ${degree.name}`);
			r.setBooleanStateAtPath('isActive', value, `Num ${degree.name}`);
		}

		return () => {
			r.removeAllRiveEventListeners();
			r.cleanup();
		};
	});
</script>

<div class="flex w-full items-center justify-center">
	{#if synthService.isInitialized}
		<p>Initialized</p>
	{:else}
		<p>Not initialized</p>
	{/if}
	<canvas id="circle" class="rounded-full bg-[#2A2A2D]" style="width: {size}px; height: {size}px;"
	></canvas>
</div>
