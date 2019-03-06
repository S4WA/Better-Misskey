console.log(
	"option page\n - chrome-extension://" + chrome.i18n.getMessage("@@extension_id") + "/options/options.html" + "\n" + 
	"source code\n - https://github.com/S4WA/Better-Misskey"
);

/*chrome.tabs.create({
	"url": chrome.extension.getURL("options/options.html"),
});
*/