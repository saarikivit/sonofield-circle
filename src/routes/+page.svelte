<!-- Header and body structure -->
<script>
	import { AppCircle, ControlPanel } from '$lib';
</script>

<header class="w-full bg-[#1A1A1D] p-4">
	<h1 class="text-2xl font-bold text-[#F3F0F0]">Sonofield Circle</h1>
</header>

<main class="flex flex-1 flex-col gap-8 bg-[#1A1A1D] p-4">
	<ControlPanel />
	<AppCircle />
</main>

<style>
	:global(body) {
		margin: 0;
		min-height: 100vh;
		background-color: #1a1a1d;
		display: flex;
		flex-direction: column;
	}
</style>
