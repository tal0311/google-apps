import { youtubeService } from '../../../services/youtube.service.js'
import { eventBus } from "../../../services/event-bus.service.js"
import { userService } from "../../../services/user.service.js"
import NoWikiData from '../cmps/NoWikiData.js'

import VideoList from '../cmps/VideoList.js'
import WikiList from '../cmps/WikiList.js'
import MainVideo from '../cmps/MainVideo.js'
import { shareService } from '../../../services/share.service.js'

export default {
  name: 'YtWatch',
  props: [],
  template: `
          <section class="yt-watch grid" v-if="selectedVideo && user">
            <VideoList v-if="videos" 
            @watch-Later="setVidQueue"
            @select-vid="selectVideo"  :videos="videos"/>
            <MainVideo :isLiked="isLiked" @vid-action="vidAction" v-if="selectedVideo" :selectedVideo="selectedVideo"/>
            <NoWikiData v-if="!items.length"/>
            <WikiList v-else="items" :items="items"/>
            <BottomNav/>
          </section>
        `,

  async created() {
    eventBus.on('yt-filter', this.setFilter)
    // window.addEventListener('scroll', this.handleScroll);
    await this.loadData()
    this.loadUser()
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
    setVidQueue(video) {
      userService.addItemToUserList('watchLater', JSON.parse(JSON.stringify(video)))
      this.loadUser()
    },
    loadUser() {
      this.user = userService.getLoggedInUser()
    },
    vidAction(actionType) {
      const opts = {
        like: 'likedVideos',
        search: 'searchHistory',
      }
      if (opts.hasOwnProperty(actionType)) {
        if (opts[actionType] === 'likedVideos') {
          this.isLiked ?
            userService.removeItemFromUserList(opts[actionType], this.selectedVideo.id) :
            userService.addItemToUserList(opts[actionType], JSON.parse(JSON.stringify(this.selectedVideo)))
          this.loadUser()
          return
        }

        if (this.user.searchHistory.includes(this.selectedVideo.id)) return
        userService.addItemToUserList(opts[actionType], JSON.parse(JSON.stringify(this.selectedVideo)))
        this.loadUser()
      }

      if (actionType === 'share') {
        eventBus.emit('show-modal', { modalType: 'ShareModal', data: this.selectedVideo.id })
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
      if (!this.user.likedVideos.length) return false
      return this.user.likedVideos.some(vid => vid.id === this.selectedVideo.id)
    }
  },
  components: {
    VideoList,
    WikiList,
    MainVideo,
    NoWikiData
  }
}
