/* 
* 
* 	JavaScript 6th Edition
* 	Chapter 7 
* 	Chapter case
*
* 	Outer Orbits 
*	Author:
*	Date:
*
*	Filename: orbits.js

*/
 
 "use strict"; // interpret contents in JavaScript strict mode

 //get all the date objects
var dateObject = new Date();
var dateObject1 = new Date();
var dateObject2 = new Date();
var whichOne = 1; //so I know which one it is
//use for form validation
var formValidity = true;


function displayCalendar1(whichMonth) {
	dateObject = dateObject1;
	whichOne = 1;
	displayCalendar(whichMonth);
}

function displayCalendar2(whichMonth) {
	dateObject = dateObject2;
	whichOne = 2;
	displayCalendar(whichMonth);
}
	

function displayCalendar(whichMonth){
	
	var date; 
	var dateToday = new Date(); 
	var dayOfWeek; 
	var daysInMonth; 
	var dateCells; 
	var captionValue; 
	var month; 
	var year; 
	var monthArray = ["January","February","March","April","May", "June","July","August","September","October","November", "December"];

	//used to navigate to previous or next month using the buttons
	if(whichMonth === -1)
		dateObject.setMonth(dateObject.getMonth() -1);
	else if (whichMonth === 1)
		dateObject.setMonth(dateObject.getMonth() + 1);
	
	//set all the variables
	month = dateObject.getMonth();
	year = dateObject.getFullYear();
	dateObject.setDate(1);
	dayOfWeek = dateObject.getDay();
	captionValue = monthArray[month] + " " + year;
	document.querySelector("#cal table caption").innerHTML = captionValue;
	
	//how many days in a month
	switch(month){
		case 0:
		case 2:
		case 4:
		case 6:
		case 7:
		case 9:
		case 11:
			daysInMonth = 31;
			break;
		
		case 1:
			//check for leap year
			daysInMonth = 28;
			
			if( year % 4 === 0) 
				if (year % 100 === 0) 
					//divisible by 4 and 100, must also be divisible by 400
					if(year % 400 === 0)
						daysInMonth = 29;
				else daysInMonth = 29; //divisible by 4 but not 100
			break;
			
		default:
			daysInMonth = 30;
			break;
	}
		
	//remove all data from the table.
	dateCells = document.getElementsByTagName("td");
	for(var i=0; i< dateCells.length; i++) {
		dateCells[i].innerHTML = "";
		dateCells[i].className = "";
	}
	
	//add dates to calendar table
	for (var i = dayOfWeek; i < daysInMonth + dayOfWeek; i++) { 
		// add dates to days cells 
		dateCells[i].innerHTML = dateObject.getDate(); 
		dateCells[i].className = "date";
		if (dateToday < dateObject) { 
			dateCells[i].className = "futuredate";
		}
		date = dateObject.getDate() + 1; 
		dateObject.setDate(date);
	}
	
	// reset month to month shown 
		dateObject.setMonth(dateObject.getMonth() - 1); 
	//show calendar if not shown
		document.getElementById("cal").style.display = "block";
}

// select the date on the calendar
//the event passed in is the event that triggered this call
function selectDate(event) {
	if(event === undefined)
		event = window.event;
	
	//store the element that received the event.
	var callerElement = event.target || event.srcElement;
	if(callerElement.innerHTML === "") {
		//no date so don't close the calendar
		document.getElementById("cal").style.display = "block";
		return false;
	}
	
	//figure which object to use
	var calObject = this.id;
	
	//sets the date portion of the dateObject to the contents of the cell the user clicked
	dateObject.setDate(callerElement.innerHTML);
	
	//get the current date and time
	var fullDateToday = new Date(); 
	//get just the date
	var dateToday = Date.UTC(fullDateToday.getFullYear(), fullDateToday.getMonth(), fullDateToday.getDate());
	//the date the user selected
	var selectedDate = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
	
	//picked an old date
	if( selectedDate <= dateToday){
		document.getElementById("cal").style.display = "block"; 
	
		return false;
	}
	
	//picked a good date
	if(whichOne === 1)
		document.getElementById("tripDate").value = dateObject.toLocaleDateString();
	else document.getElementById("tripDate2").value = dateObject.toLocaleDateString();
	
	hideCalendar();

}



function hideCalendar() { 
	document.getElementById("cal").style.display = "none";
}

