import {writable} from "svelte/store";
import type {Writable} from "svelte/store";


export const THEMES = {
    VSCODE_DARK: "vs-dark",
    VSCODE_LIGHT: "vs-light",
}
// get theme from local storage
// if not found, use default theme
export const theme:Writable<string> = writable(localStorage.getItem("theme") || THEMES.VSCODE_DARK);
