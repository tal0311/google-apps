import { utilService } from "./../../../services/util.service.js"
import { YoutubeService } from '../../../services/youtube.service.js'


import VideoList from '../cmps/VideoList.js'
import WikiList from '../cmps/WikiList.js'
import MainVideo from '../cmps/MainVideo.js'


export default {
    template: `
        <section class="youtube-index">
            <VideoList v-if="videos" :videos="videos"/>
            <MainVideo v-if="selectedVideo" :selectedVideo="selectedVideo"/>
            <WikiList v-if="items" :items="items"/>
        </section>
    `,
    data() {
        return {
            videos: null,
            selectedVideo: null,
            items: null
        }
    },
    computed: {
    },
    async created() {
        utilService.setAppConfig('youtube')

        const data = await YoutubeService.query('vue')
        this.videos = data.videosData
        this.selectedVideo = this.videos[0]
        this.items = data.wikiData
    },
    methods: {
    },
    components: {
        VideoList,
        WikiList,
        MainVideo
    }
}