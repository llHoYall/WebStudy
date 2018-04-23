function setType(typeName) {
	var type = types[typeName];
	var width = type.width;
	var height = type.height;

	$("#handle").empty().width(width * 25).height(height * 25);

	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			if (type.shape[i][j]) {
				$("<div>").addClass(typeName).addClass("block").appendTo("#handle");
			}
			else {
				$("<div>").addClass("whiteLine").addClass("block").appendTo("#handle");
			}
		}
	}
}

$(document).ready(function () {
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 10; j++) {
			$("<div>").addClass("block none").appendTo("#stage");
		}
	}
	setType("type2");
});