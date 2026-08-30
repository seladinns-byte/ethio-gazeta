import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyBHJeIgpqpcdlZJxm9LxMSN4pBKqRMmgNs",
  authDomain: "ethio-gazeta.firebaseapp.com",
  projectId: "ethio-gazeta",
  storageBucket: "ethio-gazeta.firebasestorage.app",
  messagingSenderId: "395368229201",
  appId: "1:395368229201:web:05659ac1de88b254164b70"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


window.login = async function () {

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  const message = document.getElementById("message");


  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    message.innerHTML = "Login successful! ✅";

    window.location.href = "admin.html";

  } catch (error) {

    message.innerHTML =
      "Email ወይም Password ትክክል አይደለም ❌";

    console.log(error);

  }

};