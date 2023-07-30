export default {
       name: 'AddNoteActions',
       emits: ['note-action'],
       props: [],
       template: `  
 <section class="add-note-actions grid">
      
       <div v-for="action,idx in filteredActions" :key="idx" :title="action.title" 
       @click.stop="onNoteAction(action.actionType)">
              <i class="material-symbols-outlined">{{action.icon}}</i>
       </div>
 </section>
        `,
       data() {
              return {
                     actions: [
                            { icon: 'smart_display', title: 'Video', actionType: 'NoteVideo', visibleStatus: ['1'] },
                            { icon: 'edit_note', title: 'Plain text', actionType: 'NoteTxt', visibleStatus: ['1'] },
                            { icon: 'map', title: 'Map', actionType: 'NoteMap', visibleStatus: ['1'] },
                            { icon: 'image', title: 'Image', actionType: 'NoteImg', visibleStatus: ['0'] },
                            { icon: 'check_box', title: 'Checklist', actionType: 'NoteTodo', visibleStatus: ['0'] },
                            { icon: 'palette', title: 'Color & Cover', actionType: 'color', visibleStatus: ['1', '3'] },
                            { icon: 'brush', title: 'Draw', actionType: 'NoteCanvas', visibleStatus: ['0'] },
                            { icon: 'archive', title: 'Archive', actionType: 'archive', visibleStatus: ['1', '3'] },
                            { icon: 'delete', title: 'Delete', actionType: 'delete', visibleStatus: ['3'] },
                            { icon: 'content_copy', title: 'Duplicate', actionType: 'duplicate', visibleStatus: ['3'] },
                            { icon: 'add_alert', title: 'Add Alert', actionType: 'alert', visibleStatus: ['1', '3'] },
                            { icon: 'send', title: 'Send via mail', actionType: 'share', visibleStatus: ['3'] },
                            { icon: 'speech_to_text', actionType: 'speech', title: 'Text speech to', visibleStatus: ['3'] },
                            { icon: 'mic', actionType: 'speech-to-text', title: 'Speech to Text', visibleStatus: ['1', '3'] },
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
                     const visibleStatus = this.$attrs.visibleStatus;
                     return this.actions.filter(action => action.visibleStatus.includes(visibleStatus))
              }
       },
}
