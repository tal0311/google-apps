export default {
 name: 'NotePreview',
 props: ['note'],
 template: `
        <section class="note-preview" @click="navigateTo(note.id)">
         <pre>{{note}}</pre>
        </section>

        `,
 components: {},
 created() { },
 data() {
  return {}
 },
 methods: {
  navigateTo(noteId) {
   this.$router.push('/note/' + noteId)
  }
 },
 computed: {},
}
