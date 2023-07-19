export default {
   name: '',
   props: [],
   template: `
          <section className="k-side-nav">
             <div class="actions-list ">
                <div class="k-action grid" v-for="action,idx in actions" :key="idx" >
                 <i @click="onActionClick(action.link)" :class="['k-action-icon material-symbols-outlined', action.isSelected?'selected':'']">
                    {{action.icon}}
                  </i>
                  <span class="title">{{action.title}}</span>
                </div>
             </div>
          </section>
        `,
   components: {},
   created() {

   },
   data() {
      return {
         actions: [
            { icon: 'lightbulb', title: 'Home', link: '/note#home', isSelected: true, },
            { icon: 'notifications', title: 'reminder', link: '/note#reminder', isSelected: false, },
            { icon: 'archive', title: 'home', link: '/note#archive', isSelected: false, },
            { icon: 'delete', title: 'Trash', link: '/note#trash', isSelected: false, },

         ]


      }
   },
   methods: {
      setSelectedLabel(link) {
         this.actions = this.actions.map(action => {
            if (action.link === link) {
               action.isSelected = true
            } else {
               action.isSelected = false
            }
            return action
         })

      },
      onActionClick(link) {
         this.setSelectedLabel(link)
         this.$router.push(link)
      }
   },
   computed: {},
}
