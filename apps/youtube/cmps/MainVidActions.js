export default {
 name: 'MainVidActions',
 props: [],
 template: `
  <section class="main-vid-actions grid">
   <div  v-for="(action,idx) in actions" :key="idx" @click="onVidAction(action.actionType)" class="grid action">
      <i class="material-symbols-outlined">{{action.icon}}</i>
      <span>{{action.title}}</span>
</div>

  </section>

        `,
 components: {},
 created() { },
 data() {
  return {
   actions: [
    { icon: 'share', actionType: 'share', title: 'Share', txt: 'Share' },
    { icon: 'thumb_down', actionType: 'dislike', title: 'Dislike', txt: 'Dislike' },
    { icon: 'thumb_up', actionType: 'like', title: 'like', txt: 'Like' },
   ]

  }
 },
 methods: {
  onVidAction(actionType) {
   console.log('actions.actionType', actionType);
   // this.$emit('vidAction', actions.actionType)
  }
 },
 computed: {},
}
