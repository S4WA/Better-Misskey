var map = {
		"move_columns": true,
		"draw_outline": true,
		"draw_numbers": true,
		"close_image": true,
		"resize_image": true,
		"share": true
	}, data = {}, saveBtn, box;

window.onload = function () {
	load();

	saveBtn = document.getElementById("save");
	box = document.getElementsByClassName("box");

	for (var i = 0; i < box.length; i++) box[i].checked = data[box[i].id];

	saveBtn.onclick = function() { save(); };
};

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
}

function load() {
	chrome.storage.sync.get(null, function(items) {
		for (var key in items) data[key] = items[key];
	});
}

/*for (var i = 0; i < map.length; i++) {
	var key = Object.keys(map[i])[0];
	// console.log(key + ": " + map[i][key]);
	data.push(JSON.parse("{\"" + key + "\":" + !document.getElementById(key).disabled + "}"));
}*/


/*var isEqual = true;
for (var i = 0; i < map.length; i++) {
	if (JSON.stringify(map[i]) === JSON.stringify(data[i])) isEqual = false;
}*/

/*
map = default settings.
data = user's settings.
*/