<script lang="ts">
	import { AppTitle } from '$lib';
	import '../app.css';
	let { children } = $props();
</script>

<div class="min-h-screen bg-[#1A1A1D]">
	<header class="w-full p-4">
		<AppTitle />
	</header>

	<main class="flex flex-1 flex-col gap-8 p-4">
		{@render children()}
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		min-height: 100vh;
		background-color: #1a1a1d;
		display: flex;
		flex-direction: column;
	}
</style>
