
import BottomNav from "../cmps/BottomNav.js"

export default {
    template: `
        <section class="youtube-index grid">
            <RouterView/>
            <BottomNav/>
        </section>
    `,
    components: {
        BottomNav
    }


}