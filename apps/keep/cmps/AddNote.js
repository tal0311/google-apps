import { noteService } from "../../../services/note.service.js"
import AddNoteActions from "./AddNoteActions.js"
import ColorList from "./ColorList.js"

export default {
   name: 'AddNote',
   emits: ['add-note'],

   template: `
        <section :class="['add-note grid', isOpen? 'expended':'minimize']">
         <template v-if="!isOpen">
           <header class="grid">
               <h3 contenteditable="true" @focus="isOpen=true">Title...</h3>
               <AddNoteActions @note-action="setAction" visibleStatus="0"/>
         </header>   
        </template>

        <template v-if="isOpen">
           <header>
              <i class="close-btn material-symbols-outlined">push_pin</i>
               <h3 contenteditable="true" >Title...</h3>
         </header>
         <main>
            <input type="text" autofocus  placeholder="Title"  :placeHolder="placeHolder" v-model="content"/>
          </main>
          <footer class="grid">
           <AddNoteActions @note-action="setAction" visibleStatus="1"/>
           <button @click="addMsg">Close</button>
          </footer>
        </template>

            <ColorList v-if="isPaletteOpen"/>
        </section>
        `,
   created() {
      this.note = noteService.getEmptyNote('NoteTxt')

   },
   data() {
      return {
         isOpen: false,
         content: '',
         pos: { lat: 0, lng: 0 },
         isPaletteOpen: false,
         note: null,
         placeHolder: 'What\'s on your mind...',
      }
   },
   methods: {
      // setFocus() {
      //    if (this.isOpen) {
      //       this.$refs.title.focus()
      //       return
      //    }
      //    this.isOpen = true


      // },
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
         if (!this.content) {
            this.isOpen = false
            return
         }
         if (this.note.type === 'NoteTodo') {
            this.note.info.todos = this.content.split(',').map(txt => ({ txt, doneAt: Date.now() }))
         }
         console.log('this.note:', this.note)
         this.$emit('add-note', { ...this.note })
         this.isOpen = false
      }
   },
   computed: {},
   components: {
      AddNoteActions,
      ColorList
   },
}
