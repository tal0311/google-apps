// import { eventBus, showSuccessMsg } from "../../../services/event-bus.service.js"
// import { utilService } from "../../../services/util.service.js"
// import { userService } from "../../../services/user.service.js"


export default {
  name: 'MainVideo',
  props: ['selectedVideo'],
  template: `
      <section class="main-video grid">
          <iframe src="https://www.youtube.com/embed/3dHNOWTI7H8?" frameborder="0"></iframe>
          <div class="info-container">
              <p class="video-desc" data-title="Video description">{{selectedVideo.desc}}</p>
          </div>
      </section>
    `,

  created() {
  },
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
  },
}