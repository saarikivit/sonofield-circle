<script lang="ts">
	import { AppDownload, AppTitle } from '$lib';
	import '../app.css';
	let { children } = $props();
</script>

<div class="min-h-screen bg-[#1A1A1D]">
	<header class="w-full px-4 py-16">
		<AppTitle />
	</header>

	<main class="flex flex-1 flex-col gap-8 p-4">
		{@render children()}
	</main>

	<footer class="w-full px-4 py-2">
		<AppDownload />
	</footer>
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
