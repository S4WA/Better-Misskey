var columns = new Array(), currentColumn, numIntervalEnabled = false;
var imgDoc, files = new Array(), currentImageNum = 0, imgText;
var notes, loadedNotes = new Array();
	var map = [
		{"move-columns": true},
		{"draw-outline": true},
		{"draw-numbers": true},
		{"close-image": true},
		{"resize-image": true},
		{"share": true}
	];

window.onload = function() {
	if (isDeckMode()) {
		// ※1
		setInterval(function() {
			columns = document.getElementsByClassName("dnpfarvgbnfmyzbdquhhzyxcmstpdqzs active");
			for (var i = 0; i < columns.length; i++) columns[i].id = "c" + i;
		}, 1000);

		// ※4
		setTimeout(function() {
			for (var i = 0; i < columns.length; i++) {
				var number = document.createElement("span");
				number.innerText = (i + 1);
				columns[i].childNodes[0].appendChild(number);
			}
		}, 1100)
	}

	// ※6
	clearReplyElem();

	// ※7
	putJumpNotesBtn();
};

document.onkeydown = function(event) {
	event = (event || window.event);
	// console.log(event.keyCode);

	// ※1
	moveColumn(event);

	// ※3
	switchImage(event);
	if (canSwitchImage() && (event.keyCode === 37 || event.keyCode === 39)) {return false;}

	// ※5
	if (imgDoc !== null && !enabledShortcutKey(event) && event.keyCode === 27) {
		document.getElementsByClassName("dkjvrdxtkvqrwmhfickhndpmnncsgacq")[0].childNodes[1].click();
	}
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
			if (imgDoc.length !== 0 && imgDoc[0].hasChildNodes) {
				var doc = imgDoc[0].childNodes[1], fileElems = event.path[4].childNodes[0].childNodes[0].childNodes[0].childNodes, bgElems = document.getElementsByClassName("bg"), bg;
				for (var i = 0; i < fileElems.length; i++) files.push(fileElems[i].href);
				for (var i = 0; i < bgElems.length; i++) if (bgElems[i].parentElement === imgDoc[0]) bg = bgElems[i];

				// imgDoc[0].removeChild(imgDoc[0].childNodes[0]);

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

			var currentColumDoc = document.getElementById("c" + fixKeyNumber(event.keyCode - 49));
			if (currentColumn === (event.keyCode - 49)) {
				currentColumDoc.childNodes[0].click()
			}
			currentColumn = event.keyCode - 49;

			// ※2
			currentColumDoc.style.boxShadow = "0 0 0 2.5px " + getThemeColor();
			window.open("#", "_self", "");
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
			imgText.innerText = (currentImageNum + 1) + "/" + files.length;;
		}
	}
}

function clearReplyElem() {
	/*setInterval(function() {
		notes = document.getElementsByClassName("reply-to")
		for (var i = 0; i < notes.length; i++) {
			if (!loadedNotes.includes(notes[i])) {
				loadedNotes.push(notes[i]);
				var parent = notes[i].parentElement, visibleBtn = document.createElement("div");

				visibleBtn.onclick = "this.display = (this.display == 'none') ? 'block' : 'none';"
				visibleBtn.innerText = "visible reply";
				visibleBtn.className = "havbbuyv";
				visibleBtn.appendChild(notes[i]);

				parent.appendChild(visibleBtn);
				parent.removeChild(notes[i]);
			}
		}
	}, 1000);*/
}

function putJumpNotesBtn() {
	if (!isDeckMode() && document.getElementsByClassName("mk-notes").length !== 0 && document.getElementsByClassName("notes-count router-link-exact-active router-link-active").length !== 0) {
		document.getElementsByClassName("mk-notes")[0].id = "notes";
		document.getElementsByClassName("notes-count router-link-exact-active router-link-active")[0].href = "#notes"
	}
}

/*
	memo:
		※1 : "数字キーでカラムの横移動"
		※2 : "選択されているカラムのbox-shadow style操作"
		※3 : "画像の調節"
		※4 : "カラムに数字をつける"
		※5 : "エスケープキーで画像exit(不完全)"
		※6 : "リプライの送信先ノートをクリックで見る形にする(やり方が好きじゃないけどこれ以外いい方法がない)"
*/