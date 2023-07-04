import MailIndex from './pages/MailIndex.js'
import KeepIndex from './pages/KeepIndex.js'
import HomePage from './pages/HomePage.js'
import AboutPage from './pages/AboutPage.js'
import MailList from './cmps/MailList.js'
import MailDetails from './pages/MailDetails.js'
import NoteList from './cmps/NoteList.js'
import NoteDetails from './pages/NoteDetails.js'


const { createRouter, createWebHashHistory } = VueRouter


const options = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/about',
            component: AboutPage,

        },
        {
            path: '/gmail',
            component: MailIndex,
            redirect: '/mail',
            children: [
                {
                    path: '/mail',
                    component: MailList
                },
                {
                    path: '/mail/:id',
                    component: MailDetails
                },
            ]
        },
        {
            path: '/keep',
            component: KeepIndex,
            redirect: '/note',
            children: [
                {
                    path: '/note',
                    component: NoteList
                },
                {
                    path: '/note/:id',
                    component: NoteDetails
                },
            ]
        },



    ]
}
export const router = createRouter(options)
