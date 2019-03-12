/*chrome.tabs.create({
	"url": chrome.extension.getURL("options/options.html"),
});
*/

function settings() {
	console.log("Better Misskey v" + chrome.runtime.getManifest().version);
	chrome.storage.sync.get(null, function(items) {
		for (var key in items) {
			console.log(key + ": " + items[key]);
		}
	});
}