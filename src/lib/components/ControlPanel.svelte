<script lang="ts">
	import { CurrentKeyService, CurrentOctaveService, NoteNameHelper, OctaveHelper } from '$lib';

	let midiDevices: string[] = [];
	let selectedDevice: string = '';

	const keyService = CurrentKeyService.getInstance();
	const octaveService = CurrentOctaveService.getInstance();

	function handleKeyChange(event: Event) {
		const select = event.target as HTMLSelectElement;
		const value = select.value as string;
		const newKey = NoteNameHelper.getNoteNameByName(value);
		keyService.setKey(newKey);
	}

	function handleRandomKey() {
		keyService.setRandomKey();
	}

	function handleOctaveChange(event: Event) {
		const select = event.target as HTMLSelectElement;
		const value = parseInt(select.value);
		const newOctave = OctaveHelper.getOctaveByValue(value);
		octaveService.setOctave(newOctave);
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
			value={keyService.currentKey}
			on:change={handleKeyChange}
			class="rounded-md border border-[#3A3A3D] bg-[#2A2A2D] px-3 py-2 text-[#F3F0F0] focus:border-[#F3F0F0] focus:outline-none"
		>
			{#each NoteNameHelper.asToneList as note}
				<option value={note.name}>{note.name}</option>
			{/each}
		</select>
	</div>

	<div class="flex flex-col gap-1">
		<label for="octave" class="text-sm text-[#F3F0F0]">Octave</label>
		<select
			id="octave"
			value={octaveService.currentOctave}
			on:change={handleOctaveChange}
			class="rounded-md border border-[#3A3A3D] bg-[#2A2A2D] px-3 py-2 text-[#F3F0F0] focus:border-[#F3F0F0] focus:outline-none"
		>
			{#each OctaveHelper.asList as octave}
				<option value={octave.value}>{octave.name}</option>
			{/each}
		</select>
	</div>
</div>
