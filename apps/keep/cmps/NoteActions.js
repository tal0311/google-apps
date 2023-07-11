export default {
       name: 'NoteActions',
       emits: ['note-action'],
       props: [],
       template: `  
 <section class="note-actions">
       <div v-for="action,idx in actions" :key="idx" :title="action.title" @click.stop="onNoteAction(action.actionType)">
              <i class="material-symbols-outlined">
                     {{action.icon}}
              </i>
       </div>
 </section>
        `,
       components: {},
       created() { },
       data() {
              return {
                     actions: [
                            { icon: 'archive', title: 'Archive', actionType: 'archive' },
                            { icon: 'image', title: 'Image', actionType: 'image' },
                            { icon: 'smart_display', title: 'Video', actionType: 'video' },
                            { icon: 'map', title: 'Map', actionType: 'map' },
                            { icon: 'palette', title: 'Note Color', actionType: 'color' },
                            { icon: 'draw', title: 'Draw', actionType: 'draw' },
                     ]
              }
       },
       methods: {
              onNoteAction(actionType) {
                     this.$emit('note-action', actionType)
              }
       },
       computed: {},
}
