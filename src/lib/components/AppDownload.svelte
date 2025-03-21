<script lang="ts">
	import { SynthService } from '$lib';

	const synthService = SynthService.getContext();
</script>

<div class="flex items-center justify-center gap-4">
	<a
		href="https://et.sonofield.com"
		aria-label="Download Sonofield Ear Trainer"
		class="btn btn-link"
		hidden={synthService.isPlaying}
	>
		Download Sonofield Ear Trainer for iOS and Android.
	</a>
</div>
