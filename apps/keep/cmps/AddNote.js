import { noteService } from "../../../services/note.service.js"
import AddNoteActions from "./AddNoteActions.js"
import ColorList from "./ColorList.js"

export default {
   name: 'AddNote',
   emits: ['add-note'],

   template: `
        <section class="add-note">
         <pre>{{note}}</pre>
         <span class="material-symbols-outlined">
            push_pin
         </span>
         <header>

         </header>
         <main>
            <input type="text" placeholder="Title" :placeHolder="placeHolder" v-model="content"/>
          </main>
          <footer>
           <AddNoteActions @note-action="setAction"/>
           <button @click="addMsg">Close</button>
          </footer>
            <ColorList v-if="isPaletteOpen"/>
        </section>
        `,
   created() {
      this.note = noteService.getEmptyNote('NoteTxt')

   },
   data() {
      return {
         content: '',
         pos: { lat: 0, lng: 0 },
         isPaletteOpen: false,
         note: null,
         placeHolder: 'What\'s on your mind...',
      }
   },
   methods: {
      setAction(actionType) {
         if (actionType === 'color') {
            this.isPaletteOpen = !this.isPaletteOpen
            return
         }
         const placeHolderOpts = {
            NoteTxt: 'What\'s on your mind...',
            NoteImg: 'Enter image URL...',
            NoteVideo: 'Enter video URL...',
            NoteAudio: 'Enter audio URL...',
            NoteTodo: 'Enter comma separated list...',
            NoteMap: 'Enter location...',
            NoteCanvas: 'Draw something...'

         }
         this.placeHolder = placeHolderOpts[actionType] || ''

         this.note = noteService.getEmptyNote(actionType)
      },
      addMsg() {
         if (this.note.type === 'NoteTodo') {
            this.note.info.todos = this.content.split(',').map(txt => ({ txt, doneAt: Date.now() }))
         }
         console.log('this.note:', this.note)
         this.$emit('add-note', { ...this.note })
      }
   },
   computed: {},
   components: {
      AddNoteActions,
      ColorList
   },
}
