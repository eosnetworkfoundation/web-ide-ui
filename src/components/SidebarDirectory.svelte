<script>
    import { project, contextMenuRightClick } from "../stores";
    import SidebarFiles from "./SidebarFiles.svelte";

    export let directoryTree;
    export let directory = null;
    export let depth = 0;

    let collapsed = depth > 0;
</script>
{#if directory}
    <figure on:contextmenu|preventDefault={e => contextMenuRightClick(e, directoryTree.files[0])} on:click={() => collapsed = !collapsed} class="cursor-pointer text-xs hover:text-fontHighlight font-bold">
        <i class="fa-solid {collapsed ? 'fa-folder' : 'fa-folder-open'}"></i> {directory}
    </figure>
{/if}

{#if !collapsed}
<section class="{depth > 0 ? 'ml-2' : ''}">
    <SidebarFiles files={directoryTree.files} />

    {#each Object.keys(directoryTree.directories).sort((a, b) => a.path > b.path ? 1 : -1) as subdir}
        <svelte:self depth={depth+1} directory={subdir} directoryTree={directoryTree.directories[subdir]} />
    {/each}
</section>
{/if}
