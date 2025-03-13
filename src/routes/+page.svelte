<!-- Header and body structure -->
<script>
    import { AppCircle, ControlPanel } from '$lib/components';
</script>

<header class="w-full p-4 bg-[#1A1A1D]">
    <h1 class="text-[#F3F0F0] text-2xl font-bold">Sonofield Circle</h1>
</header>

<main class="flex-1 p-4 bg-[#1A1A1D] flex flex-col gap-8">
    <ControlPanel />
    <AppCircle />
</main>

<style>
    :global(body) {
        margin: 0;
        min-height: 100vh;
        background-color: #1A1A1D;
        display: flex;
        flex-direction: column;
    }
</style>
