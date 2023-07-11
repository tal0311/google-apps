export default {
       name: 'AddNoteActions',
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
                            { icon: 'image', title: 'Image', actionType: 'NoteImg' },
                            { icon: 'edit_note', title: 'Plain text', actionType: 'NoteTxt' },
                            { icon: 'smart_display', title: 'Video', actionType: 'NoteVideo' },
                            { icon: 'map', title: 'Map', actionType: 'NoteMap' },
                            { icon: 'checklist', title: 'Checklist', actionType: 'NoteTodo' },
                            { icon: 'palette', title: 'Note Color', actionType: 'color' },
                            { icon: 'draw', title: 'Draw', actionType: 'NoteCanvas' },
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
