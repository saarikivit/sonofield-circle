<script lang="ts">
	let { title, volume, onUpdateVolume, name } = $props();
</script>

<div class="bg-opacity-10 rounded-lg bg-[#333333] p-4 backdrop-blur-sm">
	<h2 class="mb-4 text-xl text-[#FAFAF0]">{title}</h2>

	<!-- Volume -->
	<div>
		<label class="mb-1 block text-sm text-[#FAFAF0]" for={name}>
			Volume: {volume} db
		</label>
		<input
			type="range"
			id={name}
			value={volume}
			onchange={onUpdateVolume}
			min="-64"
			max="0"
			step="1"
			class="w-full accent-[#000000]"
		/>
	</div>
</div>
