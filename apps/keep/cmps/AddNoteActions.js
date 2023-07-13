export default {
       name: 'AddNoteActions',
       emits: ['note-action'],
       props: [],
       template: `  
 <section class="add-note-actions grid">
      
       <div v-for="action,idx in filteredActions" :key="idx" :title="action.title" 
       @click.stop="onNoteAction(action.actionType)">
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
                            { icon: 'smart_display', title: 'Video', actionType: 'NoteVideo', visibleStatus: ['1'], isPartial: false, isPreview: false },
                            { icon: 'edit_note', title: 'Plain text', actionType: 'NoteTxt', visibleStatus: ['1'], isPartial: false, isPreview: false },
                            { icon: 'map', title: 'Map', actionType: 'NoteMap', visibleStatus: ['1'], isPartial: false, isPreview: false },
                            { icon: 'image', title: 'Image', actionType: 'NoteImg', visibleStatus: ['0'], isPartial: true, isPreview: false },
                            { icon: 'check_box', title: 'Checklist', actionType: 'NoteTodo', visibleStatus: ['0'], isPartial: true, isPreview: false },
                            { icon: 'palette', title: 'Note Color', actionType: 'color', visibleStatus: ['1', '3'], isPartial: false, isPreview: true },
                            { icon: 'brush', title: 'Draw', actionType: 'NoteCanvas', visibleStatus: ['0'], isPartial: true, isPreview: false },
                            { icon: 'archive', title: 'Archive', actionType: 'archive', visibleStatus: ['1', '3'], isPartial: false, isPreview: true },
                            { icon: 'delete', title: 'Delete', actionType: 'delete', visibleStatus: ['3'], isPartial: false, isPreview: true },
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
                     // console.log('this.$attrs.partials:', this.$attrs.partial);
                     // if (this.$attrs.partial) {
                     //        return this.actions.filter(action => action.isPartial)
                     // }
                     // if (this.$attrs.preview) {
                     //        return this.actions.filter(action => action.isPreview)
                     // }
                     // return this.actions.filter(action => !action.isPartial && !action.isPreview)
              }
       },
}
