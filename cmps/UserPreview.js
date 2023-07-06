export default {
 name: 'UserPreview',
 props: ['user'],
 template: `
         <section class="user-preview grid">
          <div>{{getInitials(user)}}</div>
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
