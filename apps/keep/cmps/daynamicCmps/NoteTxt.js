export default {
  name: 'NoteTxt',
  props: ['info'],
  emits: ['updateInfo'],
  template: `
         <article class="note-dynamic note-txt">
           <p contenteditable="true" @click.stop="" @blur="updateNote">{{info.content}}</p>
         </article>
        `,
  components: {},
  created() { },
  data() {
    return {}
  },
  methods: {
    updateNote({ target: { innerText } }) {
      console.debug('♠️ ~ file: NoteTxt.js:17 ~ updateNote ~ innerText:', innerText)

      // this.$emit('updateInfo', this.info)
    }
  },
  computed: {},
}
