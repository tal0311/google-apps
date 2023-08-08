import VideoPreview from "./VideoPreview.js"
// import { eventBus, showSuccessMsg } from "../../../services/event-bus.service.js"
// import { utilService } from "../../../services/util.service.js"
// import { userService } from "../../../services/user.service.js"


export default {
  name: 'VideoList',
  props: ['videos'],
  emits: ['select-vid', 'watch-Later'],
  template: `
      <section class="video-list grid">
          <VideoPreview v-for="video in videos" :key="video.id" :video="video"
          @select-vid="$emit('select-vid', video.id)"
          @watch-Later="$emit('watch-Later', $event)"
          />
        
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
    VideoPreview
  },
}