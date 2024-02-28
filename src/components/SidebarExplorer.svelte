<script lang="ts">
    import {
        project,
        sidebarWidth,
        building,
        saving,
        contextMenuRightClick,
        consoleText, consoleOpen
    } from '../stores';
    import SidebarDirectory from './SidebarDirectory.svelte';
    import ProjectFile from "../models/ProjectFile.model";
    import ApiService from "../services/Api.service";

    let directoriesTree = { files: [], directories: {} };
    let rootTree = { files: [], directories: {} };

    project.subscribe(async _project => {
        if(!$project) return;

        // Virtual tree of the project files
        directoriesTree = $project.files.reduce((acc, file:ProjectFile) => {
            const filePath = file.path.split('/').filter(x => x !== '');

            filePath.reduce((acc, path, index) => {
                if(!acc.directories[path]) {
                    acc.directories[path] = { files: [], directories: {} };
                }

                if(index === filePath.length - 1) {
                    acc.directories[path].files.push(file);
                }

                return acc.directories[path];
            }, acc);

            if(filePath.length === 0) {
                acc.files.push(file);
                return acc;
            }

            return acc;
        }, { files: [], directories: {} });

        rootTree = { files: directoriesTree.files, directories: {} };
        directoriesTree.files = [];
    })

    const buildProject = async () => {
        if($building || $saving) return;
        consoleText.set("");
        consoleOpen.set(true);
        ApiService.build($project);
    }
</script>

<aside on:contextmenu|preventDefault={e => contextMenuRightClick(e, rootTree.files[0])} id="sidebar" class="flex flex-col bg-sidebarBg h-full text-fontColor cursor-default" style="min-width:{$sidebarWidth}px">
    <!-- FILE EXPLORER -->
    <figure class="text-xs font-medium opacity-30 p-5 pb-1 truncate max-w-[300px]">{$project.name.toUpperCase()}</figure>
    <section class="flex-auto overflow-y-auto p-5 pt-0">
        <section id="project" class="pt-4">
            <SidebarDirectory directoryTree={directoriesTree} />
            <SidebarDirectory directoryTree={rootTree} />
        </section>
    </section>

    <!-- ACTIONS -->
    <section class="flex flex-0 flex-col space-y-1 p-3 bg-fileBarUnselected">
        <figure on:click={buildProject} class="select-none rounded text-xs border-2 border-fontColor flex justify-start px-3 py-2 items-center
          {!$saving && !$building ? 'cursor-pointer' : ''}
          {$saving ? 'opacity-30' : ''} {$building ? 'opacity-30 cursor-not-allowed animate-pulse text-fontHighlight border-fontHighlight' : ''}
          hover:border-fontHighlight hover:text-fontHighlight active:bg-fontColor
          active:border-fontColor active:text-fontColorInverted"><i class="fa-solid fa-screwdriver-wrench mr-3"></i> {$building ? 'BUILDING' : 'BUILD' }</figure>
    </section>
</aside>
