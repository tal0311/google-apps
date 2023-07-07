import { eventBus } from "../../../services/event-bus.service.js"

export default {
  name: 'SideNav',
  props: [],
  template: `
  <aside class="side-nav" >
   <div class="actions-container grid">
    <div v-for ="action,idx in actions" :key="idx"
    :title="action.title"
    @click=updateLabel(action.actionType)
    :class="['action grid', action.isSelected? 'selected':''  ]"
    >
      <i class="material-symbols-outlined">
        {{action.iconName}}
      </i>

      <span>
        {{action.title}}
      </span>
      <span v-if="getType(action.actionType)">
        {{action.count}}
      </span>
    </div>
   </div>
   
  </aside>

        `,
  components: {},
  created() {
    eventBus.on('get-count', this.setCount)
  },
  data() {
    return {
      actions: [
        { iconName: 'inbox', actionType: 'inbox', title: 'Inbox', isSelected: false, count: 0 },
        { iconName: 'star', actionType: 'starred', title: 'Starred', isSelected: false, count: 0 },
        { iconName: 'schedule', actionType: 'Snoozed', title: 'Snoozed', isSelected: false, count: 0 },
        { iconName: 'send', actionType: 'sent', title: 'Sent', isSelected: false, count: 0 },
        { iconName: 'draft', actionType: 'draft', title: 'Draft', isSelected: false, count: 0 },
        { iconName: 'delete', actionType: 'trash', title: 'Trash', isSelected: false, count: 0 }
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
      this.$router.push({ name: 'mail', query: { tab: action } })
    },
    setCount({ tab, count }) {
      const action = this.actions.find(a => a.actionType === tab)
      action.count = count

    },
    getType(action) {
      const allow = ['inbox', 'draft']
      return allow.includes(action)
    }
  },
  computed: {

  },
}
