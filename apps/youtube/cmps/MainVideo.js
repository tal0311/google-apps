import MainVidActions from "./MainVidActions.js"

export default {
  name: 'MainVideo',
  props: ['selectedVideo', 'isLiked'],
  emits: ['vid-action'],
  template: `
      <section class="main-video grid">
          <iframe  title="main-video" :src="getVideoIdUrl" frameborder="0"></iframe>
         <div class="info-container">
           <p class="video-desc" data-title="Video description">{{ selectedVideo.desc }}</p>
         </div>
         <MainVidActions :isLiked="isLiked" @vidAction="$emit('vid-action', $event)"/>
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
    getVideoIdUrl() {
      return `https://www.youtube.com/embed/${this.selectedVideo.id}?`
    }
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
    MainVidActions
  },
}