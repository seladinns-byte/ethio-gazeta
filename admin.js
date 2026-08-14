import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
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


async function loadNews() {

  const newsBox = document.getElementById("news");

  newsBox.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "news"));


  querySnapshot.forEach((newsDoc) => {

    const data = newsDoc.data();

    newsBox.innerHTML += `

      <div class="card">

        ${data.image ? `<img src="${data.image}" width="300">` : ""}

        <h2>${data.title}</h2>

        <p>${data.content}</p>

        <button onclick="editNews('${newsDoc.id}', '${data.title}', '${data.content}')">
          ✏️ አርትዕ
        </button>

        <button onclick="deleteNews('${newsDoc.id}')">
          🗑️ ሰርዝ
        </button>

        <hr>

      </div>

    `;

  });

}


// DELETE
window.deleteNews = async function(id) {

  const confirmDelete = confirm("ይህን ዜና ለመሰረዝ እርግጠኛ ነህ?");

  if (!confirmDelete) return;

  await deleteDoc(doc(db, "news", id));

  alert("ዜናው ተሰርዟል ✅");

  loadNews();

};


// EDIT
window.editNews = async function(id, oldTitle, oldContent) {

  const newTitle = prompt("አዲስ ርዕስ አስገባ:", oldTitle);

  if (newTitle === null) return;


  const newContent = prompt("አዲስ ዝርዝር አስገባ:", oldContent);

  if (newContent === null) return;


  await updateDoc(doc(db, "news", id), {

    title: newTitle,
    content: newContent

  });


  alert("ዜናው ተስተካክሏል ✅");

  loadNews();

};


loadNews();