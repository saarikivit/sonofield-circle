<!-- Header and body structure -->
<script>
	import { AppCircle, AppTitle, ControlPanel } from '$lib';
</script>

<header class="w-full p-4">
	<AppTitle />
</header>

<main class="flex flex-1 flex-col gap-8 p-4">
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
