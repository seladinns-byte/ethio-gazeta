import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBHJeIgpqpcdlZJxm9LxMSN4pBKqRMmgNs",
  authDomain: "ethio-gazeta.firebaseapp.com",
  projectId: "ethio-gazeta",
  storageBucket: "ethio-gazeta.firebasestorage.app",
  messagingSenderId: "395368229201",
  appId: "1:395368229201:web:05659ac1de88b254164b70"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function loadNews(){

  const newsBox = document.getElementById("news");

newsBox.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "news"));

  querySnapshot.forEach((doc)=>{

    let data = doc.data();

    newsBox.innerHTML += `
      <div class="card">
        <h2>${data.title}</h2>
        <p>${data.content}</p>
      </div>
    `;

  });

}

loadNews();