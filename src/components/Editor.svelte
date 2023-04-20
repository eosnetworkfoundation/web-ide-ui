<script lang="ts">
    import type monaco from 'monaco-editor';
    import {onMount, tick} from 'svelte';
    import debounce from 'debounce';
    import ApiService from "../services/Api.service";
    import {project, saving, editor} from "../stores";
    import {sidebarState} from "../sidebar";
    import {autocompletions} from "../data/autocompletions";
    import {theme} from "../theme";

    export let divEl: HTMLDivElement = null;

    let value:string = "";

    let Monaco;

    sidebarState.subscribe(async state => {
        if(!$editor) return;
        await tick();
        $editor.layout();
    });

    addEventListener("resize", async (event) => {
        $editor.layout();
    });

    const debounceSave = debounce((selectedFile:string) => {
        if(!$editor) return;

        project.update(p => {
            p.files.find(projectFile => projectFile.id === selectedFile).content = $editor.getValue();
            return p;
        });

        console.log('saving')
        ApiService.save($project);
    }, 500);

    if (!window.location.search.includes('id=')) {
        saving.set(true);
        debounceSave($project.selectedFile);
    }

    theme.subscribe(_theme => {
        if(!$editor) return;
        $editor._themeService.setTheme(_theme);
    });

    onMount(async () => {

        value = $project.files.find(projectFile => projectFile.id === $project.selectedFile).content;
        if($editor) $editor.setValue(value);

        // value = $project.files.find(projectFile => projectFile.id === file.id).content;
        Monaco = await import('monaco-editor');
        editor.set(Monaco.editor.create(divEl, {
            value,
            language: 'cpp',
            theme: $theme,
        }));

        $editor.getModel().onDidChangeContent(() => {
            let selectedFile = $project.selectedFile;
            if($project.files.find(projectFile => projectFile.id === selectedFile).content === $editor.getValue()) return;
            debounceSave(selectedFile);
        });

        Monaco.languages.registerCompletionItemProvider('cpp', {
            provideCompletionItems: (model, position) => {
                return { suggestions:autocompletions(Monaco) };
            }
        });



        return () => {
            $editor.dispose();
        };
    });
</script>

<div bind:this={divEl} class="h-full w-full" />

<style>

</style>
