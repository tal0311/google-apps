const { createApp } = Vue
import { userService } from './services/user.service.js'
import { broadcastService } from './services/broadcastChannel.service.js'


const options = {
 template: `
    <section class="about-page main-layout">

    <header class="full main-layout">
     <div class="header-container">
      <h1>About Google Apps Clone</h1>
     </div>
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
                <li><strong class="app-name" @click="navigateTo('/youtube')">YouTube Clone:</strong> The YouTube clone allows users to browse, search, and watch videos from a vast library of content. Users can also create and manage playlists, like and comment on videos, and subscribe to channels.</li>
                <li><strong class="app-name" @click="navigateTo('/mail?tab=inbox')">Gmail Clone:</strong> The Gmail clone provides users with a feature-rich email client. They can send and receive emails, organize their inbox with labels and folders, and use a powerful search functionality to find specific emails quickly.</li>
                <li><strong class="app-name" @click="navigateTo('/note#home')">Keep Clone:</strong> The Keep clone is a note-taking application that enables users to create, edit, and organize their notes. Users can add reminders, labels, and colors to keep their notes well-structured.</li>
                <li>
                    <strong>Responsive Design:</strong> Google Apps Clone is fully responsive and can be used on any device, including desktops, laptops, tablets, and smartphones.
                </li>
                <li>
                 <strong>SPA & MPA:</strong> 
                 The application combines SPA and MPA when all pages in the application have the ability to transfer information between one another. Even when these pages are used in two different instances of vue.js
                </li>
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

    <footer class="full main-layout">
     <small>Contact me on social media</small>
     <div class="social-media-container grid">
         <a target="blank" href="https://www.facebook.com/tal.amit.3/" 
        class="fa-brands fa-facebook-square"></a>
    
        <a target="blank" href="https://www.linkedin.com/in/tal-amit/" 
        class="fa-brands fa-linkedin"></a>

         <a target="blank" href="https://wa.me/+972543113309" 
       class="fa-brands fa-whatsapp-square"></a>
         <a target="blank" href="https://github.com/tal0311" 
       class="fa-brands fa-square-github"></a>
   
       <a href="http://" target="_blank" rel="noopener noreferrer" class="fa-solid fa-inbox"></a>
   
      
     </div>
    </footer>

   

        
      
     
    </section>
    `,
 created() {
  broadcastService.crateChannel('internal_notification')
 },
 data() {
  return {
   user: userService.getLoggedInUser()
  }
 },
 methods: {
  navigateTo(app) {
   broadcastService.broadcast('internal_notification', app)
  }
 },
 unmounted() {
  broadcastService.unSubscribe('internal_notification')
 },
}
const app = createApp(options)
app.provide('defaultErrorMsg', 'Unable to preform your request, tray again later')

app.mount('#app-about')
