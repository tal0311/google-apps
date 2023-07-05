export default {
 name: 'SideNav',
 props: [],
 template: `
  <aside class="side-nav">
   <div class="actions-container grid">
    <div v-for ="action,idx in actions" :key="idx"
    :title="action.title"
    @click=updateLabel(action.actionType)
    :class="['action grid', action.isSelected? 'selected':''  ]"
    >
      <i class="material-symbols-outlined">
        {{action.iconName}}
      </i>

      <span>{{action.title}}</span>
    </div>
   </div>
   
  </aside>

        `,
 components: {},
 created() { },
 data() {
  return {
   actions: [
    { iconName: 'inbox', actionType: 'inbox', title: 'Inbox', isSelected: false },
    { iconName: 'star', actionType: 'starred', title: 'Sent', isSelected: false },
    { iconName: 'schedule', actionType: 'Snoozed', title: 'Snoozed', isSelected: false },
    { iconName: 'send', actionType: 'sent', title: 'Sent', isSelected: false },
    { iconName: 'draft', actionType: 'draft', title: 'Draft', isSelected: false }
   ]
  }
 },
 methods: {
  updateLabel(actionType) {
   this.actions = this.actions.map(action => {
    if (action.actionType === actionType) {
     action.isSelected = true
    } else {
     action.isSelected = false
    }
    return action
   })

   this.setRouter(actionType)
  },
  setRouter(action) {

  }
 },
 computed: {},
}
