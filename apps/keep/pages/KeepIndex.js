import NoteList from '../cmps/NoteList.js'
import SideNav from '../cmps/SideNav.js'
import EmptyNotes from '../cmps/EmptyNotes.js'
import { noteService } from './../../../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
import { showSuccessMsg, showErrorMsg, eventBus } from '../../../services/event-bus.service.js'
import AddNote from '../cmps/AddNote.js'
import NotesLoader from '../../../cmps/AppLoader.js'
import { notificationService } from '../../../services/sysNotification.service.js'




export default {
    name: 'KeepIndex',
    inject: ['defaultErrorMsg'],
    template: `
        <section class="note-index">
          <AddNote  @add-note="addNote"/>
           <EmptyNotes v-if="!totalNotes.length&&!isLoading" :hash="filterBy.hash"/>
           <NoteList @update-note="updateNote"
            v-if="pinnedNotes.length&&!isLoading" 
            title="Pinned" :notes="pinnedNotes"/>
           <NoteList  @update-note="updateNote" 
           v-if="notes.length&&!isLoading" 
           title="Other" :notes="notes"/>
           <RouterView/>
           <SideNav/>
        </section>
    `,
    data() {
        return {
            notes: [],
            pinnedNotes: [],
            totalNotes: [],
            filterBy: {},
            isLoading: true
        }
    },
    created() {
        utilService.setAppConfig('keep')
        eventBus.on('add-note-alarm', this.addNoteAlarm)
        eventBus.on('note-filter', this.setFilter)
        this.loadNots()
        this.reminderInterval = setInterval(this.checkReminder, 5000)
    },
    computed: {

    },
    watch: {
        $route(val, oldVal) {
            oldVal.name === 'note-details' && this.loadNots()
        },
        '$route.hash': {
            deep: true,
            immediate: true,
            handler: function (val, oldVal) {
                this.filterBy.hash = val || '#home'
                if (val === '#add') {
                    this.addMailAsNote(this.$route.query)
                    return
                }
                this.loadNots()
            }
        },
    },

    methods: {
        async addMailAsNote(noteInfo) {
            const note = noteService.getEmptyNote('NoteMail')
            note.title = noteInfo.subject
            note.info.content = noteInfo.body
            await noteService.save({ ...note }).catch(err => {
                console.error('♠️ ~ file: KeepIndex.js:67 ~ addMailAsNote ~ err:', err)
                showSuccessMsg(this.defaultErrorMsg)
            })
            this.$router.push('/note#home')

            console.debug('♠️ ~ file: KeepIndex.js:67 ~ addMailAsNote ~ noteInfo:', noteInfo)

        },
        setFilter(filter) {
            this.filterBy = filter
            this.loadNots()
        },
        updateNote({ noteId, actionType, payload }) {
            console.log('keep index update:', noteId, actionType, payload)
            if (actionType === 'update-title') {
                this.updateNoteByKey(noteId, 'title', payload)
            }
            if (actionType === 'update-content') {
                this.updateNoteByKey(noteId, 'info', payload)
            }
            if (actionType === 'color-select') {
                this.updateNoteByKey(noteId, 'style', { backgroundColor: payload })
            }
            if (actionType === 'cover-select') {
                this.updateNoteByKey(noteId, 'style', { cover: payload })
            }
            if (actionType === 'toggle-pin') {
                this.updateNoteByKey(noteId, 'isPinned', payload)
            }
            if (actionType === 'archive') {
                this.updateNoteByKey(noteId, 'archivedAt', Date.now())
            }
            if (actionType === 'delete') {
                noteService.remove(noteId).then(() => {
                    showSuccessMsg('Note has been removed')
                    this.loadNots()
                }).catch(err => {
                    console.error('♠️ ~ file: KeepIndex.js:89 ~ noteService.remove ~ err:', err)
                    showSuccessMsg(this.defaultErrorMsg)
                })
            }
            if (actionType === 'duplicate') {
                noteService.get(noteId).then(note => {
                    delete note.id
                    noteService.save(note).then(() => {
                        showSuccessMsg('Note duplicated')
                        this.loadNots()
                    }).catch(err => {
                        console.error('♠️ ~ file: KeepIndex.js:97 ~ noteService.save ~ err:', err)
                        showSuccessMsg(this.defaultErrorMsg)
                    })
                }).catch(err => {
                    console.error('♠️ ~ file: KeepIndex.js:101 ~ noteService.get ~ err:', err)
                    showSuccessMsg(this.defaultErrorMsg)
                })
            }
            if (actionType === 'alert') {

                eventBus.emit('show-modal', { modalType: 'AlertModal', data: noteId })
            }
            if (actionType === 'archive') {
                this.updateNoteByKey(noteId, 'archivedAt', Date.now())
            }
            if (actionType === 'share') {
                noteService.get(noteId).then(note => {
                    this.$router.push(`/mail?tab=inbox&compose=new&subject=${note.title}&body=${note.info.content}`)
                })
            }


        },
        updateNoteByKey(noteId, key, payload) {
            noteService.get(noteId).then(note => {
                note.updatedAt = Date.now()
                note[key] = payload
                noteService.save(note)
                    .then((note) => {
                        this.loadNots()
                    }).catch(err => {
                        console.error('♠️ ~ file: KeepIndex.js:119 ~ updateNoteByKey noteService.save ~ err:', err)
                        showSuccessMsg(this.defaultErrorMsg)
                    })
            })
        },
        addNoteAlarm({ noteId, reminder }) {
            console.log('addNoteAlarm', noteId, reminder)
            noteService.get(noteId).then(note => {
                note.reminder = reminder
                noteService.save(note).then((note) => {
                    console.log('note:', note)
                    console.debug('♠️ ~ file: NoteDetails.js:62 ~ noteService.save ~ note:', note)
                    this.loadNots()
                })
            })

        },
        addNote(note) {
            noteService.save(note)
                .then((note) => {
                    showSuccessMsg('Note added')
                }).catch(err => {
                    console.error('♠️ ~ file: KeepIndex.js:148 ~ addNote ~ err:', err)
                    showErrorMsg(this.defaultErrorMsg)
                }).finally(() => {
                    this.loadNots()
                })
        },
        loadNots() {
            eventBus.emit('loading', true)
            noteService.query({ ...this.filterBy }).then(notes => {
                this.totalNotes = notes
                this.pinnedNotes = notes.filter(note => note.isPinned)
                this.notes = notes.filter(note => !note.isPinned)
                this.isLoading = false
                eventBus.emit('loading', false)

            }).catch(err => {
                console.debug('♠️ ~ file: KeepIndex.js:162 ~loadNots noteService.query ~ err:', err)
                showSuccessMsg(this.defaultErrorMsg)
            })
        },
        checkReminder() {
            this.totalNotes.filter(note => note.reminder).forEach(note => {
                if (Date.now() > new Date(note.reminder)) {
                    note.reminder = null
                    noteService.save(note).then(() => {
                        notificationService.notifyUser(`Reminder: ${note.title}`, 'keep')
                        this.$router.push(`/note/${note.id}`)

                    })
                }
            })
        }
    },
    components: {
        NoteList,
        SideNav,
        AddNote,
        EmptyNotes,
        NotesLoader
    },
    unmounted() {
        clearInterval(this.reminderInterval)
    }
}
