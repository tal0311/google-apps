import { mailService } from '../../../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import { eventBus } from './../../../services/event-bus.service.js'

import SideNav from '../cmps/SideNav.js'
import MailCompose from '../cmps/MailCompose.js'
// import CarFilter from '../cmps/CarFilter.js'
// import CarList from '../cmps/CarList.js'


export default {
    template: `
        <section class="mail-index grid">
            <button @click="setCompose" class="compose grid">
                <span class="material-symbols-outlined">
                    edit
                </span>
                <p>Compose</p>
            </button>
           <SideNav/>
           <section className="mail-router">
               <RouterView/>
           </section>
          <MailCompose v-if="isOpen"/>
        </section>
        
    `,
    data() {
        return {

            filterBy: null,
            isOpen: false
        }
    },
    computed: {

    },
    created() {
        eventBus.on('mail-filter', this.setFilter)
        utilService.setFavIcon('gmail')



        // carService.query()
        //     .then(cars => this.cars = cars)
    },
    methods: {
        setCompose() {
            this.$router.push({ name: 'mail', query: { compose: 'new' } })
        },
        setFilter(filterBy) {
            console.log('filterBy:', filterBy)
        }


        // removeCar(carId) {
        //     carService.remove(carId)
        //         .then(() => {
        //             const idx = this.cars.findIndex(car => car.id === carId)
        //             this.cars.splice(idx, 1)
        //             showSuccessMsg('Car removed')
        //         })
        //         .catch(err => {
        //             showErrorMsg('Cannot remove car')
        //         })
        // },

        // setFilterBy(filterBy) {
        //     this.filterBy = filterBy
        // }
    },
    watch: {
        $route: {
            deep: true,
            immediate: true,
            handler: function (val, oldVal) {
                const { compose } = val.query
                compose ? this.isOpen = true : this.isOpen = false
            }
        },
    },
    components: {
        // CarFilter,
        // CarList,
        SideNav,
        MailCompose
    }
}