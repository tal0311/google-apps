import { userService } from "../../../services/user.service.js"

export default {
    name: 'VidLibrary',
    props: [],
    template: `
  <section class="vid-Library">
    <div class="list-container history-list-container">
        <div className="list-header grid">
            <h3>history list</h3>
            <i class="material-symbols-outlined">history</i>
        </div>
    </div>
    <div class="list-container watch-later-container">
          <div className="list-header grid">
              <h3>watch later list</h3>
              <i class="material-symbols-outlined">schedule</i>
            </div>
    </div>
    <div class="list-container liked-videos-container grid">
          <div className="list-header grid">
              <h3>liked videos list</h3>
              <i class="material-symbols-outlined">thumb_up</i>
            </div>
    </div>
  </section>
        `,
    components: {},
    created() { },
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
