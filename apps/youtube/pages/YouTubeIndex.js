import { utilService } from "./../../../services/util.service.js"
import { youtubeService } from '../../../services/youtube.service.js'
import { eventBus } from "../../../services/event-bus.service.js"


import VideoList from '../cmps/VideoList.js'
import WikiList from '../cmps/WikiList.js'
import MainVideo from '../cmps/MainVideo.js'


export default {
    template: `
        <section class="youtube-index grid">
            <VideoList v-if="videos" :videos="videos"/>
            <MainVideo v-if="selectedVideo" :selectedVideo="selectedVideo"/>
            <WikiList v-if="items" :items="items"/>
        </section>
    `,
    data() {
        return {
            videos: null,
            selectedVideo: null,
            items: null,
            filter: { searchTerm: 'vue' }
        }
    },
    computed: {
    },
    created() {
        utilService.setAppConfig('youtube')
        this.loadData()
    },
    methods: {
        async loadData() {
            eventBus.emit('loading', true)
            const data = await youtubeService.query({ ...this.filter })
            this.videos = data.videosData
            this.selectedVideo = this.videos[0]
            this.items = data.wikiData
            eventBus.emit('loading', false)

        }
    },
    components: {
        VideoList,
        WikiList,
        MainVideo
    }
}