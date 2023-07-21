export default {
        name: 'UserPreview',
        props: ['user', 'userFrom'],
        template: `
         <section :class="['user-preview grid', $attrs.is ? $attrs.is: '']">
          <div v-if="user">
                <img v-if="user.imgUrl" :src="user.imgUrl"  />
                <div v-else>{{getInitials(user.username)}}</div> 
          </div>
          
          <div v-if="userFrom">{{getInitials(userFrom)}}</div> 
    
         </section>
        `,
        components: {},
        created() { },
        data() {
                return {}
        },
        methods: {
                getInitials(str) {
                        if (str.includes('@')) {
                                const initials = str.split('@').map(s =>
                                        s[0].charAt(0).toUpperCase()).join('')
                                return initials

                        }
                }

        },
        computed: {

        },
}
