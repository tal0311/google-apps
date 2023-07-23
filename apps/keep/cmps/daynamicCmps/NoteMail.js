export default {
       name: 'NoteMail',
       props: ['info'],
       template: `
              <article class="note-dynamic note-mail">
                     <h3>{{info.content}}</h3>
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
