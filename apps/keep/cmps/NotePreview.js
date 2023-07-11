import NoteActions from "./NoteActions.js"
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
        <section class="note-preview" @click="navigateTo(note.id)">
               <component :is="note.type" :info="note.info" />
               <h4>{{note.title}}</h4>
         <NoteActions @note-action="noteAction"/>
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
       computed: {},
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
