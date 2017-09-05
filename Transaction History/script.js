
function openSideBar() {
var element = document.getElementById('sidenav');
element.style = "display:block";

}

function closeSideBar() {
var element = document.getElementById('sidenav');
element.style = "display:none";

}


window.onload = function() {
	output = document.getElementById('day'); // Behold the Global Variable "-"
}

function writeMonday() {
	output.innerHTML = "Monday";
}

function writeTuesday() {
	output.innerHTML = "Tuesday";
}

function writeWenesday() {
	output.innerHTML = "Wenesday";
}

function writeThursday() {
	output.innerHTML = "Thursday";
}
function writeFriday() {
	output.innerHTML = "Friday";
}




