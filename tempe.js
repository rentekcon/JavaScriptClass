/*    JavaScript 6th Edition
 *    Chapter 2
 *    Individual Case

 *    Fun things to do in Tempe
 *    Variables and functions
 *    Author: Renee Slattery
 *    Date:   June 18, 2018

 *    Filename: tempe.js
 */
 
//global variables
 

function calcTotal() { 
	var itemTotal = 0; 
	var item1 = document.getElementById("axthrowing"); 
	var item2 = document.getElementById("curling"); 
	var item3 = document.getElementById("dancing"); 
	var numAxP = document.getElementById("axnum").value;
	var numCurlP = document.getElementById("curlnum").value; 
	var numDanceP = document.getElementById("dancenum").value; 
			
	//add up all the checked items
	//If an item is checked make sure the number selected is within the range
	if( item1.checked) {
		if(numAxP > 24 || numAxP < 6) {
			alert( "You must select between 6 and 24 for the number of people for ax throwing");
			document.getElementById("axnum").value = 6;
			document.getElementById("axthrowing").checked =  false;
		}
		else itemTotal += (numAxP*35);
	}
	if( item2.checked) {
		if( numCurlP > 10 || numCurlP < 1 ) {
			alert( "You must select between 1 and 10 for the number of people for curling");
			document.getElementById("curlnum").value = 1;
			document.getElementById("curling").checked = false;	
		}
		else itemTotal += (numCurlP*5);
	}
	if( item3.checked) {
		if( numDanceP > 100 || numDanceP < 1) {
			alert( "You must select between 1 and 100 for the number of people for dancing");
			document.getElementById("dancenum").value = 1;
			document.getElementById("dancing").checked = false;	
		}
		else itemTotal += (numDanceP * 10);
	}
			
	//convert to int and back to deal with float
	var salesTaxRate = 0.07;
	itemTotal *= 100;
	var orderTotal = (itemTotal + (itemTotal * salesTaxRate)) / 100; 
			
	document.getElementById("estimate").innerHTML = "$" + orderTotal;
				
}
		

//using it exclusively to reset the form when someone refreshes the page.
function resetForm() {

	//Reset the default number of people minimum
	document.getElementById("axnum").value = 6;
	document.getElementById("curlnum").value = 1;
	document.getElementById("dancenum").value = 1;
			
	//Uncheck all the boxes
	document.getElementById("axthrowing").checked =  false;
	document.getElementById("curling").checked = false;		
	document.getElementById("dancing").checked = false;		
			
}

//make sure that if a person checks a box or changes #people the total is
//calculated for the price
document.getElementById("axthrowing"). addEventListener("click", calcTotal, false);
document.getElementById("curling").addEventListener("click", calcTotal, false);
document.getElementById("dancing").addEventListener("click", calcTotal, false);
document.getElementById("axnum"). addEventListener("click", calcTotal, false);
document.getElementById("curlnum").addEventListener("click", calcTotal, false);
document.getElementById("dancenum").addEventListener("click", calcTotal, false);

//resets form when page is reloaded
//Put in the event listeners based on compatibility
if (window.addEventListener) {
	window.addEventListener("load", resetForm, false);
}
 else if (window.attachEvent) {
	window.attachEvent("onload", resetForm);
 }
 