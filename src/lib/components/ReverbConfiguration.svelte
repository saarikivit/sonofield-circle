<script lang="ts">
	let { onConfigChange, initialConfig, title } = $props();

	let dampening = $state(initialConfig.dampening);
	let roomSize = $state(initialConfig.roomSize);
	let wet = $state(initialConfig.wet);

	$effect(() => {
		const config = {
			dampening,
			roomSize,
			wet
		};
		onConfigChange(config);
	});
</script>

<div class="bg-opacity-10 rounded-lg bg-[#333333] p-4 backdrop-blur-sm">
	<h2 class="mb-4 text-xl text-[#FAFAF0]">{title}</h2>

	<div class="space-y-6">
		<!-- Dampening -->
		<div>
			<label class="mb-1 block text-sm text-[#FAFAF0]" for="dampening">
				Dampening: {dampening.toFixed(2)}
			</label>
			<input
				type="range"
				id="dampening"
				bind:value={dampening}
				min="0"
				max="5000"
				step="100"
				class="w-full accent-[#000000]"
			/>
		</div>

		<!-- Room Size -->
		<div>
			<label class="mb-1 block text-sm text-[#FAFAF0]" for="roomSize">
				Room Size: {roomSize.toFixed(2)}
			</label>
			<input
				type="range"
				id="roomSize"
				bind:value={roomSize}
				min="0"
				max="1"
				step="0.01"
				class="w-full accent-[#000000]"
			/>
		</div>

		<!-- Wet Level -->
		<div>
			<label class="mb-1 block text-sm text-[#FAFAF0]" for="wet">
				Wet Level: {wet.toFixed(2)}
			</label>
			<input
				type="range"
				id="wet"
				bind:value={wet}
				min="0"
				max="1"
				step="0.01"
				class="w-full accent-[#000000]"
			/>
		</div>
	</div>
</div>
