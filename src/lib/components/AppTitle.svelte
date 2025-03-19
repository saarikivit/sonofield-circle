<script lang="ts">
	import { page } from '$app/stores';
	let isHidden = $state(false);

	$effect(() => {
		isHidden = $page.url.searchParams.get('hidden') === 'true';
	});
</script>

<h1 class="text-2xl font-bold text-[#F3F0F0]" class:invisible={isHidden}>Sonofield Circle</h1>
