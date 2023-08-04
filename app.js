const { createApp } = Vue

import { router } from './routes.js'
import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'
import UserMsg from './cmps/UserMsg.js'
import AppModal from './cmps/AppModal.js'
import errorPlugin from './plugins/errorPlugin.js'
import { userService } from './services/user.service.js'
import { broadcastService } from './services/broadcastChannel.service.js'


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
        broadcastService.crateChannel('internal_notification')
        broadcastService.subscribe('internal_notification', this.handleBroadcast)
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
        broadcastService.unSubscribe('internal_notification')
    },
    components: {
        AppHeader,
        AppFooter,
        UserMsg,
        AppModal
    }
}

const app = createApp(options)
app.use(errorPlugin)
app.provide('defaultErrorMsg', 'Unable to preform your request, tray again later')
app.use(router)
app.mount('#app')
