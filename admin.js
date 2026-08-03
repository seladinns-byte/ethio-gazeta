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

window.addNews = async function () {

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const imageFile = document.getElementById("image").files[0];

  if (!title || !content) {
    alert("እባክህ ርዕስና ዝርዝር ሙላ።");
    return;
  }

  try {

    let imageUrl = "";

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    await addDoc(collection(db, "news"), {
      title,
      content,
      image: imageUrl,
      createdAt: new Date()
    });

    alert("✅ ዜናው ተቀምጧል!");

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("image").value = "";

  } catch (error) {
    alert(error.message);
    console.error(error);
  }

};