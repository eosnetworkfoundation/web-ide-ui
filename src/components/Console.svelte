<script lang="ts">
    import {consoleText, consoleOpen} from '../stores';

    let consoleHeight = 300;

    const consoleDrag = (x) => {
        if(x.clientY === 0) return;
        consoleOpen.set(true);
        const newHeight = window.innerHeight - x.clientY;
        if(newHeight > window.innerHeight - 130) return;
        if(newHeight < 100) return;
        consoleHeight = newHeight;
    }

    const toggleConsole = () => {
        consoleOpen.set(!$consoleOpen)
    }

    const clearTerminal = () => {
        consoleText.set('');
    }
</script>

<section class="z-10 absolute w-full bottom-0 left-0 bg-codeBg">
    <figure draggable="true" on:drag={consoleDrag} on:click={toggleConsole}
            style="font-size: 9px;" class="bg-sidebarBg flex px-3 py-2 items-center cursor-pointer hover:bg-fileBarUnselected text-fontColor"><i class="fa-solid fa-terminal mr-3"></i> CONSOLE</figure>
    <section style="height:{consoleHeight}px;" class="text-xs text-fontColor p-5 {$consoleOpen ? '' : 'hidden'} overflow-y-auto">
        <pre class="console">{@html $consoleText}</pre>
        <figure on:click={clearTerminal} class="cursor-pointer absolute bottom-2 right-2 p-2 text-lg text-fontColor hover:text-fontHighlight">
            <i class="fa-regular fa-trash mr-3"></i>
        </figure>
    </section>
</section>

<style lang="scss">
  .console {
    font-family: 'Fira Code', monospace;
    line-height: 1.5;
  }
</style>
