import { writable } from 'svelte/store';

export const user_storage = writable({ loggedIn: false });