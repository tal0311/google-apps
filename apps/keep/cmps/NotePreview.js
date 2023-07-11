import NoteActions from "./NoteActions.js"
import ColorList from "./ColorList.js"
export default {
       name: 'NotePreview',
       props: ['note'],
       template: `
        <section class="note-preview" @click="navigateTo(note.id)">
         <pre>{{note}}</pre>
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
              ColorList
       },
}
