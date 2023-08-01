import { eventBus } from '../services/event-bus.service.js'


export default {
    template: `
        <div class="user-msg" :class="msg.type" v-if="msg">
            <span>
                {{msg.txt}}
            </span>
            <i @click="msg=null" class="btn material-symbols-outlined">
               close
            </i>
        </div>
    `,
    data() {
        return {
            msg: null
        }
    },
    created() {
        this.unsubscribe = eventBus.on('show-msg', (msg) => {
            this.msg = msg
            setTimeout(() => {
                this.msg = null
            }, 5000)
        })
    },
    unmounted() {
        // This code never runs in this case
        this.unsubscribe()
    }
}