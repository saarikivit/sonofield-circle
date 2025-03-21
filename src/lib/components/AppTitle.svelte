<script lang="ts">
	import { CircleService, Wordmark } from '$lib';

	let innerWidth = $state(window.innerWidth);
	let size = $derived(Math.min(innerWidth * 0.6, CircleService.maxSize * 0.48));
</script>

<div class="flex w-full items-center justify-center">
	<div style="width: {size}px;">
		<Wordmark />
	</div>
</div>
