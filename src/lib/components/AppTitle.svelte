<script lang="ts">
	import { CircleService, SettingsButton, Wordmark } from '$lib';

	let innerWidth = $state(window.innerWidth);
	let wordmarkSize = $derived(Math.min(innerWidth * 0.6, CircleService.maxSize * 0.48));
</script>

<div class="flex w-full flex-col items-center justify-center gap-4">
	<div style="width: {wordmarkSize}px;">
		<Wordmark />
	</div>
	<div class="pt-2">
		<SettingsButton />
	</div>
</div>
