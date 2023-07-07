import { mailService } from '../../../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'


import SideNav from '../cmps/SideNav.js'
import MailCompose from '../cmps/MailCompose.js'
import UserMsg from '../../../cmps/UserMsg.js'
// import CarFilter from '../cmps/CarFilter.js'
// import CarList from '../cmps/CarList.js'


export default {
    template: `
        <section class="mail-index grid">
            <button @click="setCompose" class="compose grid">
                <span class="material-symbols-outlined">
                    edit
                </span>
                <p>Compose</p>
            </button>
           <SideNav/>
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
            isOpen: false
        }
    },
    computed: {

    },
    created() {
        utilService.setAppConfig('gmail')
    },
    methods: {
        setCompose() {
            console.log(this.$route);
            // this.$router.push({ name: 'mail', params: { username: 'eduardo' }, query: { compose: 'new' } })
            this.$router.push(`/mail?tab=${this.$route.query.tab}&compose=new`)
        },
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