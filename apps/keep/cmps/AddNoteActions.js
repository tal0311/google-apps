export default {
       name: 'AddNoteActions',
       emits: ['note-action'],
       props: [],
       template: `  
 <section class="add-note-actions grid">
      
       <div v-for="action,idx in filteredActions" :key="idx" :title="action.title" @click.stop="onNoteAction(action.actionType)">
              <i class="material-symbols-outlined">
                     {{action.icon}}
              </i>
       </div>
 </section>
        `,
       components: {},
       created() {

       },
       data() {
              return {
                     actions: [
                            { icon: 'image', title: 'Image', actionType: 'NoteImg', isPartial: true },
                            { icon: 'edit_note', title: 'Plain text', actionType: 'NoteTxt', isPartial: false },
                            { icon: 'smart_display', title: 'Video', actionType: 'NoteVideo', isPartial: false },
                            { icon: 'map', title: 'Map', actionType: 'NoteMap', isPartial: false },
                            { icon: 'checklist', title: 'Checklist', actionType: 'NoteTodo', isPartial: true },
                            { icon: 'palette', title: 'Note Color', actionType: 'color', isPartial: false },
                            { icon: 'draw', title: 'Draw', actionType: 'NoteCanvas', isPartial: true },
                     ]
              }
       },
       methods: {
              onNoteAction(actionType) {
                     this.$emit('note-action', actionType)
              }
       },
       computed: {
              filteredActions() {
                     console.log('this.$attrs.partials:', this.$attrs.partial);
                     if (this.$attrs.partial) {
                            return this.actions.filter(action => action.isPartial)
                     }
                     return this.actions
              }
       },
}
