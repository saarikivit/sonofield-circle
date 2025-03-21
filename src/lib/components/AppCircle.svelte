<script lang="ts">
	import {
		CircleService,
		CurrentKeyService,
		CurrentOctaveService,
		CurrentPresetService,
		IconButton,
		NoteNameHelper,
		SynthService
	} from '$lib';
	import { Octave } from '$lib/types/octave';

	let innerWidth = $state(window.innerWidth);
	let innerHeight = $state(window.innerHeight);
	let minDimension = $derived(Math.min(innerWidth, innerHeight));
	let size = $derived(Math.min(minDimension, CircleService.maxSize));
	let playPauseSize = $derived(size * 0.15);

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

<svelte:window bind:innerWidth bind:innerHeight />

<div class="relative flex w-full items-center justify-center">
	<canvas id="circle" style="width: {size}px; height: {size}px;"></canvas>

	{#if !synthService.isPlaying}
		<IconButton
			src="/icons/play.svg"
			alt="Play"
			size={playPauseSize + 'px'}
			onclick={handlePlayPause}
		/>
	{:else}
		<IconButton
			src="/icons/pause.svg"
			alt="Pause"
			size={playPauseSize + 'px'}
			onclick={handlePlayPause}
		/>
	{/if}
</div>
