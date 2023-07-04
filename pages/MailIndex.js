
// import { carService } from '../services/car.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'

// import CarFilter from '../cmps/CarFilter.js'
// import CarList from '../cmps/CarList.js'


export default {
    template: `
        <section class="car-index">
           <h1>MailIndex</h1>
           <RouterView/>
        </section>
    `,
    data() {
        return {
            mails: [],
            filterBy: null,
        }
    },
    computed: {

    },
    created() {
        utilService.setFavIcon('gmail')


        // carService.query()
        //     .then(cars => this.cars = cars)
    },
    methods: {

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
    components: {
        // CarFilter,
        // CarList,
    }
}