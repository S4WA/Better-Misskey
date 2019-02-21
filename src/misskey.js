var columns;
window.onload = function() {
	if (isDeckMode()) {
		columns = document.getElementsByClassName("dnpfarvgbnfmyzbdquhhzyxcmstpdqzs active");
		for (var i = 0; i < columns.length; i++) columns[i].id = "c" + i;
	}
}

document.onkeydown = function (event) {
	if (isDeckMode()) {
		event = (event || window.event);
		if (event.keyCode >= 49 && event.keyCode <= 56) {
			window.open("#c" + (event.keyCode - 49), "_self", "");
		}
		if (event.keyCode === 57) {
			window.open("#c" + (columns.length - 1), "_self", "");
		}
	}
}

function isDeckMode() {
	return document.getElementsByClassName("dnpfarvgbnfmyzbdquhhzyxcmstpdqzs active").length !== 0;
}