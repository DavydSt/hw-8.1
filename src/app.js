const input = document.querySelector("#bookmarkInput");
const addBtn = document.querySelector("#addBookmarkBtn");
const listRef = document.querySelector("#bookmarkList");

let urlList = JSON.parse(localStorage.getItem("url")) || [];

const render = function () {
  listRef.innerHTML = urlList
    .map(
      (url, index) => `<li>
  <a target="_blank" href="${url}">${url}</a>
  <button type="button" data-index="${index}" class="delete" >видалити</button>
  <button type="button" data-index="${index}" class="edit" >редагуйти</button>
</li>`
    )
    .join("");
};

const save = function () {
  localStorage.setItem("url", JSON.stringify(urlList));
  render();
};

addBtn.addEventListener("click", () => {
  const url = input.value.trim();
  if (url) {
    urlList.push(url);
    input.value = "";
    save();
  }
});

listRef.addEventListener("click", (event) => {
  const index = event.target.dataset.index;
  if (event.target.nodeName !== "BUTTON") {
    return;
  }
  if (event.target.classList.contains("edit")) {
    const newUrl = prompt("редагуйте поселання!", urlList[index]);
    if (newUrl) {
      urlList[index] = newUrl;
      save();
    }
  }
  if (event.target.classList.contains("delete")) {
    urlList.splice(index, 1);
    save();
  }
});
render();

// -=-  //

const userName = document.querySelector("#username");
const passWord = document.querySelector("#password");
const saveBtn = document.querySelector("#saveBtn");

userName.value = localStorage.getItem("user") || "";
passWord.value = localStorage.getItem("passwort") || "";

userName.addEventListener("input", () => {
  return localStorage.setItem("userName", userName.value);
});
passWord.addEventListener("input", () => {
  return localStorage.setItem("passWord", passWord.value);
});
passWord.addEventListener("click", () => {
  localStorage.removeItem("userName");
  localStorage.removeItem("passWort");
  userName.value = "";
  passWord.value = "";
});
