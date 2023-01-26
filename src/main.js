// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnfqk6k91bvrhixdRisq8cEiFRoZfmno8",
  authDomain: "tictactoe-vuejs-app.firebaseapp.com",
  projectId: "tictactoe-vuejs-app",
  storageBucket: "tictactoe-vuejs-app.appspot.com",
  messagingSenderId: "769899659305",
  appId: "1:769899659305:web:b61790c836ecf82f8f9c38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
