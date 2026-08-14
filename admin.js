import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
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


const cloudName = "b0x6dfaz";
const uploadPreset = "ethio_news";


async function uploadImage(file) {

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData
    }
  );

  const data = await res.json();

  if (!data.secure_url) {
    throw new Error("Image upload failed");
  }

  return data.secure_url;
}


/* ADD NEWS */

window.addNews = async function () {

  const title =
    document.getElementById("title").value.trim();

  const content =
    document.getElementById("content").value.trim();

  const imageFile =
    document.getElementById("image").files[0];


  if (!title || !content) {

    alert("እባክህ ርዕስና ዝርዝር ሙላ።");

    return;
  }


  try {

    let imageUrl = "";


    if (imageFile) {

      imageUrl = await uploadImage(imageFile);

    }


    await addDoc(
      collection(db, "news"),
      {
        title: title,
        content: content,
        image: imageUrl,
        createdAt: new Date()
      }
    );


    alert("✅ ዜናው ተቀምጧል!");


    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("image").value = "";


    loadAdminNews();


  } catch (error) {

    alert("❌ " + error.message);

    console.error(error);

  }

};


/* LOAD NEWS */

async function loadAdminNews() {

  const newsBox =
    document.getElementById("news");


  newsBox.innerHTML =
    "<p>ዜናዎች እየጫኑ ነው...</p>";


  try {

    const snapshot =
      await getDocs(
        collection(db, "news")
      );


    newsBox.innerHTML = "";


    snapshot.forEach((newsDoc) => {

      const data = newsDoc.data();


      newsBox.innerHTML += `

        <div class="card">

          ${
            data.image
            ? `<img
                 src="${data.image}"
                 width="250"
                 alt="${data.title}">
              `
            : ""
          }

          <h2>${data.title}</h2>

          <p>${data.content}</p>

          <button
            onclick="deleteNews('${newsDoc.id}')">
            🗑️ ሰርዝ
          </button>

        </div>

      `;

    });


  } catch (error) {

    newsBox.innerHTML =
      "<p>❌ ዜናዎችን ማምጣት አልተቻለም</p>";

    console.error(error);

  }

}


/* DELETE NEWS */

window.deleteNews = async function (id) {

  const answer =
    confirm("ይህን ዜና ማጥፋት ትፈልጋለህ?");


  if (!answer) {
    return;
  }


  try {

    await deleteDoc(
      doc(db, "news", id)
    );


    alert("✅ ዜናው ተሰርዟል!");


    loadAdminNews();


  } catch (error) {

    alert("❌ ስህተት: " + error.message);

    console.error(error);

  }

};


/* START */

loadAdminNews();