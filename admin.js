import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "ethio-gazeta.firebaseapp.com",
  projectId: "ethio-gazeta",
  storageBucket: "ethio-gazeta.firebasestorage.app",
  messagingSenderId: "395368229201",
  appId: "1:395368229201:web:05659ac1de88b254164b70"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.welcome = function () {
  alert("እንኳን ወደ Ethio Gazeta በደህና መጡ!");
};

window.addNews = async function () {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  try {
    await addDoc(collection(db, "news"), {
      title: title,
      content: content,
      createdAt: new Date()
    });

    alert("ዜናው ተቀምጧል!");

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
  } catch (e) {
    alert("ስህተት: " + e.message);
  }
};