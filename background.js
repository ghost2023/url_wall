chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  let urls = (await chrome.storage.local.get("urls")).urls ?? [];
  for (let u of urls) {
    if (tab.url.includes(u)) {
      chrome.tabs.remove(tabId);
      break;
    }
  }
});
