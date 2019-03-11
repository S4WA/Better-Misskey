var map = {
	"move_columns": true,
	"draw_outline": true,
	"draw_numbers": true,
	"close_image": true,
	"resize_image": true,
	"share": true,
	"reload_all" : true,
	"change_with_arrow": true,
	"language": "japanese",
	"css": "",
	"preview_image_on_draft": true,
	"preview_with": "popup"
},
loaded_language = "",
saveBtn, box;

window.onload = function() {
	load();
	document.getElementById("save").onclick = function() { save(); };
	document.getElementById("version").innerText = "v" + chrome.runtime.getManifest().version;
};

function save() {
	var box = document.getElementsByClassName("box"), saveBtn = document.getElementById("save");
	for (var i = 0; i < box.length; i++) map[box[i].id] = box[i].checked;
	map["language"] = document.getElementById("language").value;
	map["preview_with"] = document.getElementById("preview_with").value;
	map["css"] = document.getElementById("css").value;

	chrome.storage.sync.set(map, function() {
		if (loaded_language.toLowerCase() !== map["language"].toLowerCase()) location.reload();

		var doc = document.getElementById("status");
		if (doc.innerText === "") {
			saveBtn.disabled = true;
			doc.innerText = "saved!";
			setTimeout(function() {
				saveBtn.disabled = false;
				doc.innerText = "";
			}, 500);
		}
	});

	if (map["reload_all"]) reloadAll();
}

function load() {
	chrome.storage.sync.get(null, function(items) {
		if (isEmpty(items)) items = map;
		for (var key in items) {
			if (document.getElementById(key) !== null) document.getElementById(key).checked = items[key];
		}
		var lang = items["language"].toLowerCase();
		document.getElementById(lang).selected = true;
		document.getElementById("css").value = items["css"];
		putLangs(lang);
	});
}

function isEmpty(obj){
	return !Object.keys(obj).length;
}

function reloadAll() {
	chrome.tabs.query({
		url: "*://misskey.xyz/*"
	}, function (result) {
		for (var i = 0; i < result.length; i++) {
			chrome.tabs.update(result[i].id, {}, function(tab) {
				var cmd = "location.reload();";
				chrome.tabs.executeScript(tab.id, {code: cmd});
			});
		}
	});
}

function putLangs(lang) {
	var elements = document.getElementsByClassName("translate");
	for (var i = 0; i < elements.length; i++) {
		for (var key in language[lang]) {
			if (elements[i].innerText === "$" + key) {
				elements[i].innerText = language[lang][key];
			}
		}
	}
	loaded_language = lang;
}

var language = {
	"japanese": {
		"move_columns": "カラムを数字キーで移動する",
		"draw_outline": "カラムを数字キーで選んだ時にアウトラインを表示する",
		"draw_numbers": "カラムの数字を表示する",
		"close_image": "エスケープキーで画像を閉じる",
		"resize_image": "画像をリサイズする",
		"share": "タブの共有",
		"reload_all" : "設定を保存したとき全Misskeyのタブをリロードする",
		"change_with_arrow": "矢印キーで画像を操作する",
		"paste_it": "cssをペーストしてください",
		"preview_image_on_draft": "下書きの画像をプレビューする",

		"save": "保存",
		"better_misskey_settings": "Better Misskey 設定",
		"settings": "設定",

		"warn_1": "(拡張機能のリロードが必要です)",
		"warn_2": "(Deckモードでは動作が不安定です)"
	},
	"english": {
		"move_columns": "Move column with number key",
		"draw_outline": "On select column with number key to draw outline",
		"draw_numbers": "Draw number to columns",
		"close_image": "On press escape key to close image",
		"resize_image": "Resize image",
		"share": "Share tab",
		"reload_all" : "On save settings to reload all misskey tabs",
		"change_with_arrow": "Change image with arrow key",
		"paste_it": "paste css here.",
		"preview_image_on_draft": "Preview draft's image",

		"save": "Save",
		"better_misskey_settings": "Better Misskey Options",
		"settings": "Settings",

		"warn_1": "(need reload this extension)",
		"warn_2": "(not better on deck mode)"
	}
}