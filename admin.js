import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);


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
onAuthStateChanged(auth, (user) => {

  if (!user) {

    window.location.href = "login.html";

  }

});


// ===============================
// DELETE NEWS
// ===============================

window.editNews = async function(id) {

  const newTitle = prompt("አዲስ ርዕስ አስገባ:");

  if (newTitle === null) return;


  const newContent = prompt("አዲስ ዝርዝር አስገባ:");

  if (newContent === null) return;


  const imageInput = document.getElementById("image");

  const file = imageInput.files[0];


  let updateData = {

    title: newTitle,
    content: newContent

  };


  // አዲስ ፎቶ ከተመረጠ
  if (file) {

    const imageRef = ref(
      storage,
      "newsImages/" + id + "_" + file.name
    );

    await uploadBytes(imageRef, file);

    const imageURL = await getDownloadURL(imageRef);

    updateData.image = imageURL;

  }


  await updateDoc(
    doc(db, "news", id),
    updateData
  );


  alert("ዜናው ተስተካክሏል ✅");


  imageInput.value = "";


  loadNews();

};window.logout = async function () {

  try {

    await signOut(auth);

    alert("Logout ተደርጓል ✅");

    window.location.href = "login.html";

  } catch (error) {

    alert("Logout አልተሳካም ❌");

    console.error(error);

  }

};