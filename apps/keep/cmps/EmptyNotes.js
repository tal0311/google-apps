export default {
       name: 'EmptyNotes',
       props: ['hash'],
       template: `
                     <section class="empty-notes ">
                            <div class="empty-notes-container grid">
                                 <i class="placeholder-icon material-symbols-outlined">{{dataForMsg.icon}}</i>
                                 <p>{{dataForMsg.msg}}</p>
                            </div>
                     </section>
        `,
       components: {},
       created() {
              this.setMsg()
       },
       data() {
              return {
                     opts: {
                            '#home': {
                                   msg: 'Notes you Add appear here', icon: 'lightbulb'
                            },
                            '#reminder': {
                                   msg: 'Notes with reminder appear here', icon: 'notifications'
                            },
                            '#archive': {
                                   msg: 'Notes you archive appear here', icon: 'archive'
                            },
                            '#trash': {
                                   msg: 'Notes you deleted appear here', icon: 'delete'
                            },
                     },
                     dataForMsg: {}
              }
       },
       methods: {
              setMsg() {
                     this.dataForMsg = this.opts[this.hash]
              }
       },
       computed: {},

}
