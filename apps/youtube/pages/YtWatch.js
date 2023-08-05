import { youtubeService } from '../../../services/youtube.service.js'
import { eventBus } from "../../../services/event-bus.service.js"


import VideoList from '../cmps/VideoList.js'
import WikiList from '../cmps/WikiList.js'
import MainVideo from '../cmps/MainVideo.js'

export default {
 name: 'YtWatch',
 props: [],
 template: `
          <section class="yt-watch grid">
            <VideoList @select-vid="selectVideo" v-if="videos" :videos="videos"/>
            <MainVideo v-if="selectedVideo" :selectedVideo="selectedVideo"/>
            <WikiList v-if="items" :items="items"/>
            <BottomNav/>
          </section>
        `,

 created() {
  eventBus.on('yt-filter', this.setFilter)
  window.addEventListener('scroll', this.handleScroll);
  this.loadData()
 },
 data() {
  return {
   videos: null,
   selectedVideo: null,
   items: null,
   filter: { searchTerm: 'vue' }
  }
 },
 methods: {
  handleScroll(ev) {
   if (window.scrollY > 250) {
    window.document.body.classList.add('scrolled')
   } else {
    window.document.body.classList.remove('scrolled')
   }
  },
  setFilter({ txt: searchTerm }) {
   this.filter = { ...this.filter, searchTerm }
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
 computed: {},
 components: {
  VideoList,
  WikiList,
  MainVideo,
 }
}
