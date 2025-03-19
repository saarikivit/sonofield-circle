<script lang="ts">
	import { page } from '$app/stores';
	import {
		CurrentKeyService,
		CurrentOctaveService,
		CurrentPresetService,
		MidiService,
		NoteNameHelper,
		OctaveHelper,
		SynthService
	} from '$lib';

	import { NoteName } from '$lib/types/note-name';
	import { Octave } from '$lib/types/octave';
	import { SynthPreset } from '$lib/types/synth-preset';

	let midiDevices: string[] = [];
	let selectedDevice: string = $state('');
	let isHidden = $state(false);

	const keyService = CurrentKeyService.getInstance();
	const octaveService = CurrentOctaveService.getInstance();
	const midiService = MidiService.getInstance();
	const presetService = CurrentPresetService.getInstance();
	const synthService = SynthService.getInstance(presetService);

	$effect(() => {
		isHidden = $page.url.searchParams.get('hidden') === 'true';
	});

	$effect(() => {
		midiService.requestAccess(
			(key) => {
				synthService.playMelody(key);
			},
			(key) => {
				synthService.stopMelody(key);
			}
		);
	});

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

	function handlePresetChange(event: Event) {
		const select = event.target as HTMLSelectElement;
		const value = select.value;
		presetService.setPreset(value);
	}
</script>

<div class="flex items-center gap-4" class:invisible={isHidden}>
	<!-- <div class="flex flex-col gap-1">
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
	</div> -->

	<div class="flex flex-col gap-1">
		<div class="flex items-center gap-2">
			<label for="musical-key" class="text-sm text-[#F3F0F0]">Key</label>
			<button
				onclick={handleRandomKey}
				class="rounded bg-[#2A2A2D] px-1 text-xs font-bold text-[#F3F0F0] transition-colors hover:bg-[#3A3A3D]"
			>
				random
			</button>
		</div>
		<select
			id="musical-key"
			value={keyService.currentKey.name}
			onchange={handleKeyChange}
			class="rounded-md border border-[#3A3A3D] bg-[#2A2A2D] px-3 py-2 text-[#F3F0F0] focus:border-[#F3F0F0] focus:outline-none"
		>
			{#each NoteName.asToneList as note}
				<option value={note.name}>{note.name}</option>
			{/each}
		</select>
	</div>

	<div class="flex flex-col gap-1">
		<label for="octave" class="text-sm text-[#F3F0F0]">Octave</label>
		<select
			id="octave"
			value={octaveService.currentOctave.value}
			onchange={handleOctaveChange}
			class="rounded-md border border-[#3A3A3D] bg-[#2A2A2D] px-3 py-2 text-[#F3F0F0] focus:border-[#F3F0F0] focus:outline-none"
		>
			{#each Octave.asList as octave}
				<option value={octave.value}>{octave.name}</option>
			{/each}
		</select>
	</div>

	<div class="flex flex-col gap-1">
		<label for="preset" class="text-sm text-[#F3F0F0]">Synth Preset</label>
		<select
			id="preset"
			value={presetService.currentPreset.id}
			onchange={handlePresetChange}
			class="rounded-md border border-[#3A3A3D] bg-[#2A2A2D] px-3 py-2 text-[#F3F0F0] focus:border-[#F3F0F0] focus:outline-none"
		>
			{#each SynthPreset.asList as preset}
				<option value={preset.id}>{preset.name}</option>
			{/each}
		</select>
	</div>
</div>
