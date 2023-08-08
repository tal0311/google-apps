import { utilService } from "../../../services/util.service.js"

export default {
  name: 'VideoPreview',
  props: ['video'],
  emits: ['select-vid', 'watch-Later'],
  template: `
      <section class="video-preview grid" @click="$emit('select-vid', video.id)">
        <div :title="video.title" class="info-container grid">
          <p>{{video.title}}</p>
              <small>{{video.channel}}</small>
              <div class="video-info grid">
                <span>{{formatDate(video.publishedAt)}}</span> 
                <span>{{getViews}}K</span>
              </div>
            </div>
            <div class="img-container">
              <button v-if="isDisplayed" @click="$emit('watch-Later', video)" class="preview-action grid" title="Watch later">
                 <i class="material-symbols-outlined">schedule</i>
              </button>
              <img :src="video.cover" alt="">
          </div>
      </section>
  `,
  data() {
    return {
    }
  },
  methods: {
    formatDate(ts) {
      return utilService.getVidFormattedDate(ts)
    },
  },
  computed: {
    isDisplayed() {
      return this.$route.name !== 'youtube-vid-library'
    },
    getViews() {
      return Math.floor(Math.random() * 500)
    }
  },
}