import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const PAGE_SIZE = 5
const NOTE_KEY = 'note_db'

var gFilterBy = { txt: '', minSpeed: 0 }
var gSortBy = { vendor: 1 }
var gPageIdx

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getNextNoteId,
    getFilterBy,
    setFilterBy,
    getNoteCountBySpeedMap,
}
window.noteService = noteService

function query() {
    return storageService.query(NOTE_KEY).then(note => {
        if (gFilterBy.txt) {
            const regex = new RegExp(gFilterBy.txt, 'i')
            note = note.filter(note => regex.test(note.vendor))
        }
        if (gFilterBy.minSpeed) {
            note = note.filter(note => note.maxSpeed >= gFilterBy.minSpeed)
        }
        if (gPageIdx !== undefined) {
            const startIdx = gPageIdx * PAGE_SIZE
            note = note.slice(startIdx, startIdx + PAGE_SIZE)
        }
        if (gSortBy.maxSpeed !== undefined) {
            note.sort(
                (c1, c2) => (c1.maxSpeed - c2.maxSpeed) * gSortBy.maxSpeed
            )
        } else if (gSortBy.vendor !== undefined) {
            note.sort(
                (c1, c2) => c1.vendor.localeCompare(c2.vendor) * gSortBy.vendor
            )
        }

        return note
    })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => _setNextPrevNoteId(note))
}

function _setNextPrevNoteId(note) {
    return storageService.query(NOTE_KEY)
        .then(note => {
            const noteIdx = note.findIndex(currNote => currNote.id === note.id)
            note.nextNoteId = note[noteIdx + 1] ? note[noteIdx + 1].id : note[0].id
            note.prevNoteId = note[noteIdx - 1]
                ? note[noteIdx - 1].id
                : note[note.length - 1].id
            return note
        })
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(vendor = '', maxSpeed = 0) {
    return { id: '', vendor, maxSpeed }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function getNextNoteId(noteId) {
    return storageService.query(NOTE_KEY).then(note => {
        var idx = note.findIndex(note => note.id === noteId)
        if (idx === note.length - 1) idx = -1
        return note[idx + 1].id
    })
}


function _createNotes() {
    let note = utilService.loadFromStorage(NOTE_KEY)
    if (!note || !note.length) {
        note = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'http://some-img/me',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#00d'
                }
            },
            {
                id: 'n103',
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            }

        ]

        utilService.saveToStorage(NOTE_KEY, note)
    }
}

function _createNote(vendor, maxSpeed = 250) {
    const note = getEmptyNote(vendor, maxSpeed)
    note.id = utilService.makeId()
    return note
}
