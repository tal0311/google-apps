import { eventBus } from './../services/event-bus.service.js'

export default {
    template: `
        <section class="app-filter">
           <form v-if="isNavDisplay"  @submit.prevent="setFilter">
            <i class="material-symbols-outlined">search</i>
            <input type="search" name="txt" id="" v-model="filterBy.txt" :placeholder="setPlaceHolder" />
           </form>
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: ''
            },
            isNavDisplay: false
        }
    },
    methods: {
        setFilter() {
            const { name } = this.$route
            if (name === 'mail') {
                eventBus.emit('mail-filter', { ...this.filterBy })
            }
            if (name === 'note') {
                eventBus.emit('note-filter', { ...this.filterBy })
            }
            this.filterBy.txt = ''
        }

    },
    computed: {
        setPlaceHolder() {
            const { name } = this.$route
            if (name.includes('mail')) {
                return 'Search mail'
            } else {
                return 'Search'
            }
        }
    },
    watch: {
        $route: {
            handler(newVal, oldVal) {
                const disableNavOpts = ['home', 'about']
                if (disableNavOpts.includes(newVal.name)) {
                    this.isNavDisplay = false
                } else {
                    this.isNavDisplay = true

                }

            },
            deep: true,
        }
    }
}

