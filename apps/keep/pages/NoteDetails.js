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


// import { carService } from '../services/car.service.js'


export default {
    template: `
        <dialog ref="details-modal" class="note-details-modal" >
            <section :style="setNoteBG" v-if="note" class="note-details grid">
          <i :class="['pin-btn material-symbols-outlined', note.isPinned? 'pinned':'']">push_pin</i>
         
          <h3 class="editable-title" v-if="!displayUpperHeader" contenteditable="true" 
             @blur="noteAction('update-title',$event.target.innerText)">{{note.title}}
            </h3>
          
          <div class="preview-content">
                 <component @updateInfo="updateNoteInfo" :is="note.type" :info="note.info" isDetails="true"/>
          </div>
          <h3 class="editable-title" v-if="displayUpperHeader" contenteditable="true" 
          @blur="noteAction('update-title',$event.target.innerText)">{{note.title}}</h3>
         <NoteActions @note-action="noteAction" visibleStatus="3"/>
         <ColorList v-if="isPaletteOpen" @color-selected="noteAction('color-select', $event)"
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
            isPaletteOpen: false
        }
    },
    mounted() {
        this.openModal()
    },

    methods: {

        loadNote() {
            const noteId = this.$route.params.id
            noteService.get(noteId)
                .then(note => {
                    this.note = note
                })
        },
        updateNoteInfo({ type, info }) {
            noteService.get(this.note.id).then(note => {
                note.info = info
                noteService.save(note).then((note) => {
                    console.debug('♠️ ~ file: NoteDetails.js:62 ~ noteService.save ~ note:', note)

                    this.loadNote()
                })
            })

        },
        openModal() {
            this.$refs['details-modal'].showModal()
        },
        noteAction(actionType, payload = null) {
            console.debug('♠️ ~ file: NoteDetails.js:72 ~ noteAction ~ actionType, payload :', actionType, payload)

            if (actionType === 'update-title') {
                this.updateNote('title', payload)
            }

            if (actionType === 'color') this.isPaletteOpen = !this.isPaletteOpen
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
                    this.$router.push('/keep#home')
                })
            }
            if (actionType === 'duplicate') {
                noteService.get(this.note.id).then(note => {
                    delete note.id
                    noteService.save(note).then(() => {
                        this.$router.push('/keep#home')
                    })
                })
            }

        },
        updateNote(key, payload) {
            noteService.get(this.note.id).then(note => {
                note[key] = payload
                noteService.save(note).then((note) => {
                    console.debug('♠️ ~ file: NoteDetails.js:62 ~ noteService.save ~ note:', note)
                    this.loadNote()
                })
            })
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
