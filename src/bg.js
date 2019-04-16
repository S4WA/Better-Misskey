chrome.contextMenus.removeAll();
chrome.storage.sync.get(null, function(items) {
	if (isEmpty(items)) items["share"] = true;
	if (items["share"]) {
		chrome.contextMenus.create({
			"title": "Misskeyで共有する",
			"onclick": function () {
				chrome.tabs.getSelected(null, function(tab) {
					var str = tab.title + " " + tab.url, targets = ["*://misskey.xyz/*", "*://misskey.io/*"];
					for (var i in targets) {
						chrome.tabs.query({
							url: targets[i]
						}, function (result) {
							if (result.length !== 0) {
								var cmd = "var drafts = JSON.parse(localStorage.drafts); drafts.note.data.text = \"" + str + "\"; localStorage.drafts = JSON.stringify(drafts); location.reload();";
								chrome.tabs.update(result[0].id, { active : true }, function(tab) {
									chrome.tabs.executeScript(result[0].id, { code: cmd })
								});
							};
						});
					}
				});
			}
		});
	}
});

function isEmpty(obj){
	return !Object.keys(obj).length;
}