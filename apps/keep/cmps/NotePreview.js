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
       template: `
        <section class="note-preview grid" @click="navigateTo(note.id)">
          <i :class="['pin-btn material-symbols-outlined', note.isPinned? 'pinned':'']">push_pin</i>
         
          <h3 v-if="!displayUpperHeader">{{note.title}}</h3>
          <div class="preview-content">
                 <component :is="note.type" :info="note.info" />
          </div>
          <h4 v-if="displayUpperHeader">{{note.title}}</h4>
         <NoteActions @note-action="noteAction" visibleStatus="3"/>
         <ColorList v-if="isPaletteOpen" @color-selected="noteAction('color-select', $event)"
          @cover-selected="noteAction('cover-select', $event)" />
        </section>

        `,
       created() { },
       data() {
              return {
                     isPaletteOpen: false
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
                            console.log('color selected:', payload)
                     }
                     if (actionType === 'cover-select') {
                            this.isPaletteOpen = false
                            console.log('cover selected:', payload)
                     }

              }
       },
       computed: {
              displayUpperHeader() {
                     const notsOptions = ['NoteImg', 'NoteVideo', 'NoteMap', 'NoteCanvas']
                     return notsOptions.includes(this.note.type)
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
