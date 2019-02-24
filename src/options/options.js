var map = {
	"move_columns": true,
	"draw_outline": true,
	"draw_numbers": true,
	"close_image": true,
	"resize_image": true,
	"share": true,
	"reload_all" : true
}, data = {}, saveBtn, box;

document.addEventListener("DOMContentLoaded", function() {
	load();

	saveBtn = document.getElementById("save");
	box = document.getElementsByClassName("box");

	for (var i = 0; i < box.length; i++) box[i].checked = data[box[i].id];

	saveBtn.onclick = function() { save(); };
});

function save() {
	var box = document.getElementsByClassName("box");
	for (var i = 0; i < box.length; i++) map[box[i].id] = box[i].checked;

	chrome.storage.sync.set(map, function() {
		var doc = document.getElementById("status");
		if (doc.innerText !== "") {
			doc.innerText = "saved!";
			setTimeout(function() {
				doc.innerText = "";
			}, 900);
		}
	});

	if (map["reload_all"]) reloadAll();
}

function load() {
	chrome.storage.sync.get(null, function(items) {
		for (var key in items) data[key] = items[key];
	});
}

function reloadAll() {
	chrome.tabs.query({
		url: "*://misskey.xyz/*"
	}, function (result) {
		if (result.length !== 0) {
			chrome.tabs.update(result[0].id, {}, function(tab) {
				var code = "window.location.reload();";
				for (var i = 0; i < tab.length; i++) chrome.tabs.executeScript(tab[i].id, {code: code});
			});
		};
	});
}

/*
map = default settings.
data = user's settings.
*/