//move to different months
function prevMo() {
	displayCalendar(-1);
} 

function nextMo() {
	displayCalendar(1);
}

//do the math
function calculateValues() { 
	
	//get a date
	var dateFrom = Date.UTC(dateObject1.getFullYear(), dateObject1.getMonth(), dateObject1.getDate(), 0,0,0);
	//get the other one
	var dateTo = Date.UTC(dateObject2.getFullYear(), dateObject2.getMonth(), dateObject2.getDate(), 0, 0, 0); // all launches at 8:00pm UTC

	//which one is bigger
	var diff_date =  0;
	
	if(dateTo > dateFrom)
		diff_date = dateTo - dateFrom;
	else diff_date = dateFrom - dateTo;
	
	var num_years = diff_date/31536000000; //there are 31536000000 seconds in a year.
	var num_months = (diff_date % 31536000000)/2628000000; //this is the calculation for a month.  year - divided by seconds in one month - will give you the amount of months the % is the remainder (modulus).
	var num_days = ((diff_date % 31536000000) % 2628000000)/86400000; // this is the remainder of the year (remainder), then the remainder of the month, divided by 86400000 (seconds in a day)
	
	document.getElementById("yearDate").innerHTML = Math.floor(num_years);
	document.getElementById("montDate").innerHTML = Math.floor(num_months);
	document.getElementById("daysDate").innerHTML = Math.floor(num_days);

}

//Make it work and display the results
function validateForm(evt) {
	
	//prevent the form from submitting
	if( evt.preventDefault) 
		evt.preventDefault(); 
	else evit.returnValue = false;
	
	formValidity = true; //reset for validation
	
	//make sure 2 dates were entered
	if(	document.getElementById("tripDate").value === "" || document.getElementById("tripDate2").value === "")
		alert("You must select 2 dates");
	else {	
		calculateValues();
		//document.getElementsByTagName("form")[0].submit();
	}
}

//add all the event listeners
function createEventListeners() {
	
	//create an event listener for the first calendar
	var dateField = document.getElementById("tripDate");
	if(dateField.addEventListener)
		dateField.addEventListener("click", displayCalendar1, false);
	else if (dateField.attachEvent)
		dateField.attachEvent("onclick", displayCalendar1);

	//create an event listener for the second calendar
	var dateField = document.getElementById("tripDate2");
	if(dateField.addEventListener)
		dateField.addEventListener("click", displayCalendar2, false);
	else if (dateField.attachEvent)
		dateField.attachEvent("onclick", displayCalendar2);
	
	//clear out the dates
	document.getElementById("tripDate").value = "";
	document.getElementById("tripDate2").value = "";
	
	//add a listener for the calendar using a table and filling it in.
	var dateCells = document.getElementsByTagName("td"); 
	if (dateCells[0].addEventListener) { 
		for (var i = 0; i < dateCells.length; i++) {
			dateCells[i].addEventListener("click", selectDate, false);
		}
	}
	
	else if (dateCells[0].attachEvent) { 
		for (var i = 0; i < dateCells.length; i++) {
			dateCells[i].attachEvent("onclick", selectDate);
		}
	
	}
	
	
	//close the calendar
	
	var closeButton = document.getElementById("close"); 
	if (closeButton.addEventListener) {
		closeButton.addEventListener("click", hideCalendar, false); } 
	else if (closeButton.attachEvent) {
		closeButton.attachEvent("onclick", hideCalendar);
	}
	
	//moving through the months
	var prevLink = document.getElementById("prev"); 
	var nextLink = document.getElementById("next"); 
	if (prevLink.addEventListener) {
		prevLink.addEventListener("click", prevMo, false);
		nextLink.addEventListener("click", nextMo, false); 
	} 
	
	else if (prevLink.attachEvent) { 
		prevLink.attachEvent("onclick", prevMo); 
		nextLink.attachEvent("onclick", nextMo);
	}
	
	//check the form
	var form = document.getElementsByTagName("form")[0]; 
	if (form.addEventListener) {
		form.addEventListener("submit", validateForm, false); 
	} else if (form.attachEvent) {
		form.attachEvent("onsubmit", validateForm);
	}
}

//add the load event
if(window.addEventListener)
	window.addEventListener("load", createEventListeners, false);
else if (window.attachEvent)
	window.attachEvent("onload", createEventListeners);

