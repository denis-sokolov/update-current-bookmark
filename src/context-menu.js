
chrome.contextMenus.create({
  id: 'update-bookmark',
  title: chrome.i18n.getMessage('update_current_bookmark'),
  contexts: ['link']
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
  console.log(info);
});
