export default {
  name: '',
  props: [],
  template: `
      <section class="mail-actions list-actions grid">
        <i v-for="action,idx in actions1" :key="idx"
          @click="$emit('mail-action' ,action.actionType)"
          :title="action.title" class="material-symbols-outlined">
            {{action.iconName}}
          </i>|
        <i v-for="action,idx in actions2" :key="idx"
          @click="$emit('mail-action',action.actionType)"
          :title="action.title" class="material-symbols-outlined">
            {{action.iconName}}
          </i>|
        <i v-for="action,idx in actions3" :key="idx"
          @click="$emit('mail-action',action.actionType)"
          :title="action.title" class="material-symbols-outlined">
            {{action.iconName}}
          </i>
         </section>
        `,
  data() {
    return {
      actions1: [
        { iconName: 'archive', actionType: 'toggleArchive', title: 'Archive' },
        { iconName: 'report', actionType: 'report', title: 'Report Spam' },
        { iconName: 'delete', actionType: 'remove', title: 'Delete Mail' }
      ],
      actions2: [
        { iconName: 'mail', actionType: 'toggleRead', title: 'Mark read' },
        { iconName: 'schedule', actionType: 'schedule', title: 'schedule' },
        { iconName: 'add_task', actionType: 'addTask', title: 'Add Task' }
      ],
      actions3: [
        { iconName: 'drive_file_move', actionType: 'moveTo', title: 'Move to' },
        { iconName: 'label', actionType: 'addLabel', title: 'Label' },
        { iconName: 'speech_to_text', actionType: 'speech', title: 'Text speech to' },

        { iconName: 'more_vert', actionType: 'more', title: 'More' }
      ]
    }
  },

}
