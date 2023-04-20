<script>
    import { dialogBox } from "../stores";
    let value;

    dialogBox.subscribe(_box => {
        if(!_box) {
            value = null;
        }
    });

    const dialogKeyShortcuts = (e) => {
        if(!$dialogBox) return;
        if(e.key === "Enter") {
            $dialogBox.callback($dialogBox.placeholder ? value : true);
        }
        if(e.key === "Escape" ) {
            $dialogBox.callback(null);
        }
    };
</script>

<svelte:window on:keydown={dialogKeyShortcuts}/>
{#if $dialogBox}
    <section class="z-[100] fixed h-screen w-screen flex justify-center items-center">
        <figure class="fixed h-screen w-screen bg-black opacity-40 cursor-pointer"></figure>
        <section class="w-96 z-10 p-5 bg-contextMenuBg text-fontColor rounded drop-shadow-xl">
            <h1 class="text-lg">{$dialogBox.title}</h1>
            {#if $dialogBox.placeholder}
                <input style="border-width: 1px;" class="outline-0 w-full mt-4 p-2 rounded bg-contextMenuBg text-fontColor border-fontColor" type="text" bind:value placeholder={$dialogBox.placeholder} />
            {/if}
            {#if $dialogBox.error}
                <figure class="text-xs text-yellow-500 mt-2 font-bold">
                    {$dialogBox.error}
                </figure>
            {/if}
            <div class="flex justify-end mt-4">
                <button class="p-2 rounded bg-contextMenuBg text-fontColor" on:click={() => $dialogBox.callback(null)}>Cancel</button>
                <button class="ml-2 p-2 rounded bg-contextMenuBg text-fontColor" on:click={() => $dialogBox.callback($dialogBox.placeholder ? value : true)}>Accept</button>
            </div>
        </section>
    </section>
{/if}
