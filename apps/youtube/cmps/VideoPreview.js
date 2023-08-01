// import { utilService } from "../../../services/util.service.js"

export default {
  name: 'VideoPreview',
  props: ['video'],
  template: `
      <section class="video-preview grid">
          <div :title="video.title" class="info-container grid">
              <p>{{video.title}}</p>
              <small>{{video.channel}}</small>
              <div class="video-info grid">
                <span>{{video.publishedAt}}</span> 
                <span>Views: 100K</span>
              </div>
          </div>
          <img :src="video.cover" alt="">
      </section>
  `,
  components: {},
  created() { },
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
}