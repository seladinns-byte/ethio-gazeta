import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
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

const auth = getAuth(app);

const storage = getStorage(app);


// LOGIN CHECK
onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "login.html";
  }

});


// LOGOUT
window.logout = async function () {

  try {

    await signOut(auth);

    alert("Logout ተደርጓል ✅");

    window.location.href = "login.html";

  } catch (error) {

    alert("Logout አልተሳካም ❌");

    console.error(error);

  }

};


// ADD NEWS
window.addNews = async function () {

  const title = document.getElementById("title").value;

const category = document.getElementById("category").value;

  const content = document.getElementById("content").value;

  const imageInput = document.getElementById("image");

  const file = imageInput.files[0];


  if (!title || !content) {

    alert("ርዕስና የዜና ዝርዝር አስገባ");

    return;

  }


  let imageURL = "";


  if (file) {

    const imageRef = ref(
      storage,
      "newsImages/" + Date.now() + "_" + file.name
    );

    await uploadBytes(imageRef, file);

    imageURL = await getDownloadURL(imageRef);

  }


  await addDoc(
    collection(db, "news"),
    {

      title: title,

      content: content,

      image: imageURL

    }
  );

  alert("ዜናው ተጨምሯል ✅");


  document.getElementById("title").value = "";

  document.getElementById("content").value = "";

  imageInput.value = "";


  loadNews();

};


// LOAD NEWS
async function loadNews() {

  const newsBox = document.getElementById("news");

  if (!newsBox) return;


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
      
       <p><strong>${data.category || "ዋና ዜና"}</strong></p>

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


// DELETE NEWS
window.deleteNews = async function (id) {

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


// EDIT NEWS
window.editNews = async function (id) {

  const newTitle = prompt(
    "አዲስ ርዕስ አስገባ:"
  );


  if (newTitle === null) return;


  const newContent = prompt(
    "አዲስ ዝርዝር አስገባ:"
  );


  if (newContent === null) return;


  await updateDoc(
    doc(db, "news", id),
    {

      title: newTitle,

      content: newContent

    }
  );


  alert("ዜናው ተስተካክሏል ✅");


  loadNews();

};
window.searchNews = function () {

  const searchText =
    document.getElementById("search").value.toLowerCase();

  const cards =
    document.querySelectorAll(".card");


  cards.forEach((card) => {

    const title =
      card.querySelector("h2").innerText.toLowerCase();

    const content =
      card.querySelector("p").innerText.toLowerCase();


    if (
      title.includes(searchText) ||
      content.includes(searchText)
    ) {

      card.style.display = "block";

    } else {

      card.style.display = "none";

    }

  });

};


loadNews();