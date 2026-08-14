import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc
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


async function loadSingleNews() {

  const newsBox = document.getElementById("singleNews");

  const params = new URLSearchParams(
    window.location.search
  );

  const newsId = params.get("id");


  if (!newsId) {

    newsBox.innerHTML =
      "<p>የዜና ID አልተገኘም።</p>";

    return;
  }


  try {

    const newsRef = doc(db, "news", newsId);

    const newsDoc = await getDoc(newsRef);


    if (!newsDoc.exists()) {

      newsBox.innerHTML =
        "<p>ይህ ዜና አልተገኘም።</p>";

      return;
    }


    const data = newsDoc.data();


    newsBox.innerHTML = `

      <article class="card">

        ${
          data.image
          ? `<img
              src="${data.image}"
              alt="${data.title}">
            `
          : ""
        }

        <h1>${data.title || "ያለ ርዕስ"}</h1>

        <p>${data.content || ""}</p>

      </article>

    `;


  } catch (error) {

    console.error(error);

    newsBox.innerHTML =
      "<p>ዜናውን ማምጣት አልተቻለም።</p>";

  }

}


loadSingleNews();