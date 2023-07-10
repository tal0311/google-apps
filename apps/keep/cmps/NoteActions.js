export default {
 name: 'NoteActions',
 props: [],
 template: `  
        `,
 components: {},
 created() { },
 data() {
  return {
   actions: [
    { icon: 'archive', title: 'Archive', actionType: 'archive' },
    { icon: 'image', title: 'Image', actionType: 'image' },
    { icon: 'smart_display', title: 'Video', actionType: 'video' },
    { icon: 'map', title: 'Map', actionType: 'map' },
    { icon: 'palette', title: 'Note Color', actionType: 'color' },
    { icon: 'draw', title: 'Draw', actionType: 'draw' },
   ]
  }
 },
 methods: {},
 computed: {},
}
