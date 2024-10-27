export default function (src, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) return callback(xhr.status + "\n" + xhr.responseText, "");
		callback(!1, xhr.responseText);
	};
	xhr.open('get', src, true);
	xhr.send(null);
};