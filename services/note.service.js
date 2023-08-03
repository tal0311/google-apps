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

async function query(filterBy = { txt: '', hash: '#home' }) {
    let notes = await storageService.query(NOTE_KEY)

    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        notes = notes.filter(note => regex.test(note.title) || regex.test(note.info.content))
    }
    if (filterBy.hash === '#reminder') notes = notes.filter(note => note.reminder)
    if (filterBy.hash === '#archive') notes = notes.filter(note => note.archivedAt)
    if (filterBy.hash === '#trash') notes = notes.filter(note => note.removedAt)
    return notes
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

function getEmptyNote(type, title, isPinned = false, style = { backgroundColor: '#fff' }) {
    return {

        createdAt: Date.now(),
        title,
        type,
        isPinned,
        style,
        info: _getInfoByType(type),
        updatedAt: Date.now()
    }
}


function _createNotes() {
    let note = utilService.loadFromStorage(NOTE_KEY)
    if (!note || !note.length) {
        note = [
            {
                id: utilService.makeId(),
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: false,
                title: utilService.makeLorem(10),
                reminder: '07/15/2023 12:13',
                style: {
                    backgroundColor: '#fff475'
                },
                info: {
                    content: utilService.makeLorem(40)
                }
            },
            {
                id: utilService.makeId(),
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: false,
                title: utilService.makeLorem(10),
                style: {
                    backgroundColor: '#aecbfa'
                },
                info: {
                    content: utilService.makeLorem(40)
                }
            },
            {
                id: utilService.makeId(),
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                title: 'fullstack both sides',
                style: {
                    backgroundColor: '#fff'
                },
                info: {
                    content: 'Fullstack Me Baby!'
                }
            },
            {
                id: utilService.makeId(),
                type: 'NoteImg',
                isPinned: false,
                title: 'Desert',
                info: {
                    content: 'https://images.unsplash.com/photo-1682685797498-3bad2c6e161a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
                },
                style: {
                    backgroundColor: '#fff'
                }
            },
            {
                id: utilService.makeId(),
                type: 'NoteVideo',
                isPinned: false,
                title: 'Vue is better than React',
                info: {
                    content: 'https://www.youtube.com/embed?v=nhBVL41-_Cw',
                },
                style: {
                    backgroundColor: '#fff'
                }
            },
            {
                id: utilService.makeId(),
                type: 'NoteTodo',
                isPinned: false,
                title: 'Get my stuff together',
                style: {
                    backgroundColor: '#fff'
                },
                info: {
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
    const contentNotes = ['NoteTxt', 'NoteImg', 'NoteVid', 'NoteVideo', 'NoteCanvas', 'NoteAudio', 'NoteMail']
    if (contentNotes.includes(type)) return { content: '' }
    if (type === 'NoteTodo') return { todos: [] }
    if (type === 'NoteMap') return { pos: {} }


}
