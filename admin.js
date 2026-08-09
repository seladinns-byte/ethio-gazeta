import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
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

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData
    }
  );

  const data = await response.json();

  if (!data.secure_url) {
    throw new Error("ፎቶው ወደ Cloudinary አልተላከም።");
  }

  return data.secure_url;
}

window.addNews = async function () {

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const imageFile = document.getElementById("image").files[0];

  if (!title || !content) {
    alert("እባክህ ርዕስና ዝርዝር ሙላ።");
    return;
  }

  try {

    let imageUrl = "";

    // ፎቶ ካለ
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    // Firebase Firestore ላይ አስቀምጥ
    await addDoc(collection(db, "news"), {
      title: title,
      content: content,
      image: imageUrl,
      createdAt: new Date()
    });

    alert("✅ ዜናው ከፎቶው ጋር ተቀምጧል!");

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("image").value = "";

  } catch (error) {

    console.error(error);
    alert("❌ ስህተት: " + error.message);

  }

};