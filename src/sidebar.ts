import {writable} from 'svelte/store';
import type {Writable} from 'svelte/store';

export const SIDEBAR_STATES = {
    NONE: -1,
    EXPLORER:0,
    SEARCH:1,
    DEPLOY:2,
    SETTINGS:3,
}

export const sidebarState:Writable<number> = writable(SIDEBAR_STATES.EXPLORER);
