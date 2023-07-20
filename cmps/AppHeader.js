import AppFilter from "./AppFilter.js"
import AppLoader from "./AppLoader.js"
import { eventBus } from "../services/event-bus.service.js"

export default {
    template: `
        <header class="app-header">
            <!-- <i class="material-symbols-outlined">menu</i> -->
            <div class="logo grid" v-if="setLogoByApp" >
                <div :class="['app-logo', setLogoByApp.logoClass ]"></div>
                <div class="app-name">{{setLogoByApp.appName}}</div>
            </div>
            <AppFilter/>
            <div class="actions-container grid">
                <AppLoader :isLoading="isLoading"/>
                <i @click="isOpen=!isOpen" class="apps-btn material-symbols-outlined">apps</i>
                <nav v-if="isOpen" class="grid">
                    <RouterLink to="/">
                    <span>Home</span><div class="link-logo apps"></div>
                </RouterLink>
                <RouterLink to="/mail?tab=inbox">
                    <span>Gmail</span><div class="link-logo gmail"></div>
                </RouterLink> 
                <RouterLink to="/note#home">
                    <span>Keep</span><div class="link-logo keep"></div>
                </RouterLink>
                <RouterLink to="/youtube">
                    <span>YouTube</span><div class="link-logo yt"></div>
                </RouterLink>
            </nav>
        </div>
        </header>
    `,
    created() {
        eventBus.on('loading', this.setLoading)
    },
    data() {
        return {
            isOpen: false,
            isLoading: false
        }
    },
    methods: {
        setLoading(val) {
            this.isLoading = val
        }
    },
    computed: {
        setLogoByApp() {
            const { name } = this.$route
            if (name) {
                if (name.includes('mail')) {
                    return {
                        logoClass: 'gmail',
                        appName: 'Gmail'
                    }
                }
                if (name.includes('home')) {
                    return {
                        logoClass: 'apps',
                        appName: 'Apps'
                    }
                }
                if (name.includes('youtube')) {
                    return {
                        logoClass: 'yt',
                        appName: 'YouTube'
                    }
                }
                if (name.includes('note')) {
                    return {
                        logoClass: 'keep',
                        appName: 'keep'
                    }
                }
            }
        }
    },
    components: {
        AppFilter,
        AppLoader
    }
}