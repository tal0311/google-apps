import NoteActions from "../cmps/NoteActions.js"
import ColorList from "../cmps/ColorList.js"
// import { carService } from '../services/car.service.js'


export default {
    template: `
        <dialog ref="details-modal" class="note-details" >
            <section v-if="note">
                <pre>{{note}}</pre>
                <NoteActions @note-action="noteAction"/>
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
        openModal() {
            this.$refs['details-modal'].showModal()
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
    components: {
        NoteActions,
        ColorList
    }

}
