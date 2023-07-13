import NotePreview from "./NotePreview.js"



export default {
  name: 'NoteList',
  props: ['notes', 'title'],
  template: `
        <section class="note-list">
          <small>{{title}} notes</small>
          <section class="note-container">
            <NotePreview @updateNote="$emit('update-note',$event)"  v-for="note in notes" :key="note.id" :note="note"/>
          </section>
         
        </section>
    `,
  methods: {

  },
  components: {
    NotePreview
  },
}