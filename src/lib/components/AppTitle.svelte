<script lang="ts">
	import { CircleService, Wordmark } from '$lib';

	let innerWidth = $state(window.innerWidth);
	const multiplier = 0.48;
	let size = $derived(Math.min(innerWidth * multiplier, CircleService.maxSize * multiplier));
</script>

<div class="flex w-full items-center justify-center">
	<div style="width: {size}px;">
		<Wordmark />
	</div>
</div>
