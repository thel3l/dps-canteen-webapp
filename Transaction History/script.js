function debug() {
	window.alert("This works");
}

function openSideBar() {
var element = document.getElementById('sidenav');
element.style = "display:block";

}

function closeSideBar() {
var element = document.getElementById('sidenav');
element.style = "display:none";
card.style  =  "top:140px;left:400px;";
title.style =  "left:550px;";
}


window.onload = function() {
	// Behold the Global Variables "-"
	output = document.getElementById('day'); //card heading 
   sidebar = document.getElementById('sbopen');  //hamburger
    title = document.getElementById('title');    //header heading
    card = document.querySelector(".card");     // card 
    menu = document.getElementById('menu');   //card paragraph 
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

function  prestoColor() {
     card.style = "top:150px;left:525px;";
     title.style = "left:650px;";
}