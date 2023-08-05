import { youtubeService } from '../../../services/youtube.service.js'
import { eventBus } from "../../../services/event-bus.service.js"
import { userService } from "../../../services/user.service.js"


import VideoList from '../cmps/VideoList.js'
import WikiList from '../cmps/WikiList.js'
import MainVideo from '../cmps/MainVideo.js'

export default {
  name: 'YtWatch',
  props: [],
  template: `
          <section class="yt-watch grid">
            <VideoList @select-vid="selectVideo" v-if="videos" :videos="videos"/>
            <MainVideo :isLiked="isLiked" @vid-action="vidAction" v-if="selectedVideo" :selectedVideo="selectedVideo"/>
            <WikiList v-if="items" :items="items"/>
            <BottomNav/>
          </section>
        `,

  created() {
    eventBus.on('yt-filter', this.setFilter)
    window.addEventListener('scroll', this.handleScroll);
    this.loadUser()
    this.loadData()
  },
  data() {
    return {
      user: null,
      videos: null,
      selectedVideo: null,
      items: null,
      filter: { searchTerm: 'vue' }
    }
  },
  methods: {
    loadUser() {
      this.user = userService.getLoggedInUser()
    },
    vidAction(actionType) {
      console.log('actionType', actionType);

      var opts = {
        like: 'likedVideos',
        search: 'searchHistory',
      }
      if (opts.hasOwnProperty(actionType)) {
        userService.addItemToUserList(opts[actionType], JSON.parse(JSON.stringify(this.selectedVideo)))
        this.loadUser()
      }

      if (actionType === 'share') {
        console.log('share');
      }


    },
    handleScroll(ev) {
      if (window.scrollY > 250) {
        window.document.body.classList.add('scrolled')
      } else {
        window.document.body.classList.remove('scrolled')
      }
    },
    setFilter({ txt: searchTerm }) {
      this.filter = { ...this.filter, searchTerm }
      this.vidAction('search')
      this.loadData()
    },
    async loadData() {
      eventBus.emit('loading', true)
      const data = await youtubeService.query({ ...this.filter })
      this.videos = data.videosData
      this.selectVideo(this.videos[0].id)
      this.items = data.wikiData
      eventBus.emit('loading', false)
    },
    selectVideo(videoId) {
      this.selectedVideo = this.videos.find(video => video.id === videoId)
      document.title = this.selectedVideo.title
    }
  },
  computed: {
    isLiked() {
      return this.user.likedVideos.includes(vid => vid.id === this.selectedVideo.id)
    }
  },
  components: {
    VideoList,
    WikiList,
    MainVideo,
  }
}
