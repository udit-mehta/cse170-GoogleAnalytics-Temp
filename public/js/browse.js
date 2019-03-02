'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */

function changeDropdown(text) {
		console.log("changing dropdown");
		$(".btn:first-child").text(text);
}

function initializePage() {
	console.log("Javascript connected!");
	var i = 0;
	var options = ["Recently uploaded", "Favourites", "Class A", "Class B", "Class C"];

	function changeScreen(e) {
	    i = (i+1)%5;
	    var newlabel = options[i];
		console.log( newlabel );
	    $("#screenlabel").text( newlabel );
	};

	$("#classa").click(function () {
		console.log("classa clicked");
		changeDropdown("Class A");
	});
	$("#classb").click(function () {
		console.log("classb clicked");
		changeDropdown("Class B");
	});
	$("#classcse").click(function () {
		console.log("classcse clicked");
		changeDropdown("CSE courses");
	});
	$("#goleft").click(changeScreen);
	$("#goright").click(changeScreen);

}
