<script lang="ts">
	import { ControlPanel, TuneIcon } from '$lib';

	function showSettingsModal() {
		const settingsModal = document.getElementById('settings-modal') as HTMLDialogElement;
		settingsModal.showModal();
	}
</script>

<button class="btn btn-outline btn-neutral flex items-center gap-2" onclick={showSettingsModal}>
	<TuneIcon />
	SETTINGS
</button>

<dialog id="settings-modal" class="modal">
	<div class="modal-box h-11/12 w-11/12 max-w-5xl">
		<h3 class="text-lg font-bold">Settings</h3>
		<p class="py-4">Press ESC key or click the button below to close</p>

		<div>
			<ControlPanel />
		</div>

		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
