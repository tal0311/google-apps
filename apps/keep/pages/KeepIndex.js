import NoteList from '../cmps/NoteList.js'
import SideNav from '../cmps/SideNav.js'
import EmptyNotes from '../cmps/EmptyNotes.js'
import AddNote from '../cmps/AddNote.js'
import NotesLoader from '../../../cmps/AppLoader.js'
import SpeechControllers from '../../../cmps/SpeechControllers.js'
import { speechService } from '../../../services/textToSpeech.service.js'
import { noteService } from './../../../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
import { showSuccessMsg, showErrorMsg, eventBus } from '../../../services/event-bus.service.js'
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
           <SpeechControllers v-if="isSpeechOn" />
          
        </section>
    `,
    data() {
        return {
            notes: [],
            pinnedNotes: [],
            totalNotes: [],
            filterBy: {},
            isLoading: true,
            isSpeechOn: false,
            subScriptions: [],
        }
    },
    created() {
        this.subScriptions[0] = eventBus.on('add-note-alarm', this.addNoteAlarm)
        this.subScriptions[1] = eventBus.on('note-filter', this.setFilter)
        this.subScriptions[2] = eventBus.on('speech', this.setSpeechStatus)

        this.loadNots()
        this.reminderInterval = setInterval(this.checkReminder, 5000)
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

        setSpeechStatus(val) {
            this.isSpeechOn = val
        },
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
        async updateNote({ noteId, actionType, payload }) {
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
                await noteService.remove(noteId).catch(err => {
                    showSuccessMsg(this.defaultErrorMsg)
                    throw '♠️ ~ file: KeepIndex.js:118 ~ updateNote noteService.remove ~ err:', err
                })
                showSuccessMsg('Note has been removed')
                this.loadNots()

            }
            if (actionType === 'duplicate') {
                const note = await noteService.get(noteId).catch(err => {
                    showSuccessMsg(this.defaultErrorMsg)
                    throw '♠️ ~ file: KeepIndex.js:126 ~ note ~ err: ' + err
                })
                delete note.id
                await noteService.save(note).catch(err => {
                    showSuccessMsg(this.defaultErrorMsg)
                    throw '♠️ ~ file: KeepIndex.js:131 ~ updateNote noteService.save ~ err: ' + err
                })
                showSuccessMsg('Note duplicated')
                this.loadNots()


            }
            if (actionType === 'alert') {

                eventBus.emit('show-modal', { modalType: 'AlertModal', data: noteId })
            }
            if (actionType === 'archive') {
                this.updateNoteByKey(noteId, 'archivedAt', Date.now())
            }
            if (actionType === 'share') {
                const note = await noteService.get(noteId).catch(err => {
                    showSuccessMsg(this.defaultErrorMsg)
                    throw '♠️ ~ file: KeepIndex.js:148 ~ note ~ err: ' + err
                })
                this.$router.push(`/mail?tab=inbox&compose=new&subject=${note.title}&body=${note.info.content}`)


            }
            if (actionType === 'speech') {
                var notesToSpeech = ['NoteMail', 'NoteTxt']
                const note = await noteService.get(noteId).catch(err => {
                    showSuccessMsg(this.defaultErrorMsg)
                    throw '♠️ ~ file: KeepIndex.js:158 ~ note ~ err: ' + err
                })
                note.title && speechService.speak(note.title)
                if (notesToSpeech.includes(note.type)) {
                    speechService.speak(note.info.content)
                }
            }


        },
        async updateNoteByKey(noteId, key, payload) {
            const note = await noteService.get(noteId).catch(err => { })
            note.updatedAt = Date.now()
            note[key] = payload
            await noteService.save(note).catch(err => {
                showSuccessMsg(this.defaultErrorMsg)
                throw '♠️ ~ file: KeepIndex.js:174 ~ updateNote await noteService.save ~ err: ' + err
            })
            this.loadNots()
        },
        async addNoteAlarm({ noteId, reminder }) {
            const note = await noteService.get(noteId).catch(err => {
                showSuccessMsg(this.defaultErrorMsg)
                throw '♠️ ~ file: KeepIndex.js:182 ~ addNoteAlarm ~ err:', err
            })
            note.reminder = reminder
            await noteService.save(note).catch(err => {
                showSuccessMsg(this.defaultErrorMsg)
                throw '♠️ ~ file: KeepIndex.js:186 ~ addNoteAlarm await noteService.save ~ err: ' + err
            })
            this.loadNots()


        },
        async addNote(note) {
            try {
                await noteService.save(note)
                showSuccessMsg('Note added')
            } catch (error) {
                showErrorMsg(this.defaultErrorMsg)
                throw '♠️ ~ file: KeepIndex.js:199 ~ addNote ~ error:', error
            }
            finally {
                this.loadNots()
            }
        },
        async loadNots() {
            eventBus.emit('loading', true)
            const notes = await noteService.query({ ...this.filterBy }).catch(err => {
                showSuccessMsg(this.defaultErrorMsg)
                throw '♠️ ~ file: KeepIndex.js:208 ~ loadNots ~ err: ' + err
            })
            this.totalNotes = notes
            this.pinnedNotes = notes.filter(note => note.isPinned)
            this.notes = notes.filter(note => !note.isPinned)
            this.isLoading = false
            eventBus.emit('loading', false)

        },
        async checkReminder() {
            const notesWithReminder = this.totalNotes.filter(note => note.reminder);

            for (const note of notesWithReminder) {
                if (Date.now() > new Date(note.reminder)) {
                    note.reminder = null;
                    await noteService.save(note).catch(err => {
                        showSuccessMsg(this.defaultErrorMsg)
                        throw '♠️ ~ file: KeepIndex.js:226 ~ checkReminder await noteService.save ~ err:', err
                    })
                    notificationService.notifyUser(`Reminder: ${note.title}`, 'keep')
                    this.$router.push(`/note/${note.id}`)
                }
            }
        }

    },
    components: {
        NoteList,
        SideNav,
        AddNote,
        EmptyNotes,
        NotesLoader,
        SpeechControllers
    },
    unmounted() {
        clearInterval(this.reminderInterval)
        this.subScriptions.forEach(unSubscribe => unSubscribe())
    }
}
