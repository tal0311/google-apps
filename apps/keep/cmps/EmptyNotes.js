export default {
       name: 'EmptyNotes',
       props: ['hash'],
       template: `
                     <section :class="['empty-notes', setData]">
                           <div class="empty-notes-container grid">
                                 <i class="placeholder-icon material-symbols-outlined">{{dataForMsg.icon}}</i>
                                 <p>{{dataForMsg.msg}}</p>
                            </div>
                     </section>
        `,

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
       computed: {
              setData() {
                     this.dataForMsg = this.opts[this.hash]
              }
       },
       watch: {},

}
