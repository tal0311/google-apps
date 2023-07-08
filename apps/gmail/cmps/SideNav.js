import { eventBus } from "../../../services/event-bus.service.js"

export default {
  name: 'SideNav',
  props: ['user'],
  template: `
  <aside class="side-nav grid" >
   <section class="actions-container grid">
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
  </section>

  <div class="label-container grid">
    <div class="header-container grid">
      <h3>labels</h3>
      <i @click="openMOdal('LabelList')" class="material-symbols-outlined">
      add
      </i>
    </div>
  <div v-if="user.labels" class="label grid" v-for="item in user.labels" :key="item.id" @click="setRouterByLabel(item.name)">
      <i  class="material-symbols-outlined">label</i>
    <span >{{item.name}}</span>
      <!-- <i @click.stop="editLabel(item)" class="material-symbols-outlined">more_vert</i> -->
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
    setRouterByLabel(label) {
      this.$router.push({ name: 'mail', query: { label: label, tab: this.$route.query.tab } })
    },
    getType(action) {
      const allow = ['inbox', 'draft']
      return allow.includes(action)
    },
    openMOdal(modalType) {
      eventBus.emit('show-modal', modalType)
    },
    editLabel(label) {
      eventBus.emit('show-modal', { modalType: 'LabelList', data: label })
    }
  },
  computed: {

  },
}
