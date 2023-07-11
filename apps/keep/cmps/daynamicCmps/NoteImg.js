export default {
 name: 'NoteImg',
 props: ['info'],
 template: `
         <article class="note-img">
          {{info}}
          <img :src="info.url" alt="note-url" />
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
