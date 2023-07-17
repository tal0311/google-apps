// import { utilService } from "../../../services/util.service.js"

export default {
    name: 'WikiPreview',
    props: ['item'],
    template: `
        <li class="wiki-preview">
            <h5>{{item.title}}</h5>
            <small>{{item.desc}}</small>
        </li>
  `,
    components: {},
    created() { },
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
}