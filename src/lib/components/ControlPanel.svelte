<script lang="ts">
	import {
		ChorusConfiguration,
		CircleService,
		CurrentKeyService,
		CurrentOctaveService,
		CurrentPresetService,
		DegreeHelper,
		MidiService,
		NoteNameHelper,
		OctaveHelper,
		ReverbConfiguration,
		SynthConfiguration,
		SynthService
	} from '$lib';

	import { NoteName } from '$lib/types/note-name';
	import { Octave } from '$lib/types/octave';
	import { SynthEffect, SynthPreset } from '$lib/types/synth-preset';

	const keyService = CurrentKeyService.getContext();
	const octaveService = CurrentOctaveService.getContext();
	const midiService = MidiService.getContext();
	const presetService = CurrentPresetService.getContext();
	const synthService = SynthService.getContext();
	const circleService = CircleService.getContext();

	const onKeyDown = (key: number) => {
		synthService.playMelody(key);
		const index = DegreeHelper.getCOFIndexByKey(key);
		circleService.highlightDegree(index);
	};

	const onKeyUp = (key: number) => {
		synthService.stopMelody(key);
		const index = DegreeHelper.getCOFIndexByKey(key);
		circleService.unhighlightDegree(index);
	};

	$effect(() => {
		midiService.requestAccessAndGetDevices({
			onKeyDown,
			onKeyUp
		});
	});

	function handleMidiDeviceChange(event: Event) {
		const select = event.target as HTMLSelectElement;
		const value = select.value;
		midiService.setSelectedDevice({ deviceId: value, onKeyDown, onKeyUp });
	}

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

<div class="flex items-center gap-4">
	<div class="flex flex-col gap-1">
		<label for="midi-device" class="text-sm text-[#F3F0F0]">MIDI Device</label>
		<select
			id="midi-device"
			value={midiService.selectedDevice?.id || null}
			onchange={handleMidiDeviceChange}
			class="rounded-md border border-[#3A3A3D] bg-[#2A2A2D] px-3 py-2 text-[#F3F0F0] focus:border-[#F3F0F0] focus:outline-none"
		>
			{#each midiService.availableDevices as device}
				<option value={device.id}>{device.manufacturer} {device.name}</option>
			{/each}
		</select>
	</div>

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

<div class="flex w-full flex-row gap-4">
	<div class="flex-1">
		<SynthConfiguration
			onConfigChange={synthService.configureMelodySynth}
			initialConfig={presetService.currentPreset.config}
			title="Melody Synth"
		/>
	</div>
	<div class="flex-1">
		<ReverbConfiguration
			onConfigChange={synthService.configureMelodyReverb}
			initialConfig={SynthEffect.reverb.config}
			title="Melody Reverb"
		/>
	</div>
	<div class="flex-1">
		<ChorusConfiguration
			onConfigChange={synthService.configureMelodyChorus}
			initialConfig={SynthEffect.chorus.config}
			title="Melody Chorus"
		/>
	</div>
</div>

<div class="flex w-full flex-row gap-4">
	<div class="flex-1">
		<SynthConfiguration
			onConfigChange={synthService.configureDroneSynth}
			initialConfig={presetService.currentPreset.config}
			title="Drone Synth"
		/>
	</div>
	<div class="flex-1">
		<ReverbConfiguration
			onConfigChange={synthService.configureDroneReverb}
			initialConfig={SynthEffect.reverb.config}
			title="Drone Reverb"
		/>
	</div>
	<div class="flex-1">
		<ChorusConfiguration
			onConfigChange={synthService.configureDroneChorus}
			initialConfig={SynthEffect.chorus.config}
			title="Drone Chorus"
		/>
	</div>
</div>
