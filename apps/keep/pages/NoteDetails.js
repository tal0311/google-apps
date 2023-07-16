import NoteActions from "../cmps/AddNoteActions.js"
import ColorList from "../cmps/ColorList.js"
import { noteService } from './../../../services/note.service.js'
import NoteAudio from "../cmps/daynamicCmps/NoteAudio.js"
import NoteCanvas from "../cmps/daynamicCmps/NoteCanvas.js"
import NoteImg from "../cmps/daynamicCmps/NoteImg.js"
import NoteMap from "../cmps/daynamicCmps/NoteMap.js"
import NoteTodo from "../cmps/daynamicCmps/NoteTodo.js"
import NoteTxt from "../cmps/daynamicCmps/NoteTxt.js"
import NoteVideo from "../cmps/daynamicCmps/NoteVideo.js"
import { utilService } from "../../../services/util.service.js"
import { eventBus, showErrorMsg } from "../../../services/event-bus.service.js"



// import { carService } from '../services/car.service.js'


export default {
    name: 'NoteDetails',
    inject: ['defaultErrorMsg'],
    template: `
        <dialog ref="details-modal" class="note-details-modal" >
            <section ref="note-details" :style="setNoteBG" v-if="note" class="note-details grid">
            <i @click="noteAction('toggle-pin', !note.isPinned)" :class="['pin-btn material-symbols-outlined', note.isPinned? 'pinned':'']">push_pin</i>
            
            <h3 class="editable-title" v-if="!displayUpperHeader" contenteditable="true" 
                @blur="noteAction('update-title',$event.target.innerText)">{{note.title}}
            </h3>
            
            <div class="preview-content grid">
                    <component @updateInfo="updateNoteInfo" :is="note.type" :info="note.info" isDetails="true"/>
                    <small class="update-at" v-if="note.updatedAt">
                        {{getTime(note.updatedAt).date}}
                        {{getTime(note.updatedAt).time}}
                    </small>
            </div>
          <h3 class="editable-title" v-if="displayUpperHeader" contenteditable="true" 
          @blur="noteAction('update-title',$event.target.innerText)">{{note.title}}</h3>
          <div class="actions-container grid">
              <NoteActions @note-action="noteAction" visibleStatus="3"/>
              <button @click=$router.go(-1) class="app-btn">close</button>
          </div>
         <ColorList ref="style-list" :noteDimensions="noteDimensions" v-if="isPaletteOpen" @color-selected="noteAction('color-select', $event)"
          @cover-selected="noteAction('cover-select', $event)" />
        </section>
        </dialog>
    `,
    created() {
        this.loadNote()
    },
    data() {
        return {
            note: null,
            isPaletteOpen: false,
            noteDimensions: null
        }
    },
    mounted() {
        this.openModal()
    },

    methods: {
        getTime(ts) {
            return utilService.getFormattedTime(ts)
        },
        loadNote() {
            const noteId = this.$route.params.id
            noteService.get(noteId)
                .then(note => {
                    this.note = note
                }).catch(err => {
                    console.error('♠️ ~ file: NoteDetails.js:73 ~ loadNote ~ err:', err)
                    showErrorMsg(this.defaultErrorMsg)

                })
        },
        updateNoteInfo({ info }) {
            noteService.get(this.note.id).then(note => {
                note.info = info
                noteService.save(note).then((note) => {
                    this.loadNote()
                }).catch(err => {
                    console.error('♠️ ~ file: NoteDetails.js:84 ~ noteService.save ~ err:', err)
                    showErrorMsg(this.defaultErrorMsg)
                })
            }).catch(err => {
                console.error('♠️ ~ file: NoteDetails.js:88 ~ noteService.get ~ err:', err)
                showErrorMsg(this.defaultErrorMsg)
            })

        },

        noteAction(actionType, payload = null) {
            console.debug('♠️ ~ file: NoteDetails.js:72 ~ noteAction ~ actionType, payload :', actionType, payload)

            if (actionType === 'update-title') {
                this.updateNote('title', payload)
            }

            if (actionType === 'color') {
                this.isPaletteOpen = !this.isPaletteOpen
                const { top, height } = this.$refs['note-details'].getBoundingClientRect()
                this.noteDimensions = { top: top, height }
            }

            if (actionType === 'color-select') {
                this.updateNote('style', { backgroundColor: payload })
            }

            if (actionType === 'cover-select') {
                debugger
                this.isPaletteOpen = false
                console.log('cover selected:', payload)
                this.updateNote('style', { cover: payload })
            }

            if (actionType === 'toggle-pin') {
                this.updateNote('isPinned', payload)
            }

            if (actionType === 'delete') {
                noteService.remove(this.note.id).then(() => {
                    this.closeModal()
                    this.$router.push('/note#home')
                })
            }
            if (actionType === 'alert') {
                eventBus.emit('show-modal', { modalType: 'AlertModal', data: this.note.id })
            }

            if (actionType === 'duplicate') {
                noteService.get(this.note.id).then(note => {
                    delete note.id
                    noteService.save(note).then(() => {
                        this.closeModal()
                        this.$router.push('/note#home')
                    }).catch(err => {
                        console.error('♠️ ~ file: NoteDetails.js:139 ~ noteAction noteService.save ~ err:', err)
                        showErrorMsg(this.defaultErrorMsg)
                    })
                }).catch(err => {
                    console.debug('♠️ ~ file: NoteDetails.js:143 ~ noteAction noteService.get ~ err:', err)
                    showErrorMsg(this.defaultErrorMsg)
                })
            }

        },
        updateNote(key, payload) {
            noteService.get(this.note.id).then(note => {
                note[key] = payload
                noteService.save(note).then((note) => {
                    console.debug('♠️ ~ file: NoteDetails.js:156 ~ updateNote noteService.save ~ then:', then)

                    this.loadNote()
                })
            })
        },
        openModal() {
            this.$refs['details-modal'].showModal()
            document.body.classList.toggle('modal-open')
        },
        closeModal() {
            this.$refs['details-modal'].close()
            document.body.classList.toggle('modal-open')
        }
    },
    computed: {
        setNoteBG() {
            if (this.note?.style?.backgroundColor) {
                return { background: this.note.style.backgroundColor }
            }
            if (this.note?.style?.cover) {
                return { background: `url(${this.note.style.cover}) `, backgroundSize: 'cover' }
            }
            return { backgroundColor: '#fff' }
        },
        displayUpperHeader() {
            const notsOptions = ['NoteImg', 'NoteVideo', 'NoteMap', 'NoteCanvas']
            return notsOptions.includes(this.note.type)
        }
    },
    components: {
        NoteActions,
        ColorList,
        NoteAudio,
        NoteCanvas,
        NoteImg,
        NoteMap,
        NoteTodo,
        NoteTxt,
        NoteVideo,
    }

}
