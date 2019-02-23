window.onload = function() {
	console.log(
		"option page\n - chrome-extension://labahgkpdplhaehfiepkjdgmgpkmlcie/options/options.html" + "\n" + 
		"source code\n - https://github.com/S4WA/Better-Misskey"
	);
}

chrome.contextMenus.removeAll();
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
					chrome.tabs.update(result[0].id, { active : true }, function(tab) {
						var cmd = "var drafts = JSON.parse(localStorage.drafts); drafts.note.data.text = \"" + str + "\"; localStorage.drafts = JSON.stringify(drafts); location.reload();";
						/*cmd += "var arena = document.getElementsByClassName(\"textarea\"), elem = arena[0];" + 
							"if (arena.length !== 0 && elem.hasChildNodes) {elem.childNodes[0].innerText = \"" + str + "\";}" + 
							"var btn = document.getElementsByClassName(\"dmtdnykelhudezerjlfpbhgovrgnqqgr submit primary\"); if (btn.length !== 0) {for (var i = 0; i < btn.length; i++) {btn[i].disabled = false;}} ";*/

						console.log(cmd);
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