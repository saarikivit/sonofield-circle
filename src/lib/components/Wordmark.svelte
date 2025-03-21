<!-- A component that displays the SET wordmark SVG -->
<script lang="ts">
	// Props for customizing the wordmark
	let { class: className = '' } = $props<{
		class?: string;
	}>();
</script>

<img src="/images/set-wordmark.svg" alt="SET Wordmark" class={className} width="449" height="83" />

<style>
	img {
		width: 100%;
		height: auto;
		max-width: 449px;
	}
</style>
