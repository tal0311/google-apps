import MailIndex from './apps/gmail/pages/MailIndex.js'
import KeepIndex from './apps/keep/pages/KeepIndex.js'
import HomePage from './pages/HomePage.js'
import AboutPage from './pages/AboutPage.js'
import MailList from './apps/gmail/cmps/MailList.js'
import MailDetails from './apps/gmail/pages/MailDetails.js'
import NoteDetails from './apps/keep/pages/NoteDetails.js'
import YouTubeIndex from './apps/youtube/pages/YouTubeIndex.js'
import CanvasEditor from './apps/keep/cmps/CanvasEditor.js'
import { utilService } from './services/util.service.js'


const { createRouter, createWebHashHistory } = VueRouter


const options = {
    history: createWebHashHistory(),

    routes: [
        {
            path: '/',
            component: HomePage,
            name: 'home'
        },
        {
            path: '/about',
            component: AboutPage,
            name: 'about'

        },
        {
            path: '/gmail',
            component: MailIndex,
            name: 'gmail',
            children: [
                {
                    path: '/mail',
                    component: MailList,
                    name: 'mail',
                },
                {
                    path: '/mail/:id',
                    component: MailDetails,
                    name: 'mail-details',
                },
            ]
        },
        {
            path: '/note',
            component: KeepIndex,
            name: 'note',
            children: [

                {
                    path: '/note/:id',
                    component: NoteDetails,
                    name: 'note-details',
                },
                {
                    path: '/note/canvas',
                    component: CanvasEditor,
                    name: 'note-canvas',
                },
            ]
        },

        {
            path: '/youtube',
            component: YouTubeIndex,
            name: 'youtube'

        },
    ]
}
export const router = createRouter(options)

export const routerHistory = []
router.beforeEach((to, from) => {
    if (to.fullPath.includes('mail')) {
        utilService.setAppConfig('gmail')
    }
    if (to.fullPath.includes('note')) {
        utilService.setAppConfig('keep')
    }
    if (to.fullPath.includes('youtube')) {
        utilService.setAppConfig('youtube')
    }
    routerHistory.push(to)
})