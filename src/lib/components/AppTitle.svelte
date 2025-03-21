<script lang="ts">
	import { CircleService, Wordmark } from '$lib';

	let innerWidth = $state(window.innerWidth);
	let wordmarkSize = $derived(Math.min(innerWidth * 0.6, CircleService.maxSize * 0.48));
</script>

<div class="flex w-full flex-col items-center justify-center gap-4">
	<button
		class="rounded-md border border-[#7A7777] bg-[#1A1A1D] px-4 py-2 text-[#7A7777] transition-colors hover:bg-[#7A7777] hover:text-[#1A1A1D]"
	>
		Settings
	</button>
	<div style="width: {wordmarkSize}px;">
		<Wordmark />
	</div>
</div>
