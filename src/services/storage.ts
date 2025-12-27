/// <reference types="chrome"/>
import type { Note } from '../types';

const STORAGE_KEY = 'advanced_notepad_notes';

export const storageService = {
    async getNotes(): Promise<Note[]> {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            return new Promise((resolve) => {
                chrome.storage.local.get([STORAGE_KEY], (result: { [key: string]: any }) => {
                    resolve(result[STORAGE_KEY] || []);
                });
            });
        } else {
            const notes = localStorage.getItem(STORAGE_KEY);
            return notes ? JSON.parse(notes) : [];
        }
    },

    async saveNotes(notes: Note[]): Promise<void> {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            return new Promise((resolve) => {
                chrome.storage.local.set({ [STORAGE_KEY]: notes }, () => {
                    resolve();
                });
            });
        } else {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        }
    }
};
