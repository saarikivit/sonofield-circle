<script lang="ts">
	let { title, volume, onUpdateVolume } = $props();
</script>

<div class="bg-opacity-10 rounded-lg bg-[#333333] p-4 backdrop-blur-sm">
	<h2 class="mb-4 text-xl text-[#FAFAF0]">{title}</h2>

	<!-- Portamento -->
	<div>
		<label class="mb-1 block text-sm text-[#FAFAF0]" for="portamento">
			Volume: {volume} db
		</label>
		<input
			type="range"
			id="portamento"
			value={volume}
			onchange={onUpdateVolume}
			min="-20"
			max="0"
			step="0.1"
			class="w-full accent-[#000000]"
		/>
	</div>
</div>
