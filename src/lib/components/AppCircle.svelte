<script lang="ts">
	import { browser } from '$app/environment';
	import {
		CircleService,
		CurrentKeyService,
		CurrentOctaveService,
		CurrentPresetService,
		NoteNameHelper,
		SynthService
	} from '$lib';
	import { Octave } from '$lib/types/octave';

	let innerWidth = $state(browser ? window.innerWidth : 0);
	let innerHeight = $state(browser ? window.innerHeight : 0);
	let minDimension = $derived(Math.min(innerWidth, innerHeight));
	let size = $derived(Math.min(minDimension, 600));
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
	<button
		onclick={handlePlayPause}
		class="absolute flex items-center justify-center opacity-50"
		style="width: {playPauseSize}px; height: {playPauseSize}px;"
	>
		{#if synthService.isPlaying}
			<img src="/icons/pause.svg" alt="Pause" style="width: 100%; height: 100%;" />
		{:else}
			<img src="/icons/play.svg" alt="Play" style="width: 100%; height: 100%;" />
		{/if}
	</button>
</div>
