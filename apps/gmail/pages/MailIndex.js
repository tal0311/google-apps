import { mailService } from '../../../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'




import SideNav from '../cmps/SideNav.js'
import MailCompose from '../cmps/MailCompose.js'
import UserMsg from '../../../cmps/UserMsg.js'
import { userService } from '../../../services/user.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
// import CarFilter from '../cmps/CarFilter.js'
// import CarList from '../cmps/CarList.js'


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
          
        </section>
        
    `,
    data() {
        return {

            filterBy: null,
            isOpen: false,
            loggedUser: null
        }
    },
    computed: {

    },
    created() {
        this.loadUser()
        utilService.setAppConfig('gmail')
        eventBus.on('update-user', this.loadUser)
    },
    methods: {
        setCompose() {
            console.log(this.$route);
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
        UserMsg
    }
}