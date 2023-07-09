export default {
 name: '',
 props: [],
 template: `
          <section className="k-side-nav">
             <div class="actions-list">
                <div v-for="action,idx in actions" :key="idx" >
                 <i @click="onActionClick(action.link)" class="k-action material-symbols-outlined">
                    {{action.icon}}
                 </i>
                </div>
             </div>
          </section>
        `,
 components: {},
 created() { },
 data() {
  return {
   actions: [
    { icon: 'lightbulb', title: 'Home', link: '/note/#home' },
    { icon: 'notifications', title: 'reminder', link: '/#note/reminder' },
    { icon: 'archive', title: 'home', link: '/note/#archive' },
    { icon: 'delete', title: 'Trash', link: '/note/#trash' },

   ]


  }
 },
 methods: {
  onActionClick(link) {
   this.$router.push(link)
  }
 },
 computed: {},
}
