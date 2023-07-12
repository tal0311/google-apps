import NoteList from '../cmps/NoteList.js'
import SideNav from '../cmps/SideNav.js'
import { noteService } from './../../../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import AddNote from '../cmps/AddNote.js'





export default {
    template: `
        <section class="note-index">
           <AddNote @add-note="addNote"/>
           <NoteList v-if="pinnedNotes" title="Pinned" :notes="pinnedNotes"/>
           <NoteList v-if="notes" title="Other" :notes="notes"/>
           <RouterView/>
           <SideNav/>
        </section>
    `,
    data() {
        return {
            notes: [],
            pinnedNotes: [],
            filterBy: null,
        }
    },
    created() {
        utilService.setAppConfig('keep')
        this.loadNots()
    },
    computed: {

    },

    methods: {
        addNote(note) {
            console.debug('♠️ ~ file: KeepIndex.js:39 ~ addNote ~ note:', note)

            noteService.save(note)
                .then((note) => {
                    showSuccessMsg('Note added')
                }).catch(err => {
                    console.debug('♠️ ~ file: KeepIndex.js:43 ~ .then ~ err:', err)
                    showErrorMsg('Cannot add note')
                }).finally(() => {
                    this.loadNots()
                })
        },
        loadNots() {
            noteService.query().then(notes => {
                console.log(notes);
                this.pinnedNotes = notes.filter(note => note.isPinned)
                this.notes = notes.filter(note => !note.isPinned)
            })
        }

        // removeCar(carId) {
        //     carService.remove(carId)
        //         .then(() => {
        //             const idx = this.cars.findIndex(car => car.id === carId)
        //             this.cars.splice(idx, 1)
        //             showSuccessMsg('Car removed')
        //         })
        //         .catch(err => {
        //             showErrorMsg('Cannot remove car')
        //         })
        // },

        // setFilterBy(filterBy) {
        //     this.filterBy = filterBy
        // }
    },
    components: {
        NoteList,
        SideNav,
        AddNote
        // CarFilter,
        // CarList,
    }
}