import AppFilter from "./AppFilter.js"
export default {
    template: `
        <header class="app-header">
            <div class="logo grid" v-if="setLogoByApp" >
                <div :class="['app-logo', setLogoByApp.logoClass ]"></div>
                <div class="app-name">{{setLogoByApp.appName}}</div>
            </div>
            <AppFilter/>
            <span @click="isOpen=!isOpen" class="apps-btn material-symbols-outlined">apps</span>
            <nav v-if="isOpen" class="grid">
                <RouterLink to="/">
                    <span>Home</span><div class="link-logo apps"></div>
                </RouterLink>
                <RouterLink to="/gmail">
                    <span>Gmail</span><div class="link-logo gmail"></div>
                </RouterLink> 
                <RouterLink to="/note">
                    <span>Keep</span><div class="link-logo keep"></div>
                </RouterLink>
                <RouterLink to="/youtube">
                    <span>YouTube</span><div class="link-logo yt"></div>
                </RouterLink>
              </nav>
        </header>
    `,
    data() {
        return {
            isOpen: false
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
    methods: {},
    components: {
        AppFilter
    }
}