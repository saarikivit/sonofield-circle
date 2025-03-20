<script lang="ts">
	import {
		CircleService,
		CurrentKeyService,
		CurrentOctaveService,
		CurrentPresetService,
		NoteNameHelper,
		SynthService
	} from '$lib';
	import { Octave } from '$lib/types/octave';

	let size = 600; // Default size in pixels

	const presetService = CurrentPresetService.getInstance();
	const synthService = SynthService.getInstance(presetService);
	const tonicService = CurrentKeyService.getInstance();
	const octaveService = CurrentOctaveService.getInstance();
	const circleService = CircleService.getInstance(synthService, tonicService, octaveService);

	$effect(() => {
		circleService.initialize();
		return () => {
			circleService.dispose();
		};
	});

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
			octave: Octave.three
		});
		synthService.playDrone(key);
	}

	function handlePause() {
		circleService.unhighlightAll();
		synthService.stopAll();
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
