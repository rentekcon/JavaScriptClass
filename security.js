/*  JavaScript 6th Edition
    Chapter 10
    Chapter case

    Oak Top House
    Author: 
    Date:   

    Filename: script.js
*/

"use strict";

var waitForUser;

// configure page to display Directions content
function loadDirections(string) {
   
   //added ch 10
   geoTest();
}
//added ch 10
function geoTest() {
	
	//set a timer
	waitForUser = setTimeout(fail, 10000);
	//print the location in the console
	if (navigator.geolocation) { 
		navigator.geolocation.getCurrentPosition(createDirections, fail, {timeout: 10000}); 
	}else{
		fail();
	}
	
}

//added ch 10
function createDirections(position) {
	//got here so clear the timer
	clearTimeout(waitForUser);
	
		//console.log("Longitude: " + position.coords.longitude); 
		//console.log("Latitude: " + position.coords.latitude);
	
	var currPosLat = position.coords.latitude; 
	var currPosLng = position.coords.longitude;
	var mapOptions = { center: new google.maps.LatLng(currPosLat, currPosLng), zoom: 12 };
	 var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	 

	
}

//added ch 10
function fail() { 
	//console.log("Geolocation information not available or not authorized.");
	document.getElementById("map").innerHTML = "Unable to access your current location.";

}

function setUpPage() {
	
}
// run setUpPage() function when page finishes loading
window.addEventListener("load", setUpPage, false);