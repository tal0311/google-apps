export default {
   name: 'BottomNav',
   props: [],
   template: `
         <section class="bottom-nav grid">
            <nav class="nav-bar grid">
                <RouterLink v-for="(link,idx) in links" :key="idx" :to="link.path">
                   <i :title="link.title" class="material-symbols-outlined">{{ link.icon }}</i>
                </RouterLink>
            </nav>
          
         </section>
        `,
   components: {},
   created() { },
   data() {
      return {
         links: [
            { path: '/youtube/watch', icon: 'home', title: 'Watch Videos' },
            { path: '/youtube/library', icon: 'video_library', title: 'Library' },
         ]
      }
   },
   methods: {},
   computed: {},
}
