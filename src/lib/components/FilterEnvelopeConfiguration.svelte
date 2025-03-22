<script lang="ts">
	let { onConfigChange, initialConfig, title } = $props();

	let attack = $state(initialConfig.attack);
	let decay = $state(initialConfig.decay);
	let sustain = $state(initialConfig.sustain);
	let release = $state(initialConfig.release);
	// let baseFrequency = $state(initialConfig.baseFrequency);
	let octaves = $state(initialConfig.octaves);
	let exponent = $state(initialConfig.exponent);
	let attackCurve = $state(initialConfig.attackCurve);
	let decayCurve = $state(initialConfig.decayCurve);
	let releaseCurve = $state(initialConfig.releaseCurve);

	$effect(() => {
		// Emit configuration changes to parent component
		const config = {
			attack,
			decay,
			sustain,
			release,
			// baseFrequency,
			octaves,
			exponent,
			attackCurve,
			decayCurve,
			releaseCurve
		};
		onConfigChange(config);
	});
</script>

<div class="bg-opacity-10 rounded-lg bg-[#333333] p-4 backdrop-blur-sm">
	<h2 class="mb-4 text-xl text-[#FAFAF0]">{title}</h2>

	<div class="space-y-6">
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

		<!-- Base Frequency -->
		<!-- <div>
			<label class="mb-1 block text-sm text-[#FAFAF0]" for="baseFrequency">
				Base Frequency: {baseFrequency} Hz
			</label>
			<input
				type="range"
				id="baseFrequency"
				bind:value={baseFrequency}
				min="0"
				max="2000"
				step="100"
				class="w-full accent-[#000000]"
			/>
		</div> -->

		<!-- Octaves -->
		<div>
			<label class="mb-1 block text-sm text-[#FAFAF0]" for="octaves">
				Octaves: {octaves}
			</label>
			<input
				type="range"
				id="octaves"
				bind:value={octaves}
				min="0"
				max="6"
				step="1"
				class="w-full accent-[#000000]"
			/>
		</div>

		<!-- Exponent -->
		<div>
			<label class="mb-1 block text-sm text-[#FAFAF0]" for="exponent">
				Exponent: {exponent}
			</label>
			<input
				type="range"
				id="exponent"
				bind:value={exponent}
				min="1"
				max="8"
				step="1"
				class="w-full accent-[#000000]"
			/>
		</div>

		<!-- Attack Curve -->
		<div>
			<label class="mb-1 block text-sm text-[#FAFAF0]" for="attackCurve">
				Attack Curve: {attackCurve}
			</label>
			<select
				id="attackCurve"
				bind:value={attackCurve}
				class="w-full rounded-md border border-[#3A3A3D] bg-[#2A2A2D] px-3 py-2 text-[#F3F0F0] focus:border-[#F3F0F0] focus:outline-none"
			>
				<option value="linear">Linear</option>
				<option value="exponential">Exponential</option>
				<option value="bounce">Bounce</option>
				<option value="cosine">Cosine</option>
				<option value="sine">Sine</option>
				<option value="ripple">Ripple</option>
				<option value="step">Step</option>
			</select>
		</div>

		<!-- Decay Curve -->
		<div>
			<label class="mb-1 block text-sm text-[#FAFAF0]" for="decayCurve">
				Decay Curve: {decayCurve}
			</label>
			<select
				id="decayCurve"
				bind:value={decayCurve}
				class="w-full rounded-md border border-[#3A3A3D] bg-[#2A2A2D] px-3 py-2 text-[#F3F0F0] focus:border-[#F3F0F0] focus:outline-none"
			>
				<option value="linear">Linear</option>
				<option value="exponential">Exponential</option>
			</select>
		</div>

		<!-- Release Curve -->
		<div>
			<label class="mb-1 block text-sm text-[#FAFAF0]" for="releaseCurve">
				Release Curve: {releaseCurve}
			</label>
			<select
				id="releaseCurve"
				bind:value={releaseCurve}
				class="w-full rounded-md border border-[#3A3A3D] bg-[#2A2A2D] px-3 py-2 text-[#F3F0F0] focus:border-[#F3F0F0] focus:outline-none"
			>
				<option value="linear">Linear</option>
				<option value="exponential">Exponential</option>
				<option value="bounce">Bounce</option>
				<option value="cosine">Cosine</option>
				<option value="sine">Sine</option>
				<option value="ripple">Ripple</option>
				<option value="step">Step</option>
			</select>
		</div>
	</div>
</div>
