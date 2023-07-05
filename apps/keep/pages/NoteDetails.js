// import { carService } from '../services/car.service.js'

export default {
    template: `
        <section class="note-details" >
            mote-details
        </section>
    `,
    data() {
        return {

        }
    },
    created() {
        // this.loadCar()
    },
    methods: {
        // loadCar() {
        //     const { carId } = this.$route.params
        //     carService
        //         .get(carId)
        //         .then(car => {
        //             this.car = car
        //         })
        //         .catch(err => {
        //             alert('Cannot load car')
        //             this.$router.push('/car')
        //         })
        // },
        // setDefaultImg() {
        //     console.log(this.$refs.carImg)
        //     this.$refs.carImg.src = "../assets/img/default.png"
        // }
    },
    watch: {
        // carId() {
        //     this.loadCar()
        // },
    },
    computed: {

    },
}
