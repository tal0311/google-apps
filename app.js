const { createApp } = Vue

import { router } from './routes.js'

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'
import UserMsg from './cmps/UserMsg.js'

const options = {
    template: `
    <div>
        <AppHeader/>
        <div class="main-route">
            <RouterView  />
        </div>
        <AppFooter />
        <UserMsg />
    </div>
    `,
    data() {
        return {}
    },
    components: {
        AppHeader,
        AppFooter,
        UserMsg
    }
}
const app = createApp(options)
app.use(router)
app.mount('#app')
