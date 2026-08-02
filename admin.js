import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
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
const storage = getStorage(app);
window.addNews = async function () {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
const imageFile = document.getElementById("image").files[0];
  if (!title || !content) {
    alert("እባክህ ሁለቱንም መረጃዎች ሙላ።");
    return;
  }

  try {let imageUrl = "";

if (imageFile) {
  const imageRef = ref(storage, "newsImages/" + imageFile.name);

  await uploadBytes(imageRef, imageFile);

  imageUrl = await getDownloadURL(imageRef);
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
};