<script lang="ts">
	import { availableKeys, currentKey, type MusicalKey } from '$lib/services';

	let midiDevices: string[] = [];
	let selectedDevice: string = '';

	currentKey.key;

	const octaves = [3, 4, 5];
	let selectedOctave: number = 4;

	function handleKeyChange(event: Event) {
		const select = event.target as HTMLSelectElement;
		const newKey = select.value as MusicalKey;
		currentKey.key = newKey;
	}

	function handleRandomKey() {
		currentKey.setRandomKey();
	}
</script>

<div class="flex items-center gap-4">
	<div class="flex flex-col gap-1">
		<label for="midi-device" class="text-sm text-[#F3F0F0]">MIDI Device</label>
		<select
			id="midi-device"
			bind:value={selectedDevice}
			class="rounded-md border border-[#3A3A3D] bg-[#2A2A2D] px-3 py-2 text-[#F3F0F0] focus:border-[#F3F0F0] focus:outline-none"
		>
			<option value="">Select MIDI device</option>
			{#each midiDevices as device}
				<option value={device}>{device}</option>
			{/each}
		</select>
	</div>

	<div class="flex flex-col gap-1">
		<div class="flex items-center gap-2">
			<label for="musical-key" class="text-sm text-[#F3F0F0]">Key</label>
			<button
				on:click={handleRandomKey}
				class="rounded bg-[#2A2A2D] px-2 py-1 text-sm text-[#F3F0F0] transition-colors hover:bg-[#3A3A3D]"
			>
				Random
			</button>
		</div>
		<select
			id="musical-key"
			value={currentKey.key}
			on:change={handleKeyChange}
			class="rounded-md border border-[#3A3A3D] bg-[#2A2A2D] px-3 py-2 text-[#F3F0F0] focus:border-[#F3F0F0] focus:outline-none"
		>
			{#each availableKeys as key}
				<option value={key}>{key}</option>
			{/each}
		</select>
	</div>

	<div class="flex flex-col gap-1">
		<label for="octave" class="text-sm text-[#F3F0F0]">Octave</label>
		<select
			id="octave"
			bind:value={selectedOctave}
			class="rounded-md border border-[#3A3A3D] bg-[#2A2A2D] px-3 py-2 text-[#F3F0F0] focus:border-[#F3F0F0] focus:outline-none"
		>
			{#each octaves as octave}
				<option value={octave}>{octave}</option>
			{/each}
		</select>
	</div>
</div>
