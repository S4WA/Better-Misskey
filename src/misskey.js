var columns = new Array(), currentColumn, numIntervalEnabled = false, color;
var imgDoc, files = new Array(), currentImageNum = 0, imgText;
var notes, loadedNotes = new Array();
var map = {
	"move_columns": true,
	"draw_outline": true,
	"draw_numbers": true,
	"close_image": true,
	"resize_image": true,
	"share": true,
	"reload_all" : true,
	"change_with_arrow": true,
	"css": "",
	"preview_image_on_draft": true,
	"preview_with": "popup"
};

window.onload = function() {
	loadSettings();
	getThemeColor();

	if (isDeckMode()) {
		if (map["move_columns"]) {
			setInterval(function() {
				columns = document.getElementsByClassName("dnpfarvgbnfmyzbdquhhzyxcmstpdqzs active");
				for (var i = 0; i < columns.length; i++) {
					columns[i].id = "c" + i;
					columns[i].onclick = "return false";
				}
			}, 1000);
		}

		if (map["draw_numbers"]) {
			setTimeout(function() {
				for (var i = 0; i < columns.length; i++) {
					var number = document.createElement("span");
					number.innerText = (i + 1);
					columns[i].childNodes[0].appendChild(number);
				}
			}, 1100)
		}
	}

	previewDraftImage();

	setInterval(function() {
		document.body.style = map["css"];
	}, 500);
};

document.onkeydown = function(event) {
	event = (event || window.event);
	// console.log(event.keyCode);

	if (map["move_columns"]) moveColumn(event);

	if (map["change_with_arrow"]) switchImage(event);
	if (canSwitchImage() && (event.keyCode === 37 || event.keyCode === 39)) {return false;}

	if (map["close_image"]) {
		if (imgDoc !== null && !enabledShortcutKey(event) && event.keyCode === 27) {
			document.getElementsByClassName("dkjvrdxtkvqrwmhfickhndpmnncsgacq")[0].childNodes[1].click();
		}
	}
};

document.onkeyup = function(event) {
	if (map["draw_outline"]) {
		if (document.getElementById("c" + (event.keyCode - 49)) !== null) {
			event = (event || window.event);
			var currentColumDoc = document.getElementById("c" + (event.keyCode - 49));
			currentColumDoc.style.boxShadow = "";
		}
	}
};

document.onclick = function(event) {
	if (event.srcElement.className === "gqnyydlzavusgskkfvwvjiattxdzsqlf") {
		setTimeout(function() {
			imgDoc = document.getElementsByClassName("dkjvrdxtkvqrwmhfickhndpmnncsgacq");
			if (imgDoc.length !== 0 && imgDoc[0].childNodes.length !== 0) {
				var doc = imgDoc[0].childNodes[1], fileElems = event.path[4].childNodes[0].childNodes[0].childNodes[0].childNodes, bgElems = document.getElementsByClassName("bg"), bg;
				for (var i = 0; i < fileElems.length; i++) files.push(fileElems[i].href);
				for (var i = 0; i < bgElems.length; i++) if (bgElems[i].parentElement === imgDoc[0]) bg = bgElems[i];

				// imgDoc[0].removeChild(imgDoc[0].childNodes[0]);


				if (map["resize_image"]) {
					if (doc.height >= window.innerHeight/2) doc.width = doc.width/1.3;
					doc.title = "";

					bg.style.background = "rgba(0, 0, 0, .2)";

					imgText = document.createElement("h4");
					imgText.style.color = "black";
					imgText.style.textShadow = "#fff 0px 0px 2px, #fff 0px 0px 2px, #fff 0px 0px 2px, #fff 0px 0px 2px, #fff 0px 0px 2px, #fff 0px 0px 2px";
					imgText.innerText = (currentImageNum + 1) + "/" + files.length;
					var center = document.createElement("center");
					center.appendChild(imgText);
					imgDoc[0].appendChild(center);
				}
			}
		}, 350);
	} else if (event.path[1] !== null && event.path[1].className === "dkjvrdxtkvqrwmhfickhndpmnncsgacq") {
		imgDoc = null;
		imgText = null;
		files = new Array();
		currentImageNum = 0;
	}
};

// Utils
function loadSettings() {
	chrome.storage.sync.get(null, function(items) {
		for (var key in items) map[key] = items[key];
	});
}

function isDeckMode() {
	return document.getElementsByClassName("dnpfarvgbnfmyzbdquhhzyxcmstpdqzs active").length !== 0;
}

function canSwitchImage() {
	return imgDoc !== null && files.length !== 0;
}

function enabledShortcutKey(event) {
	return (event.shiftKey || event.altKey || event.ctrlKey || event.metaKey);
}

function getThemeColor() {
	/*fetch("https://misskey.xyz/manifest.json")
		.then(res => res.json())
		.then(json => {
			color = json.theme_color;
		});*/
	color = JSON.parse(localStorage.theme).primary;
}

function moveColumn(event) {
	if (isDeckMode() && !numIntervalEnabled && !enabledShortcutKey(event)) {
		if (event.keyCode >= 49 && event.keyCode <= 56) {
			window.open("#c" + (event.keyCode - 49), "_self", "");
		}
		if (event.keyCode === 57) {
			window.open("#c" + (columns.length - 1), "_self", "");
		}

		if ((event.keyCode >= 49 && event.keyCode <= 57) && (document.getElementById("c" + (event.keyCode - 49)) !== null)) {
			numIntervalEnabled = true;
			setTimeout(function() {
				numIntervalEnabled = false;
			}, 100)

			var currentColumDoc = document.getElementById("c" + fixKeyNumber(event.keyCode - 49));
			if (currentColumn === (event.keyCode - 49)) {
				currentColumDoc.childNodes[0].click()
			}
			currentColumn = event.keyCode - 49;

			if (map["draw_outline"]) {
				currentColumDoc.style.boxShadow = "0 0 0 2.5px " + color;
				window.open("#", "_self", "");
			}
		}
	}
}

function fixKeyNumber(int) {
	if (int === 8) {
		return columns.length - 1;
	} else {
		return int;
	}
	console.log(int);
}

function switchImage(event) {
	if (canSwitchImage()) {
		var imgElem = imgDoc[0].childNodes[1];
		switch(event.keyCode) {
			case 37: { // left
				currentImageNum--;
				if (currentImageNum < 0) currentImageNum = files.length-1;
				break;
			}
			case 39: { // right
				currentImageNum++;
				if (currentImageNum >= files.length) currentImageNum = 0;
				break;
			}
		}
		if (event.keyCode === 37 || event.keyCode === 39) {
			// console.log("current: " + currentImageNum + ", " + "key: " + event.keyCode);
			imgElem.src = files[currentImageNum];
			if (imgText != null) imgText.innerText = (currentImageNum + 1) + "/" + files.length;
		}
	}
}

function previewDraftImage() {
	setInterval(function() {
		if (document.getElementsByClassName("img") != null && map["preview_image_on_draft"]) {
			var images = document.getElementsByClassName("img");
			for (var i = 0; i < images.length; i++) {
				if (images[i].parentElement != null && images[i].parentElement.parentElement && images[i].parentElement.parentElement.parentElement && images[i].parentElement.parentElement.parentElement.className === "files") {
					images[i].onclick = function() {
						var url = this.style.backgroundImage.replace("url(\"", "").replace("\")", "");
						window.open(url, "_" + map["preview_with"], map["preview_with"] === "popup" ? "width = auto, height = auto" : "");
					}
				}
			}
		}
	}, 500);
}

// うぃ