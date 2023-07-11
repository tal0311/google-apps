import NoteActions from "../cmps/NoteActions.js"

// import { carService } from '../services/car.service.js'


export default {
    template: `
        <dialog ref="details-modal" class="note-details" >
            <section v-if="note">
                <pre>{{note}}</pre>
                <NoteActions @note-action="noteAction"/>
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
        noteAction(actionType) {
            console.log('actionType:', actionType)

        }
    },
    components: {
        NoteActions
    }

}
