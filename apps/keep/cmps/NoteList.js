import NotePreview from "./NotePreview.js"



export default {
  name: 'NoteList',
  props: ['notes', 'title'],
  template: `
        <section class="note-list">
          <small>{{title}} notes</small>
          <NotePreview v-for="note in notes" :key="note.id" :note="note"/>
         
        </section>
    `,
  methods: {

  },
  components: {
    NotePreview
  },
}