chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'explainAI',
    title: 'Explain with AI',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'explainAI') {
    const selectedText = info.selectionText;
    chrome.windows.create({
      url: `popup.html?text=${encodeURIComponent(selectedText)}`,
      type: 'popup',
      width: 400,
      height: 600,
    });
  }
});
