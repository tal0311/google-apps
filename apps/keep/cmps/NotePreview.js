import NoteActions from "./AddNoteActions.js"
import ColorList from "./ColorList.js"
import NoteImg from "./daynamicCmps/NoteImg.js"
import NoteTxt from "./daynamicCmps/NoteTxt.js"
import NoteTodo from "./daynamicCmps/NoteTodo.js"
import NoteVideo from "./daynamicCmps/NoteVideo.js"
import NoteAudio from "./daynamicCmps/NoteAudio.js"
import NoteMap from "./daynamicCmps/NoteMap.js"
import NoteCanvas from "./daynamicCmps/NoteCanvas.js"



export default {
       name: 'NotePreview',
       props: ['note'],
       emits: ['updateNote'],
       template: `
        <section :style="setNoteBG" :class="['note-preview grid', isSelected?'selected':'']" @click="navigateTo(note.id)">
          <i @click.stop="noteAction('toggle-pin', !note.isPinned)" :class="['pin-btn material-symbols-outlined', note.isPinned? 'pinned':'']">push_pin</i>
         
          <h3 v-if="!displayUpperHeader">{{note.title}}</h3>
          <div class="preview-content">
                 <component :is="note.type" :info="note.info" isDetails="false"/>
          </div>
          <h4 v-if="displayUpperHeader">{{note.title}}</h4>
         <NoteActions @note-action="noteAction" visibleStatus="3"/>
         <ColorList v-if="isPaletteOpen" @color-selected="noteAction('color-select', $event)"
          @cover-selected="noteAction('cover-select', $event)" />
        </section>

        `,
       created() {
       },
       data() {
              return {
                     isPaletteOpen: false,
                     isSelected: false
              }
       },
       methods: {

              navigateTo(noteId) {
                     this.$router.push('/note/' + noteId)
              },
              noteAction(actionType, payload = null) {

                     console.log('actionType:', actionType)
                     if (actionType === 'color') this.isPaletteOpen = !this.isPaletteOpen
                     if (actionType === 'color-select') {
                            this.isPaletteOpen = false

                     }
                     if (actionType === 'cover-select') {
                            this.isPaletteOpen = false
                            console.log('cover selected:', payload)
                     }

                     console.log('{ noteId: this.note.id, actionType, payload }:', { noteId: this.note.id, actionType, payload })
                     this.$emit('updateNote', { noteId: this.note.id, actionType, payload })

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
       watch: {
              '$route.params.id': {
                     immediate: true,
                     handler(val, oldVal) {
                            val === this.note.id
                                   ? this.isSelected = true
                                   : this.isSelected = false
                     }
              }
       },
       components: {
              NoteActions,
              ColorList,
              NoteImg,
              NoteTxt,
              NoteTodo,
              NoteVideo,
              NoteAudio,
              NoteMap,
              NoteCanvas,

       },
}
