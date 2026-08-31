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


// URL ውስጥ ያለውን ID ማግኘት
const params = new URLSearchParams(window.location.search);

const id = params.get("id");


// ዜናውን ከFirebase ማግኘት
async function loadSingleNews() {

  const newsBox = document.getElementById("singleNews");


  if (!id) {

    newsBox.innerHTML = "የዜና ID አልተገኘም ❌";

    return;

  }


  const newsRef = doc(db, "news", id);

  const newsSnap = await getDoc(newsRef);


  if (!newsSnap.exists()) {

    newsBox.innerHTML = "ዜናው አልተገኘም ❌";

    return;

  }


  const data = newsSnap.data();


  newsBox.innerHTML = `

    <div class="card">

      ${
        data.image
          ? `<img src="${data.image}" width="100%">`
          : ""
      }

      <p>
        <strong>
          ${data.category || "ዋና ዜና"}
        </strong>
      </p>

      <h1>${data.title || ""}</h1>

      <p>${data.content || ""}</p>

    </div>

  `;

}


loadSingleNews();