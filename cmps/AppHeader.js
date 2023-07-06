import AppFilter from "./AppFilter.js"
export default {
    template: `
        <header class="app-header">
            <div class="logo grid" v-if="setLogoByApp" >
                <div :class="['app-logo', setLogoByApp.logoClass ]"></div>
                <div class="app-name">{{setLogoByApp.appName}}</div>
            </div>
            <AppFilter/>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/gmail">Gmail</RouterLink> 
                <RouterLink to="/note">Keep</RouterLink>
                <RouterLink to="/youtube">youtube</RouterLink>
                <RouterLink to="/about">About us</RouterLink>
            </nav>
        </header>
    `,
    data() {
        return {}
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
                        appName: 'Google Apps'
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