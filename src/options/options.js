var saveBtn = document.body, map = [
	{"move-columns": true},
	{"draw-outline": true},
	{"draw-numbers": true},
	{"close-image": true},
	{"resize-image": true},
	{"share": true}
];

window.onload = function () {
	saveBtn = document.getElementById("save");
	// saveBtn.disabled = true;

	saveBtn.onclick = function() {
		save();
	};
};

function save() {
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