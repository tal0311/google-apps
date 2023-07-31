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
import NoteMail from "../cmps/daynamicCmps/NoteMail.js"

import { utilService } from "../../../services/util.service.js"
import { eventBus, showErrorMsg } from "../../../services/event-bus.service.js"
import { speechService } from "../../../services/textToSpeech.service.js"

export default {
    name: 'NoteDetails',
    inject: ['defaultErrorMsg'],
    template: `
        <dialog ref="details-modal" class="note-details-modal" >
            <section v-if="note" ref="note-details" :style="setNoteBG" class="note-details grid">
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
         <ColorList v-if="isPaletteOpen" ref="style-list" :noteDimensions="noteDimensions" @color-selected="noteAction('color-select', $event)"
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
        async loadNote() {
            const noteId = this.$route.params.id
            const note = await noteService.get(noteId).catch(err => {
                console.debug('♠️ ~ file: NoteDetails.js:66 ~ note ~ err:', err)
                showErrorMsg(this.defaultErrorMsg)
            })
            this.note = note

        },
        async updateNoteInfo({ info }) {
            const note = await noteService.get(this.note.id).catch(err => {
                console.debug('♠️ ~ file: NoteDetails.js:74 ~ note ~ err:', err)
                showErrorMsg(this.defaultErrorMsg)
            })
            note.info = info
            await noteService.save(note).catch(err => {
                console.debug('♠️ ~ file: NoteDetails.js:79 ~ await noteService.save ~ err:', err)
                showErrorMsg(this.defaultErrorMsg)
            })
            this.loadNote()
        },

        async noteAction(actionType, payload = null) {
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
                const note = await noteService.get(this.note.id).catch(err => {
                    console.error('♠️ ~ file: NoteDetails.js:132 ~ noteAction noteService.save ~ err:', err)
                    showErrorMsg(this.defaultErrorMsg)
                })
                delete note.id
                await noteService.save(note).catch(err => {
                    console.debug('♠️ ~ file: NoteDetails.js:136 ~ noteAction noteService.get ~ err:', err)
                    showErrorMsg(this.defaultErrorMsg)
                })
                this.closeModal()
                this.$router.push('/note#home')


            }
            if (actionType === 'speech') {
                var notesToSpeech = ['NoteMail', 'NoteTxt']
                this.note.title && speechService.speak(this.note.title)
                if (notesToSpeech.includes(this.note.type)) {
                    speechService.speak(this.note.info.content)
                }
            }
        },
        async updateNote(key, payload) {
            const note = await noteService.get(this.note.id)
            note[key] = payload
            await noteService.save(note).catch(err => {
                console.debug('♠️ ~ file: NoteDetails.js:143 ~ await noteService.save ~ err:', err)
                showErrorMsg(this.defaultErrorMsg)
            })
            this.loadNote()


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
        NoteMail
    }

}


