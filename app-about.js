const { createApp } = Vue
import { userService } from './services/user.service.js'


const options = {
 template: `
    <section class="about-page">

    <header>
        <h1>About Google Apps Clone</h1>
    </header>
    <main>
        <section>
            <h2>Overview</h2>
            <p>
                Google Apps Clone is a web application that combines the best features of popular Google apps like YouTube, Gmail, and Keep. It is built using Vue.js, a progressive JavaScript framework, and CSS3 for styling to create a seamless and modern user experience.
            </p>
        </section>

        <section>
            <h2>Features</h2>
            <ul>
                <li><strong>YouTube Clone:</strong> The YouTube clone allows users to browse, search, and watch videos from a vast library of content. Users can also create and manage playlists, like and comment on videos, and subscribe to channels.</li>
                <li><strong>Gmail Clone:</strong> The Gmail clone provides users with a feature-rich email client. They can send and receive emails, organize their inbox with labels and folders, and use a powerful search functionality to find specific emails quickly.</li>
                <li><strong>Keep Clone:</strong> The Keep clone is a note-taking application that enables users to create, edit, and organize their notes. Users can add reminders, labels, and colors to keep their notes well-structured.</li>
            </ul>
        </section>

        <section>
            <h2>Web APIs</h2>
            <p>
                Google Apps Clone utilizes a variety of web APIs to enhance user experience and functionality. Some of the key APIs used include:
            </p>
            <ul>
                <li><strong>Broadcast Channel API:</strong> This API enables seamless communication and data sharing between different components and modules of the application.</li>
                <li><strong>Speech to Text API:</strong> The Speech to Text API provides voice recognition capabilities, allowing users to interact with the application using voice commands.</li>
                <li><strong>Text to Speech API:</strong> The Text to Speech API converts text content into spoken audio, enhancing accessibility and user experience.</li>
            </ul>
        </section>
    </main>

    <footer>
        <p>Contact me on social media</p>
        <i class="fa-brands fa-square-facebook"></i>
        <i class="fa-brands fa-square-whatsapp"></i>
        <i class="fa-brands fa-linkedin"></i>
        <i class="fa-solid fa-inbox"></i>
        <i class="fa-brands fa-square-github"></i>
    </footer>



      
    </section>
    `,
 created() {


 },
 data() {
  return {
   user: userService.getLoggedInUser()
  }
 },
 components: {

 }
}
const app = createApp(options)
app.provide('defaultErrorMsg', 'Unable to preform your request, tray again later')

app.mount('#app')
