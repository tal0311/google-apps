import { mailService } from '../../../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'




import SideNav from '../cmps/SideNav.js'
import MailCompose from '../cmps/MailCompose.js'
import UserMsg from '../../../cmps/UserMsg.js'
import SpeechControllers from '../../../cmps/SpeechControllers.js'
import { userService } from '../../../services/user.service.js'
import { eventBus } from '../../../services/event-bus.service.js'


export default {
    template: `
        <section class="mail-index grid">
            <button @click="setCompose" class="compose grid">
                <i class="material-symbols-outlined">
                    edit
                </i>
                <p>Compose</p>
            </button>
           <SideNav :user="loggedUser"/>
           <section className="mail-router">
               <RouterView/>
           </section>
          <MailCompose v-if="isOpen"/>
          <UserMsg/>
          <SpeechControllers v-if="isSpeechOn" />
                        
        </section>
        
    `,
    data() {
        return {
            filterBy: null,
            isOpen: false,
            loggedUser: null,
            isSpeechOn: false,
            subScriptions: []
        }
    },
    created() {


        // throw '♠️ ~ file: MailIndex.js:46 ~ created ~ error'
        this.loadUser()
        this.subScriptions[0] = eventBus.on('update-user', this.loadUser)
        this.subScriptions[1] = eventBus.on('speech', this.setSpeechStatus)
    },
    methods: {
        setSpeechStatus(val) {
            this.isSpeechOn = val
        },
        setCompose() {
            this.$router.push(`/mail?tab=${this.$route.query.tab}&compose=new`)
        },
        loadUser() {
            this.loggedUser = userService.getLoggedInUser()
        }
    },
    watch: {
        $route: {
            deep: true,
            immediate: true,
            handler: function (val, oldVal) {
                const { compose } = val.query
                compose ? this.isOpen = true : this.isOpen = false
            }
        },
    },
    components: {
        SideNav,
        MailCompose,
        UserMsg,
        SpeechControllers
    },
    unmounted() {
        this.subScriptions.forEach(unSubscribe => unSubscribe())
    },
}