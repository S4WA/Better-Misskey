chrome.contextMenus.removeAll();
chrome.contextMenus.create({
	"title": "Misskeyで共有する",
	"onclick": function () {
		chrome.tabs.getSelected(null, function(tab) {
			var str = tab.title + " " + tab.url;
			console.log(str);

			chrome.tabs.query({
				url: "*://misskey.xyz/*"
			}, function (result) {
				if (result.length !== 0) {
					chrome.tabs.update(result[0].id, { active : true }, function(tab) {
						var cmd = "var drafts = JSON.parse(localStorage.drafts); drafts.note.data.text = \"" + str + "\"; localStorage.drafts = JSON.stringify(drafts);";
						cmd += "var arena = document.getElementsByClassName(\"textarea\"), elem = arena[arena.length-1];" + 
							"if (arena.length !== 0 && elem.hasChildNodes) {elem.childNodes[0].innerText = \"" + str + "\";}" + 
							"if (elem.hasChildNodes) {elem.childNodes[elem.childNodes.length-1].disabled = \"enabled\";}";

						chrome.tabs.executeScript(tab.id, {
								code: cmd
							}
						);
						location.reload();
					});
				};
			});
		});
	}
});