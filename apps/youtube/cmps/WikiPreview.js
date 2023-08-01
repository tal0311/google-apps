// import { utilService } from "../../../services/util.service.js"

export default {
    name: 'WikiPreview',
    props: ['item'],
    template: `
        <li class="wiki-preview" @click="onSelectWiki">
            <h5 v-html="item.title"></h5>
            <small v-html="item.desc"></small>
        </li>
  `,
    components: {},
    created() { },
    data() {
        return {
        }
    },
    methods: {
        onSelectWiki(wikiId) {
            window.open(`https://en.wikipedia.org/?curid=${this.item.id}`)
        }
    },
    computed: {
    },
}