import { utilService } from './../services/util.service.js'
export default {
    template: `
        <section class="home grid">
            <RouterLink to="/mail?tab=inbox">
                <img src="./assets/img/gmail-big.png" alt="Gmail" />
           </RouterLink>
            <RouterLink to="/note#home">
                <img src="./assets/img/keep-big.png" alt="Keep" />
            </RouterLink>
            <RouterLink to="/youtube">
                <img src="./assets/img/Youtube-big.png" alt="YouTube" />
            </RouterLink>
        </section>
    `,
    data() {
        return {

        }
    },
    created() {
        utilService.setAppConfig('apps')
    },
}