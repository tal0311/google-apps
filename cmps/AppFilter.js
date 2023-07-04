export default {
    template: `
        <section class="car-filter">
            <input 
                v-model="filterBy.txt" 
                type="text" 
                placeholder="search">
            <input 
                v-model.number="filterBy.minSpeed" 
                type="number" 
                placeholder="speed">
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '', minSpeed: 0,
            }
        }
    },
    watch: {
        filterBy: {
            handler() {
                this.$emit('filter', this.filterBy)
            },
            deep: true,
        }
    }
}

