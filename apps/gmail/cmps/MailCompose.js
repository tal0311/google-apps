export default {
        name: 'MailCompose',
        props: [],
        template: `
         <section class="mail-compose">
           <h1>mail compose</h1>
         <form action="">

           <div id="quill-container"></div>
         </form>
         </section>
        `,
        components: {},
        created() { },
        data() {
                return {}
        },
        mounted() {
                new Quill('#quill-container', {
                        modules: {
                                toolbar: [
                                        [{ header: [1, 2, false] }],
                                        ['bold', 'italic', 'underline'],
                                        ['image', 'code-block'],
                                ],
                        },
                        placeholder: 'Compose an epic...',
                        theme: 'snow', // or 'bubble'
                })
        },
        methods: {},
        computed: {},
}
