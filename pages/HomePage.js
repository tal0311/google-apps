import { utilService } from './../services/util.service.js'
export default {
    template: `
        <section class="home grid">
            <img src="/assets/img/gmail-big.png" alt="Gmail" />
            <img src="/assets/img/keep-big.png" alt="Keep" />
            <img src="/assets/img/Youtube-big.png" alt="YouTube" />
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