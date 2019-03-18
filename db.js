'use strict';

export function initEntries() {
    localStorage.entries = localStorage.entries || '{}';
}

export function clearEntries() {
    localStorage.entries = '{}';
}

export function getEntries() {
    return JSON.parse(localStorage.entries);
}

export function addEntry(entry) {
    var entries = getEntries();
    entries[entry.name] = entry;
    localStorage.entries = JSON.stringify(entries);
}