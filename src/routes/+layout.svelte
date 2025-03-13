<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="min-h-screen bg-[#1A1A1D]">
	{@render children()}
</div>
