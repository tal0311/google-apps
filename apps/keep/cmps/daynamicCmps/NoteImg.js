export default {
  name: 'NoteImg',
  props: ['info'],
  template: `
         <article class="note-img">
           <img :src="info.content" alt="note-url" />
        </article>1
        `,
  components: {},
  created() { },
  data() {
    return {}
  },
  methods: {},
  computed: {},
}
