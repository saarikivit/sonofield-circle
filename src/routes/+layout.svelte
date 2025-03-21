<script lang="ts">
	import { AppDownload, AppTitle } from '$lib';
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col overflow-auto">
	<div class="my-auto flex flex-1 flex-col">
		<header class="flex w-full flex-1 py-2 pt-16">
			<AppTitle />
		</header>

		<main class="flex flex-1 flex-col gap-8 py-2 pb-16">
			{@render children()}
		</main>
	</div>

	<footer class="fixed bottom-0 left-0 w-full px-4 py-2">
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
