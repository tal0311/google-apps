export default {
    template: `
        <header class="app-header">
            <h1>Google Apps</h1>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/gmail">Gmail</RouterLink> 
                <RouterLink to="/keep">Keep</RouterLink>
                <RouterLink to="/about">About us</RouterLink>
            </nav>
        </header>
    `,
    data() {
        return {}
    },
    methods: {}
}