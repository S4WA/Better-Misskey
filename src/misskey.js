var columns, currentColumn, numIntervalEnabled = false;
var imgDoc, files = new Array(), currentImageNum = 0, imgText;

window.onload = function() {
	if (isDeckMode()) {
		// ※1
		columns = document.getElementsByClassName("dnpfarvgbnfmyzbdquhhzyxcmstpdqzs active");
		for (var i = 0; i < columns.length; i++) columns[i].id = "c" + i;
	}
};

document.onkeydown = function(event) {
	event = (event || window.event);
	// console.log(event.keyCode);

	// ※1
	moveColumn(event);

	// ※3
	switchImage(event);
	if (canSwitchImage() && (event.keyCode === 37 || event.keyCode === 39)) {return false;}

	// ※4
	exitImageElem(event);
};

document.onkeyup = function(event) {
	// ※2
	if (document.getElementById("c" + (event.keyCode - 49)) !== null) {
		event = (event || window.event);
		var currentColumDoc = document.getElementById("c" + (event.keyCode - 49));
		currentColumDoc.style.boxShadow = "";
	}
};

// ※3
document.onclick = function(event) {
	if (event.srcElement.className === "gqnyydlzavusgskkfvwvjiattxdzsqlf") {
		setTimeout(function() {
			imgDoc = document.getElementsByClassName("dkjvrdxtkvqrwmhfickhndpmnncsgacq");
			var doc = imgDoc[0].childNodes[1], fileElems = event.path[4].childNodes[0].childNodes[0].childNodes[0].childNodes;
			for (var i = 0; i < fileElems.length; i++) files.push(fileElems[i].href);

			doc.width = doc.width/1.3;
			doc.title = "";

			imgText = document.createElement("span");
			imgText.style.color = "fff";
			imgText.innerText = (currentImageNum + 1) + "/" + files.length;
			var center = document.createElement("center");
			center.appendChild(imgText);
			imgDoc[0].appendChild(center);
		}, 350);
	} else if (event.path[1] !== null && event.path[1].className === "dkjvrdxtkvqrwmhfickhndpmnncsgacq") {
		imgDoc = null;
		imgText = null;
		files = new Array();
		currentImageNum = 0;
	}
};

// Utils
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
	// rgb(251, 111, 200)
	var color = "rgb(100, 100, 100)"; // document.getElementsByClassName("note")[0].childNodes[0].style.backgroundColor
	return color;
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

			var currentColumDoc = document.getElementById("c" + (event.keyCode - 49));
			if (currentColumn === (event.keyCode - 49)) {
				currentColumDoc.childNodes[0].click()
			}
			currentColumn = event.keyCode - 49;

			// ※2
			currentColumDoc.style.boxShadow = "0 0 0 2.5px " + getThemeColor();
		}
	}
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
			imgText.innerText = (currentImageNum + 1) + "/" + files.length;;
		}
	}
}

function exitImageElem(event) {
	if (imgDoc !== null && event.keyCode === 27) document.body.removeChild(document.getElementsByClassName("dkjvrdxtkvqrwmhfickhndpmnncsgacq")[0]);
}

/*
	memo:
		※1 : "数字キーでカラムの横移動"
		※2 : "選択されているカラムのbox-shadow style操作"
		※3 : "画像の調節"
		※4 : "エスケープキーで画像を閉じる"
*/