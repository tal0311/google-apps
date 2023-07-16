const { createApp } = Vue

import { router } from './routes.js'

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'
import UserMsg from './cmps/UserMsg.js'
import AppModal from './cmps/AppModal.js'

const options = {
    template: `
    <section class="main-app">
        <AppHeader/>
        <div class="main-route">
            <RouterView  />
        </div>
        <AppFooter />
        <UserMsg />
        <AppModal/>
    </section>
    `,
    data() {
        return {}
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
