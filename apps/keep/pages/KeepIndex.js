import NoteList from '../cmps/NoteList.js'
import SideNav from '../cmps/SideNav.js'
import { noteService } from './../../../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
import { showSuccessMsg, showErrorMsg, eventBus } from '../../../services/event-bus.service.js'
import AddNote from '../cmps/AddNote.js'





export default {
    template: `
        <section class="note-index">
           <AddNote  @add-note="addNote"/>
           <NoteList @update-note="updateNote" v-if="pinnedNotes" title="Pinned" :notes="pinnedNotes"/>
           <NoteList  @update-note="updateNote" v-if="notes" title="Other" :notes="notes"/>
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
                console.debug('♠️ ~ file: KeepIndex.js:49 ~ val, oldVal:', val)
                this.filterBy.hash = val || '#home'
                this.loadNots()

            }
        },
    },

    methods: {
        setFilter(filter) {
            console.debug('♠️ ~ file: KeepIndex.js:49 ~ setFilter ~ filter:', filter)
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
                    showSuccessMsg('Note removed')
                    this.loadNots()
                })
            }
            if (actionType === 'duplicate') {
                noteService.get(noteId).then(note => {
                    delete note.id
                    noteService.save(note).then(() => {
                        showSuccessMsg('Note duplicated')
                        this.loadNots()
                    })
                })
            }
            if (actionType === 'alert') {

                eventBus.emit('show-modal', { modalType: 'AlertModal', data: noteId })
            }
            if (actionType === 'archive') {
                this.updateNoteByKey(noteId, 'archivedAt', Date.now())
            }


        },
        updateNoteByKey(noteId, key, payload) {
            noteService.get(noteId).then(note => {
                note.updatedAt = Date.now()
                note[key] = payload
                noteService.save(note).then((note) => {
                    console.debug('♠️ ~ file: NoteDetails.js:62 ~ noteService.save ~ note:', note)
                    this.loadNots()
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
            console.debug('♠️ ~ file: KeepIndex.js:39 ~ addNote ~ note:', note)

            noteService.save(note)
                .then((note) => {
                    showSuccessMsg('Note added')
                }).catch(err => {
                    console.debug('♠️ ~ file: KeepIndex.js:43 ~ .then ~ err:', err)
                    showErrorMsg('Cannot add note')
                }).finally(() => {
                    this.loadNots()
                })
        },
        loadNots() {
            noteService.query({ ...this.filterBy }).then(notes => {
                this.totalNotes = notes
                this.pinnedNotes = notes.filter(note => note.isPinned)
                this.notes = notes.filter(note => !note.isPinned)
            })
        },
        checkReminder() {
            this.totalNotes.filter(note => note.reminder).forEach(note => {
                if (Date.now() > new Date(note.reminder)) {
                    note.reminder = null
                    noteService.save(note).then(() => {
                        this.$router.push(`/note/${note.id}`)
                        showSuccessMsg('Reminder!')
                    })
                }
            })







        }

        // removeCar(carId) {
        //     carService.remove(carId)
        //         .then(() => {
        //             const idx = this.cars.findIndex(car => car.id === carId)
        //             this.cars.splice(idx, 1)
        //             showSuccessMsg('Car removed')
        //         })
        //         .catch(err => {
        //             showErrorMsg('Cannot remove car')
        //         })
        // },

        // setFilterBy(filterBy) {
        //     this.filterBy = filterBy
        // }
    },
    components: {
        NoteList,
        SideNav,
        AddNote
        // CarFilter,
        // CarList,
    },
    unmounted() {
        clearInterval(this.reminderInterval)
    }
}
