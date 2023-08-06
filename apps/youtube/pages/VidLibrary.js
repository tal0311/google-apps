import { userService } from "../../../services/user.service.js"
import VideoPreview from "../cmps/VideoPreview.js"


export default {
    name: 'VidLibrary',
    props: [],
    template: `
  <section class="vid-Library">
    <div class="list-container history-list-container">
        <div class="list-header grid">
            <h3>history list</h3>
            <i class="material-symbols-outlined">history</i>
            <pre>{{user.searchHistory}}</pre>
        </div>
    </div>
    <div class="list-container watch-later-container">
          <div class="list-header grid">
              <h3>watch later list</h3>
              <i class="material-symbols-outlined">schedule</i>
               <pre>{{user.watchLater}}</pre>
            </div>
    </div>
    <div v-if="user.likedVideos" class="list-container liked-videos-container grid">
          <div class="list-header grid">
              <h3>liked videos list</h3>
              <i class="material-symbols-outlined">thumb_up</i>
        </div>
              <div class="liked-list grid">
                <VideoPreview v-for="vid in user.likedVideos" :video="vid"/>
             </div>
    </div>
  </section>
        `,
    components: {
        VideoPreview
    },
    created() {
        this.loadUser()
    },
    data() {
        return {
            user: null
        }
    },
    methods: {
        loadUser() {
            this.user = userService.getLoggedInUser()

        }
    },
    computed: {},
}
