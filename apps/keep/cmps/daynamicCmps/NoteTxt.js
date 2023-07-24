export default {
  name: 'NoteTxt',
  props: ['info'],
  emits: ['updateInfo'],
  template: `
         <article class="note-dynamic note-txt">
           <p :contenteditable="$attrs.isDetails" @blur="updateNote">{{info.content}}</p>
         </article>
        `,
  methods: {
    updateNote({ target: { innerText } }) {
      ;
      const infoToUpdate = JSON.parse(JSON.stringify(this.info))
      infoToUpdate.content = innerText
      console.debug('♠️ ~ file: NoteTxt.js:20 ~ updateNote ~ infoToUpdate:', infoToUpdate)
      this.$emit('updateInfo', { type: 'NoteTxt', info: infoToUpdate })
    }
  },
}
