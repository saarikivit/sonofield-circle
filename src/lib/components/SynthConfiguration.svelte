<script lang="ts">
	const OSCILLATOR_TYPES = ['sine', 'triangle', 'sawtooth'] as const;

	let { onConfigChange, initialConfig, title } = $props();

	let oscillatorType = $state(initialConfig.oscillator.type);
	let attack = $state(initialConfig.envelope.attack);
	let decay = $state(initialConfig.envelope.decay);
	let sustain = $state(initialConfig.envelope.sustain);
	let release = $state(initialConfig.envelope.release);
	let portamento = $state(initialConfig.portamento);

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
			},
			portamento
		};
		onConfigChange(config);
	});
</script>

<div class="bg-opacity-10 rounded-lg bg-[#333333] p-4 backdrop-blur-sm">
	<h2 class="mb-4 text-xl text-[#FAFAF0]">{title}</h2>

	<div class="space-y-6">
		<!-- Oscillator Type -->
		<div>
			<label class="mb-2 block text-[#FAFAF0]" for="oscillator"> Oscillator Type </label>
			<select
				id="oscillator"
				bind:value={oscillatorType}
				class="border-opacity-20 w-full rounded border border-[#333333] bg-[#1A1A1D] p-2 text-[#333333]"
			>
				{#each OSCILLATOR_TYPES as type}
					<option value={type}>{type}</option>
				{/each}
			</select>
		</div>

		<!-- Envelope Controls -->
		<div class="space-y-4">
			<h3 class="text-lg text-[#FAFAF0]">Envelope</h3>

			<!-- Attack -->
			<div>
				<label class="mb-1 block text-sm text-[#FAFAF0]" for="attack">
					Attack: {attack.toFixed(2)}s
				</label>
				<input
					type="range"
					id="attack"
					bind:value={attack}
					min="0"
					max="2"
					step="0.01"
					class="w-full accent-[#000000]"
				/>
			</div>

			<!-- Decay -->
			<div>
				<label class="mb-1 block text-sm text-[#FAFAF0]" for="decay">
					Decay: {decay.toFixed(2)}s
				</label>
				<input
					type="range"
					id="decay"
					bind:value={decay}
					min="0"
					max="2"
					step="0.01"
					class="w-full accent-[#000000]"
				/>
			</div>

			<!-- Sustain -->
			<div>
				<label class="mb-1 block text-sm text-[#FAFAF0]" for="sustain">
					Sustain: {sustain.toFixed(2)}
				</label>
				<input
					type="range"
					id="sustain"
					bind:value={sustain}
					min="0"
					max="1"
					step="0.01"
					class="w-full accent-[#000000]"
				/>
			</div>

			<!-- Release -->
			<div>
				<label class="mb-1 block text-sm text-[#FAFAF0]" for="release">
					Release: {release.toFixed(2)}s
				</label>
				<input
					type="range"
					id="release"
					bind:value={release}
					min="0"
					max="5"
					step="0.01"
					class="w-full accent-[#000000]"
				/>
			</div>
		</div>

		<!-- Portamento -->
		<div>
			<label class="mb-1 block text-sm text-[#FAFAF0]" for="portamento">
				Portamento: {portamento.toFixed(2)}s
			</label>
			<input
				type="range"
				id="portamento"
				bind:value={portamento}
				min="0"
				max="1"
				step="0.01"
				class="w-full accent-[#000000]"
			/>
		</div>
	</div>
</div>
