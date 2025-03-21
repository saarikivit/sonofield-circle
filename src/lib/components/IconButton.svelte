<script lang="ts">
	let { onclick, src, alt, size } = $props();
</script>

<button
	{onclick}
	class="absolute flex items-center justify-center"
	style="width: {size}; height: {size};"
>
	<img {src} {alt} style="width: 100%; height: 100%;" />
</button>
