const { createApp } = Vue

import { router } from './routes.js'

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'
import UserMsg from './cmps/UserMsg.js'
import AppModal from './cmps/AppModal.js'
import { userService } from './services/user.service.js'


const options = {
    template: `
    <section  class="main-app">
        <AppHeader :user="user"/>
        <div class="main-route">
            <RouterView  />
        </div>
        <!-- <AppFooter /> -->
        <UserMsg />
        <AppModal/>
    </section>
    `,
    created() {
        this.bc = new BroadcastChannel("internal_notification");
        this.bc.addEventListener("message", this.handleBroadcast)
    },
    data() {
        return {
            user: userService.getLoggedInUser()
        }
    },
    methods: {
        handleBroadcast(app) {
            router.push(app.data)
        }
    },
    unmounted() {
        this.bc.close()
    },
    components: {
        AppHeader,
        AppFooter,
        UserMsg,
        AppModal
    }
}
const app = createApp(options)
app.provide('defaultErrorMsg', 'Unable to preform your request, tray again later')
app.use(router)
app.mount('#app')
