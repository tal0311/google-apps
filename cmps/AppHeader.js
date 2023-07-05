import AppFilter from "./AppFilter.js"
export default {
    template: `
        <header class="app-header">
            <h1>Google Apps</h1>
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
    methods: {},
    components: {
        AppFilter
    }
}