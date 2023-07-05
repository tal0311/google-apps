
import { mailService } from '../../../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'

import SideNav from '../cmps/SideNav.js'
import MailCompose from '../cmps/MailCompose.js'
// import CarFilter from '../cmps/CarFilter.js'
// import CarList from '../cmps/CarList.js'


export default {
    template: `
        <section class="mail-index grid">
            <button class="compose">compose</button>
           <SideNav/>
           <section className="mail-router">
               <RouterView/>
           </section>
          <MailCompose/>
        </section>
    `,
    data() {
        return {

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
        SideNav,
        MailCompose
    }
}