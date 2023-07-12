export default {
  name: 'NoteImg',
  props: ['info'],
  template: `
         <article class="note-img">
           <img :src="info.content" alt="note-url" />
        </article>
        `,
  components: {},
  created() { },
  data() {
    return {}
  },
  methods: {},
  computed: {},
}
