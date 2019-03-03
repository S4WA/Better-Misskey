var map = {
	"move_columns": true,
	"draw_outline": true,
	"draw_numbers": true,
	"close_image": true,
	"resize_image": true,
	"share": true,
	"reload_all" : true,
	"language": "japanese"
},
data = {},
language = {
	"japanese": {
		"move_columns": "カラムを数字キーで移動する",
		"draw_outline": "カラムを数字キーで選んだ時にアウトラインを表示する",
		"draw_numbers": "カラムの数字を表示する",
		"close_image": "エスケープキーで画像を閉じる",
		"resize_image": "画像をリサイズする",
		"share": "タブの共有",
		"reload_all" : "設定を保存したとき全Misskeyのタブをリロードする",
		"save": "保存",
		"better-misskey-settings": "Better Misskey 設定",
		"settings": "設定"
	},
	"english": {
		"move_columns": "Move column with number key",
		"draw_outline": "On select column with number key to draw outline",
		"draw_numbers": "Draw number to columns",
		"close_image": "On press escape key to close image",
		"resize_image": "Resize image",
		"share": "Share tab",
		"reload_all" : "On save settings to reload all misskey tabs",
		"save": "Save",
		"better-misskey-settings": "Better Misskey Options",
		"settings": "Settings"
	}
},
saveBtn, box;

window.onload = function() {
	load();

	saveBtn = document.getElementById("save");
	saveBtn.onclick = function() { save(); };
};

function save() {
	var box = document.getElementsByClassName("box"), saveBtn = document.getElementById("save");
	for (var i = 0; i < box.length; i++) map[box[i].id] = box[i].checked;
	map["language"] = document.getElementById("language").value;

	chrome.storage.sync.set(map, function() {
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
		for (var key in items) {
			data[key] = items[key];
			if (document.getElementById(key) !== null) document.getElementById(key).checked = items[key];
		}
		var lang = items["language"].toLowerCase();
		document.getElementById(lang).selected = true;
		putLangs(lang);
	});
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
}

/*

map = default settings.
data = user's settings.

*/