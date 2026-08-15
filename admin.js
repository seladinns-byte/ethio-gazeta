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


// ===============================
// NEWS LOAD
// ===============================

async function loadNews() {

  const newsBox = document.getElementById("news");

  newsBox.innerHTML = "";

  const querySnapshot = await getDocs(
    collection(db, "news")
  );


  querySnapshot.forEach((newsDoc) => {

    const data = newsDoc.data();

    newsBox.innerHTML += `

      <div class="card">

        ${
          data.image
          ? `<img src="${data.image}" width="300">`
          : ""
        }

        <h2>${data.title || ""}</h2>

        <p>${data.content || ""}</p>


        <button onclick="editNews('${newsDoc.id}')">
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


// ===============================
// DELETE NEWS
// ===============================

window.deleteNews = async function(id) {

  const confirmDelete = confirm(
    "ይህን ዜና ለመሰረዝ እርግጠኛ ነህ?"
  );

  if (!confirmDelete) return;


  await deleteDoc(
    doc(db, "news", id)
  );


  alert("ዜናው ተሰርዟል ✅");

  loadNews();

};


// ===============================
// EDIT NEWS
// ===============================

window.editNews = async function(id) {

  // Get current news
  const newsDoc = await getDocs(
    collection(db, "news")
  );

  let oldData = null;

  newsDoc.forEach((item) => {

    if (item.id === id) {
      oldData = item.data();
    }

  });


  if (!oldData) {
    alert("ዜናው አልተገኘም ❌");
    return;
  }


  // New title
  const newTitle = prompt(
    "አዲስ ርዕስ አስገባ:",
    oldData.title || ""
  );

  if (newTitle === null) return;


  // New content
  const newContent = prompt(
    "አዲስ ዝርዝር አስገባ:",
    oldData.content || ""
  );

  if (newContent === null) return;


  // ===============================
  // IMAGE
  // ===============================

  const imageInput =
    document.getElementById("image");

  let imageUrl = oldData.image || "";


  // If new image selected
  if (imageInput && imageInput.files.length > 0) {

    const file = imageInput.files[0];


    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    formData.append(
      "upload_preset",
      "sw7igpwshvz70icugddzz"
    );

    formData.append(
      "folder",
      "ethio-news"
    );


    alert("ፎቶው እየተጫነ ነው... ⏳");


    const response = await fetch(
      "https://api.cloudinary.com/v1_1/b0x6dfaz/image/upload",
      {
        method: "POST",
        body: formData
      }
    );


    const result = await response.json();


    if (!result.secure_url) {

      alert("ፎቶው መጫን አልቻለም ❌");

      return;

    }


    imageUrl = result.secure_url;

  }


  // ===============================
  // UPDATE FIREBASE
  // ===============================

  await updateDoc(
    doc(db, "news", id),
    {

      title: newTitle,

      content: newContent,

      image: imageUrl

    }
  );


  // Clear image input
  if (imageInput) {
    imageInput.value = "";
  }


  alert("ዜናው ተስተካክሏል ✅");


  loadNews();

};


// ===============================
// START
// ===============================

loadNews();