export default {
      name: 'ColorList',
      emits: ['cover-selected', 'color-selected'],
      props: [],
      template: `

       <section class="color-list">
            color -list
        <div class="color" v-for="color,idx in colors" :key="idx" :style="{backgroundColor:color}" @click.stop="onColorClick(color)">
        </div>
         <div class="cover-list">
          <img v-for="cover,idx in coverList" :key="idx" :src="cover" @click.stop="onCoverClick(cover)" />
         </div>
        </section>
        `,
      components: {},
      created() { },
      data() {
            return {
                  colors: [
                        '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'
                  ],
                  coverList: [
                        'https://fonts.gstatic.com/s/i/googlematerialicons/image_not_supported/v12/gm_grey-24dp/1x/gm_image_not_supported_gm_grey_24dp.png',
                        'https://www.gstatic.com/keep/backgrounds/grocery_light_thumb_0615.svg',
                        'https://www.gstatic.com/keep/backgrounds/food_light_thumb_0615.svg',
                        'https://www.gstatic.com/keep/backgrounds/music_light_thumb_0615.svg',
                        'https://www.gstatic.com/keep/backgrounds/recipe_light_thumb_0615.svg',
                        'https://www.gstatic.com/keep/backgrounds/places_light_thumb_0615.svg',
                        'https://www.gstatic.com/keep/backgrounds/notes_light_thumb_0615.svg',
                        'https://www.gstatic.com/keep/backgrounds/travel_light_thumb_0615.svg',
                        'https://www.gstatic.com/keep/backgrounds/video_light_thumb_0615.svg',
                        'https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg'
                  ]
            }
      },
      methods: {
            onColorClick(color) {
                  this.$emit('color-selected', color)
            },
            onCoverClick(cover) {
                  console.log('cover:', cover)
                  this.$emit('cover-selected', cover)
            }
      },
      computed: {},
}
