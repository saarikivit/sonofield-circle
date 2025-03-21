<script lang="ts">
	import {
		CircleService,
		CurrentKeyService,
		IconButton,
		NoteNameHelper,
		PauseIcon,
		PlayIcon,
		SynthService
	} from '$lib';
	import { Octave } from '$lib/types/octave';

	let innerWidth = $state(window.innerWidth);
	let innerHeight = $state(window.innerHeight);
	let minDimension = $derived(Math.min(innerWidth, innerHeight));
	let size = $derived(Math.min(minDimension, CircleService.maxSize));
	let playPauseSize = $derived(size * 0.15);

	const synthService = SynthService.getContext();
	const tonicService = CurrentKeyService.getContext();
	const circleService = CircleService.getContext();

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
		<IconButton size={playPauseSize + 'px'} onclick={handlePlayPause}>
			<PlayIcon />
		</IconButton>
	{:else}
		<IconButton size={playPauseSize + 'px'} onclick={handlePlayPause}>
			<PauseIcon />
		</IconButton>
	{/if}
</div>
