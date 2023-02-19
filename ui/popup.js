const reloadUrls = (urlList, urls) => {
  urlList.innerHTML = "";

  for (let u of urls) {
    const ud = document.createElement("div");
    ud.className = "url";
    ud.innerHTML = `<span>${u}</span>`;
    const b = document.createElement("button");
    ud.appendChild(b);
    b.innerText = "x";
    b.onclick = async () => {
      let prev = (await chrome.storage.local.get("urls")).urls ?? [];
      if (prev.length) prev = prev.filter((i) => i != u);
      chrome.storage.local.set({ urls: prev });
      urlList.removeChild(ud);
    };
    urlList.appendChild(ud);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const urlList = document.createElement("div");
  urlList.className = "url-list";
  document.querySelector(".container").appendChild(urlList);
  const btn = document.getElementById("addbtn");
  const url_input = document.getElementById("input");
  let prev = (await chrome.storage.local.get("urls")).urls ?? [];
  reloadUrls(urlList, prev);

  btn.onclick = async (e) => {
    prev.push(url_input.value);
    await chrome.storage.local.set({ urls: prev });
    reloadUrls(urlList, prev);
  };
});
