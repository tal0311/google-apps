export default {
 name: 'NoteTxt',
 props: ['info'],
 emits: ['updateInfo'],
 template: `
         <article class="note-txt">
           <p contenteditable="true" @blur="updateNote">{{info.txt}}</p>
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
