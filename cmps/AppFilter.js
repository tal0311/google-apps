export default {
    template: `
        <section class="app-filter">
           <form v-if="isNavDisplay">
            <input type="search" name="txt" id="" />
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

