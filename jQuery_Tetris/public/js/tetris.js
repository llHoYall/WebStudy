$(document).ready(function () {
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 10; j++) {
			$("<div>").addClass("block none").appendTo("#stage");
		}
	}
});