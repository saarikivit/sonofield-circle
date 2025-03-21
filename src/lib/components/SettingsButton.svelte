<script>
	import { TuneIcon } from '$lib';

	const defaultColor = '#7A7777';
	const hoverColor = '#1A1A1D';

	let color = $state(defaultColor);

	function handleMouseOver() {
		color = hoverColor;
	}

	function handleMouseOut() {
		color = defaultColor;
	}
</script>

<button
	class="flex items-center gap-2 rounded-md border border-[#7A7777] bg-[#1A1A1D] px-4 py-2 text-[#7A7777] transition-colors hover:bg-[#7A7777] hover:text-[#1A1A1D]"
	onmouseover={handleMouseOver}
	onmouseout={handleMouseOut}
>
	<TuneIcon {color} />
	SETTINGS
</button>
