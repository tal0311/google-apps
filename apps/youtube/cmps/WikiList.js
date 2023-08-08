import WikiPreview from "./WikiPreview.js"

// import { eventBus, showSuccessMsg } from "../../../services/event-bus.service.js"
// import { utilService } from "../../../services/util.service.js"
// import { userService } from "../../../services/user.service.js"


export default {
  name: 'WikiList',
  props: ['items'],
  template: `
      <section class="wiki-container">
       
        <ul class="wiki-list clean-list grid">
          <WikiPreview v-for="item in items" :key="item.id" :item="item"/>
        </ul>
      </section>
    `,

  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  watch: {
    // '$route.query': {
    //   deep: true,
    //   immediate: true,
    //   handler: function (val, oldVal) {
    //     this.setFilter({ tab: val.tab, label: val.label })

    //   }
    // },
  },
  components: {
    WikiPreview,

  },
}