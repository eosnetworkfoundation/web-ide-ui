<script lang="ts">
    import {
        sidebarWidth,
        project,
        openFile,
        editor
    } from "../stores";
    import {tick} from "svelte";

    let searchTerm = "";
    let results = [];

    const searchFiles = () => {
        const term = searchTerm.trim().toLowerCase();
        results = [];
        $project.files.map(file => {
            if (file.name.toLowerCase().includes(term)) {
                results.push({
                    name: file.name,
                    result: file.path + file.name,
                    id:file.id
                });
            }
            if(file.content.toLowerCase().includes(term)) {
                results.push({
                    name: file.name,
                    result: file.content.substring(file.content.toLowerCase().indexOf(term), file.content.toLowerCase().indexOf(term) + 100),
                    id:file.id
                });
            }
        });
    };

    const openInEditor = async (result) => {
        openFile(result.id);
        await tick();
        let found:any = $editor.getModel().findMatches(searchTerm, true, false, false, null, true);

        // Likely just a filename
        if(found.length === 0) return;

        found = found[0];
        $editor.focus();
        $editor.revealLine(found.range.startLineNumber);
        $editor.setPosition({ lineNumber: found.range.startLineNumber, column: found.range.startColumn});
        $editor.setSelection(found.range);
    }
</script>

<aside class="flex flex-col bg-sidebarBg text-fontColor cursor-default" style="min-width:{$sidebarWidth}px">
    <section class="flex flex-col flex-1">
        <figure class="text-xs font-medium opacity-30 p-5 pb-1">SEARCH</figure>
        <section class="flex-none p-5 pt-0">
            <section class="pt-4">
                <figure class="tiny-label text-fontColor">SEARCH TERM</figure>
                <input on:input={() => searchFiles()} class="text-xs text-fontColor rounded bg-inputBg border-inputBorder border py-1 px-2 w-full mt-1" placeholder="Enter term to search" bind:value={searchTerm} />
            </section>
        </section>

        <section class="flex-1 overflow-y-auto">
            <figure class="h-px bg-fileBarUnselected my-2"></figure>
            <figure class="text-xs font-medium opacity-30 p-5 pt-3 pb-1">SEARCH RESULTS</figure>
            <section class="p-5 pt-0 mt-3">
                {#if results.length === 0}
                    <figure class="text-xs text-center opacity-40">No references found</figure>
                {:else}
                    {#each results as result}
                        <section on:click={() => openInEditor(result)} class="flex flex-col mb-3 cursor-pointer hover:text-fontHighlight">
                            <figure class="text-xs font-medium">{result.name}</figure>
                            <figure class="tiny-label text-fontColor opacity-70">{result.result}</figure>
                        </section>
                    {/each}
                {/if}
            </section>
        </section>
    </section>
</aside>
