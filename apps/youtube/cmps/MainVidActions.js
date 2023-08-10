export default {
      name: 'MainVidActions',
      emits: ['vidAction'],
      props: ['isLiked'],
      template: `
  <section class="main-vid-actions grid">
      
            <div  v-for="(action,idx) in actions" :key="idx" @click="onVidAction(action.actionType)"
            :class="['grid action', action.isFill? 'fill':'']">
                  <i class="material-symbols-outlined">{{action.icon}}</i>
                  <span>{{action.title}}</span>
            </div>
            <button @click="onVidAction('share')">share</button>

  </section>

        `,
      data() {
            return {
                  actions: [
                        { icon: 'share', actionType: 'share', title: 'Share', txt: 'Share' },
                        { icon: 'thumb_down', actionType: 'dislike', title: 'Dislike', txt: 'Dislike' },
                        { icon: 'thumb_up', actionType: 'like', title: 'like', txt: 'Like', isFill: false },
                  ]

            }
      },
      methods: {
            onVidAction(actionType) {
                  this.$emit('vidAction', actionType)
            }
      },
      watch: {
            isLiked: {
                  deep: true,
                  immediate: true,
                  handler: function (val, oldVal) {
                        this.actions[2].isFill = val
                  }
            },
      }
}
