// import { carService } from '../services/car.service.js'

export default {
    template: `
        <dialog ref="details-modal" class="note-details" >
            <section v-if="note">
                <pre>{{note}}</pre>
            </section>
        </dialog>
    `,
    created() {
        this.loadNote()
    },
    data() {
        return {
            note: null
        }
    },
    mounted() {
        this.openModal()
    },
    methods: {
        loadNote() {
            const noteId = this.$route.params.noteId
            noteService.getById(noteId)
                .then(note => {
                    this.note = note
                })
        },
        openModal() {
            this.$refs['details-modal'].showModal()
        }
    }

}
