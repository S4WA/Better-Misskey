chrome.contextMenus.removeAll();
chrome.storage.sync.get(null, function(items) {
	if (items["share"]) {
		chrome.contextMenus.create({
			"title": "Misskeyで共有する",
			"onclick": function () {
				chrome.tabs.getSelected(null, function(tab) {
					var str = tab.title + " " + tab.url;
					// console.log(str);

					chrome.tabs.query({
						url: "*://misskey.xyz/*"
					}, function (result) {
						if (result.length !== 0) {
							var cmd = "var drafts = JSON.parse(localStorage.drafts); drafts.note.data.text = \"" + str + "\"; localStorage.drafts = JSON.stringify(drafts); location.reload();";
							chrome.tabs.update(result[0].id, { active : true }, function(tab) {
								chrome.tabs.executeScript(result[0].id, { code: cmd })
							});
						};
					});
				});
			}
		});
	}
});
