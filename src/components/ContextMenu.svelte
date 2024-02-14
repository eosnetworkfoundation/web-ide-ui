<script>
    import {contextMenu, createNewFolder, createNewFile, deleteFile, renameFile} from "../stores";

    export let menuItems = [
        { type:"item", name:"New File", function:createNewFile, icon:'fa-solid fa-file-circle-plus' },
        { type:"item", name:"New Folder", function:createNewFolder, icon:'fa-solid fa-folder-open' },
        { type:"divider" },
        { type: "item", name:"Delete", function:deleteFile, icon:'fa-solid fa-file-xmark' },
        { type: "item", name:"Rename", function:renameFile, icon:'fa-solid fa-file-signature' },
    ];


</script>

{#if $contextMenu}
    {#key $contextMenu}
        <section id="context-menu" style="left:{$contextMenu.x}px; top:{$contextMenu.y}px;" class="p-1 bg-contextMenuBg text-fontColor drop-shadow-xl z-30 absolute rounded">
            {#each menuItems as item}
                {#if item.type === "item"}
                    <div class="rounded p-2 px-4 hover:bg-contextMenuItemHover cursor-pointer text-xs" on:click={item.function}>
                        <i class="{item.icon} mr-2"></i> {item.name}
                    </div>
                {:else if item.type === "divider"}
                    <div class="my-1 border-t border-fileBarDivider border-contextMenuDivider"></div>
                {/if}
            {/each}
        </section>
    {/key}
{/if}

