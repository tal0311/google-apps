export default {
       name: 'NoteVideo',
       props: ['info'],
       template: `
       <article class="note-video">
              <iframe :src="info.content" frameborder="0" width="100%" height="200">
                     update your browser
              </iframe>
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
