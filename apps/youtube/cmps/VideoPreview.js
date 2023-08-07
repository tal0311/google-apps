import { utilService } from "../../../services/util.service.js"

export default {
  name: 'VideoPreview',
  props: ['video'],
  emits: ['select-vid'],
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
          <img :src="video.cover" alt="">
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
    getViews() {
      return Math.floor(Math.random() * 500)
    }
  },
}