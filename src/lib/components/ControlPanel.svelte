<script lang="ts">
    let midiDevices: string[] = [];
    let selectedDevice: string = '';
    
    const musicalKeys = [
        'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
    ];
    let selectedKey: string = 'C';
    
    const octaves = [3, 4, 5];
    let selectedOctave: number = 4;
</script>

<div class="flex gap-4 items-center">
    <div class="flex flex-col gap-1">
        <label for="midi-device" class="text-[#F3F0F0] text-sm">MIDI Device</label>
        <select 
            id="midi-device"
            bind:value={selectedDevice}
            class="bg-[#2A2A2D] text-[#F3F0F0] px-3 py-2 rounded-md border border-[#3A3A3D] focus:outline-none focus:border-[#F3F0F0]"
        >
            <option value="">Select MIDI device</option>
            {#each midiDevices as device}
                <option value={device}>{device}</option>
            {/each}
        </select>
    </div>

    <div class="flex flex-col gap-1">
        <label for="musical-key" class="text-[#F3F0F0] text-sm">Key</label>
        <select 
            id="musical-key"
            bind:value={selectedKey}
            class="bg-[#2A2A2D] text-[#F3F0F0] px-3 py-2 rounded-md border border-[#3A3A3D] focus:outline-none focus:border-[#F3F0F0]"
        >
            {#each musicalKeys as key}
                <option value={key}>{key}</option>
            {/each}
        </select>
    </div>

    <div class="flex flex-col gap-1">
        <label for="octave" class="text-[#F3F0F0] text-sm">Octave</label>
        <select 
            id="octave"
            bind:value={selectedOctave}
            class="bg-[#2A2A2D] text-[#F3F0F0] px-3 py-2 rounded-md border border-[#3A3A3D] focus:outline-none focus:border-[#F3F0F0]"
        >
            {#each octaves as octave}
                <option value={octave}>{octave}</option>
            {/each}
        </select>
    </div>
</div> 