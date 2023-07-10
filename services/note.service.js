import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const NOTE_KEY = 'note_db'

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
}
window.noteService = noteService

function query() {
    return storageService.query(NOTE_KEY).then(note => {
        // if (gFilterBy.txt) {
        //     const regex = new RegExp(gFilterBy.txt, 'i')
        //     note = note.filter(note => regex.test(note.vendor))
        // }
        // if (gFilterBy.minSpeed) {
        //     note = note.filter(note => note.maxSpeed >= gFilterBy.minSpeed)
        // }
        // if (gPageIdx !== undefined) {
        //     const startIdx = gPageIdx * PAGE_SIZE
        //     note = note.slice(startIdx, startIdx + PAGE_SIZE)
        // }
        // if (gSortBy.maxSpeed !== undefined) {
        //     note.sort(
        //         (c1, c2) => (c1.maxSpeed - c2.maxSpeed) * gSortBy.maxSpeed
        //     )
        // } else if (gSortBy.vendor !== undefined) {
        //     note.sort(
        //         (c1, c2) => c1.vendor.localeCompare(c2.vendor) * gSortBy.vendor
        //     )
        // }

        return note
    })
}

function get(noteId) {
    return storageService.getById(NOTE_KEY, noteId)

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

function getEmptyNote(type, isPinned = false, style = { backgroundColor: '#00d' }) {
    return {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type,
        isPinned,
        style,
        info: _getInfoByType(type)
    }
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


function _getInfoByType(type) {
    if (type === 'NoteTxt') return { txt: '', title: '' }
    if (type === 'NoteImg' || type === 'NoteVid') return { url: '', title: '' }
    if (type === 'NoteVideo') return { title: '', url: '' }
    if (type === 'NoteTodo') return { title: '', todos: [] }
    if (type === 'NoteMap') return { title: '', loc: {} }
    if (type === 'NoteCanvas') return { title: '', base64url: '' }
    if (type === 'NoteAudio') return { title: '', url: '' }
    if (type === 'NoteMail') return { title: '', body: '' }

}
