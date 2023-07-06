import { eventBus } from './../services/event-bus.service.js'

export default {
    template: `
        <section class="app-filter">

            <!-- {{$route.name}} -->
           <form v-if="isNavDisplay"  @submit.prevent="setFilter">
            <input type="search" name="txt" id="" v-model="filterBy.txt" />

            <!-- <div v-if="$route.name==='mail'">
              
                <input type="checkbox" name="" id="" />
                <input type="checkbox" name="" id="" />
                <input type="checkbox" name="" id="" />
                <input type="date" name="" id="" />
            </div> -->
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
            console.log('name:', name)
            if (name === 'mail') {
                eventBus.emit('mail-filter', { ...this.filterBy })

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
        // filterBy: {
        //     handler() {
        //         this.$emit('filter', this.filterBy)
        //     },
        //     deep: true,
        // }
    }
}

