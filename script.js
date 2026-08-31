import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
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


let allNews = [];


// ዜናዎችን ከ Firebase ማምጣት
async function loadNews() {

  const newsBox = document.getElementById("news");

  newsBox.innerHTML = "ዜናዎች እየጫኑ ነው...";

  try {

    const querySnapshot =
      await getDocs(collection(db, "news"));

    allNews = [];

    querySnapshot.forEach((doc) => {

      const data = doc.data();

      allNews.push({
        id: doc.id,
        ...data
      });

    });

    displayNews(allNews);

  } catch (error) {

    console.error(error);

    newsBox.innerHTML =
      "ዜናዎችን ማምጣት አልተቻለም።";

  }
}


// ዜናዎችን ማሳየት
function displayNews(newsList) {

  const newsBox = document.getElementById("news");

  newsBox.innerHTML = "";


  if (newsList.length === 0) {

    newsBox.innerHTML = "<p>ምንም ዜና አልተገኘም።</p>";

    return;
  }


  newsList.forEach((data) => {

    newsBox.innerHTML += `

      <article class="card">

        ${
          data.image
          ? `<img src="${data.image}" alt="${data.title}">`
          : ""
        }

        <h2>${data.title || "ያለ ርዕስ"}</h2>
       
        <button onclick="readMore('${newsDoc.id}')">
  ተጨማሪ አንብብ
</button>

        <p>${data.content || ""}</p>

        <button onclick="readNews('${data.id}')">
  ተጨማሪ አንብብ
</button>

      </article>

    `;

  });

}


// Search
window.searchNews = function () {

  const input =
    document.getElementById("searchInput");

  const searchText =
    input.value.toLowerCase().trim();

  if (searchText === "") {
    displayNews(allNews);
    return;
  }

  const results = allNews.filter((news) => {

    const title =
      (news.title || "").toLowerCase();

    const content =
      (news.content || "").toLowerCase();

    return (
      title.includes(searchText) ||
      content.includes(searchText)
    );

  });

  displayNews(results);
};


// ተጨማሪ አንብብ
window.readNews = function(id) {
  window.location.href = `news.html?id=${id}`;
};


// ዜናዎችን ጀምር
loadNews();
window.filterNews = function (category) {

  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {

    const cardCategory =
      card.dataset.category;

    if (
      category === "all" ||
      cardCategory === category
    ) {

      card.style.display = "";

    } else {

      card.style.display = "none";

    }

  });

};
window.readMore = function (id) {

  window.location.href =
    "news.html?id=" + id;

};