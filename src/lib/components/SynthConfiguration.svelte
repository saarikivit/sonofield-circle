<script lang="ts">
	const OSCILLATOR_TYPES = ['sine', 'triangle', 'sawtooth'] as const;

	let { onConfigChange, initialConfig } = $props();

	let oscillatorType = $state(initialConfig.oscillator.type);
	let attack = $state(initialConfig.envelope.attack);
	let decay = $state(initialConfig.envelope.decay);
	let sustain = $state(initialConfig.envelope.sustain);
	let release = $state(initialConfig.envelope.release);

	$effect(() => {
		// Emit configuration changes to parent component
		const config = {
			oscillator: {
				type: oscillatorType
			},
			envelope: {
				attack,
				decay,
				sustain,
				release
			}
		};
		console.log(config);
		onConfigChange(config);
	});
</script>

<div class="bg-opacity-10 rounded-lg bg-[#F3F0F0] p-4 backdrop-blur-sm">
	<h2 class="mb-4 text-xl text-[#F3F0F0]">Synth Configuration</h2>

	<div class="space-y-6">
		<!-- Oscillator Type -->
		<div>
			<label class="mb-2 block text-[#F3F0F0]" for="oscillator"> Oscillator Type </label>
			<select
				id="oscillator"
				bind:value={oscillatorType}
				class="border-opacity-20 w-full rounded border border-[#F3F0F0] bg-[#1A1A1D] p-2 text-[#F3F0F0]"
			>
				{#each OSCILLATOR_TYPES as type}
					<option value={type}>{type}</option>
				{/each}
			</select>
		</div>

		<!-- Envelope Controls -->
		<div class="space-y-4">
			<h3 class="text-lg text-[#F3F0F0]">Envelope</h3>

			<!-- Attack -->
			<div>
				<label class="mb-1 block text-sm text-[#F3F0F0]" for="attack">
					Attack: {attack.toFixed(2)}s
				</label>
				<input
					type="range"
					id="attack"
					bind:value={attack}
					min="0"
					max="2"
					step="0.01"
					class="w-full accent-[#F3F0F0]"
				/>
			</div>

			<!-- Decay -->
			<div>
				<label class="mb-1 block text-sm text-[#F3F0F0]" for="decay">
					Decay: {decay.toFixed(2)}s
				</label>
				<input
					type="range"
					id="decay"
					bind:value={decay}
					min="0"
					max="2"
					step="0.01"
					class="w-full accent-[#F3F0F0]"
				/>
			</div>

			<!-- Sustain -->
			<div>
				<label class="mb-1 block text-sm text-[#F3F0F0]" for="sustain">
					Sustain: {sustain.toFixed(2)}
				</label>
				<input
					type="range"
					id="sustain"
					bind:value={sustain}
					min="0"
					max="1"
					step="0.01"
					class="w-full accent-[#F3F0F0]"
				/>
			</div>

			<!-- Release -->
			<div>
				<label class="mb-1 block text-sm text-[#F3F0F0]" for="release">
					Release: {release.toFixed(2)}s
				</label>
				<input
					type="range"
					id="release"
					bind:value={release}
					min="0"
					max="2"
					step="0.01"
					class="w-full accent-[#F3F0F0]"
				/>
			</div>
		</div>
	</div>
</div>
