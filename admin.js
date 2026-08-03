alert("ADMIN JS OK");
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
console.log("ADMIN JS RUNNING");
const cloudName = "b0x6dfaz";
const uploadPreset = "ethio_news";

async function uploadImage(file){

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

  console.log(data);

  return data.secure_url;
}
const cloudName = "b0x6dfaz";
const uploadPreset = "ethio_news";

async function uploadImage(file){

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

console.log(data);

  return data.secure_url;
}
window.addNews = async function () alert("Button works!");
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
const imageFile = document.getElementById("image").files[0];
let imageUrl = "";

if(imageFile){
  imageUrl = await uploadImage(imageFile);
}
  if (!title || !content) {
    alert("እባክህ ሁለቱንም መረጃዎች ሙላ።");
    return;
  }

try {

  let imageUrl = "";

  if (imageFile) {
    imageUrl = await uploadImage(imageFile);
  }

  await addDoc(collection(db, "news"), {
    title: title,
    content: content,
    image: imageUrl,
    createdAt: new Date()
  });

  alert("✅ ዜናው በተሳካ ሁኔታ ተቀምጧል!");

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";

} catch (error) {
  alert("ስህተት: " + error.message);
}
alert("admin.js ተጫኗል");