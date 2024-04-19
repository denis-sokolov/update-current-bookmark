chrome.contextMenus.create({
  id: "update-bookmark",
  title: chrome.i18n.getMessage("update_current_bookmark"),
  contexts: ["link"],
});

var say = function (id) {
  alert(chrome.i18n.getMessage(id));
};

var findBookmarkId = function (currentUrl, callback) {
  chrome.bookmarks.search(
    {
      url: currentUrl,
    },
    function (results) {
      if (results.length === 0) return say("current_page_not_bookmarked");
      if (results.length > 1)
        return say("current_page_bookmarked_multiple_times");
      callback(results[0].id);
    },
  );
};

chrome.contextMenus.onClicked.addListener(function (info) {
  chrome.permissions.request(
    {
      permissions: ["bookmarks"],
    },
    function (granted) {
      if (!granted) return;
      findBookmarkId(info.pageUrl, function (id) {
        chrome.bookmarks.update(id, {
          url: info.linkUrl,
        });
      });
    },
  );
});
