<script>
    import { project, openFile, contextMenuRightClick } from '../stores';
    import {getIcon} from "../utils/icons";

    export let files;

</script>

{#each files.filter(x => x.name !== '.gitkeep') as projectFile}
    {#if projectFile.id === $project.selectedFile}
        <figure on:contextmenu|preventDefault={e => contextMenuRightClick(e, projectFile)} class="cursor-default text-xs text-fontHighlight"><i class="fa-solid {getIcon(projectFile.name)}"></i> {projectFile.name}</figure>
    {:else}
        <figure on:contextmenu|preventDefault={e => contextMenuRightClick(e, projectFile)} on:click={() => openFile(projectFile.id)} class="cursor-pointer text-xs hover:text-fontHighlight"><i class="text-fontHighlight fa-light {getIcon(projectFile.name)}"></i> {projectFile.name}</figure>
    {/if}
{/each}
