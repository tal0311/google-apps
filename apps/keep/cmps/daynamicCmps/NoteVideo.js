export default {
       name: 'NoteVideo',
       props: ['info'],
       template: `
       <article class="note-video">
              <iframe :src="info.url" frameborder="0" width="200" height="200">
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
