/* 	
 * 	JavaScript 6th Edition
 *  Chapter 6 
 *  
 * 
 *  Contact form 
 *  Functions 
 *  Author: Renee Slattery
 *  Date:	June 25, 2018
 *
 *	Filename: snoot.js
 */
 

"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */

var formValidity = true;
var ideaList = [];

//On the contact page put in place holders for the 
	function insertPlaceholders() { 
		if (!Modernizr.input.placeholder) {
			document.getElementById("nameinput").value = "first and last name";
			document.getElementById("emailinput").value = "address@example.com";
			document.getElementById("phoneinput").value = "###-###-####"; 
		}
	}
	
	//check to see if the data in the name is numeric
	function validateContacts(){
	
		
		var errorDiv = document.querySelectorAll("#contactinfo .errorMessage")[0];
		var fieldsetValidity = true;
		var errMsg = "Please complete the following Contact information:";
		
		//Check to see if there are numbers in the name
		var numbers = /^[0-9]+$/;
		var inputname = document.formContact.name;
		var inputemail = document.formContact.email;
		var inputphone = document.formContact.phone;
		try{
			if(inputname.value.match(numbers) || inputname.value === "") {
				inputname.style.background = "rgb(255, 233, 233)";
				fieldsetValidity = false;
				errMsg += " Input a valid Name ";
			}
			else inputname.style.background = "white";
			
			//check to see if there are values in the other fieldset
			
			if(inputemail.value === "") {
				inputemail.style.background = "rgb(255,233,233)";
				fieldsetValidity = false;
				errMsg += "Input a valid email address ";
			} else 
				inputemail.style.background = "white";
				
			if(inputphone.value === "" || !inputphone.value.match(numbers)) {
				inputphone.style.background = "rgb(255,233,233)";
				fieldsetValidity = false;
				errMsg += "Input a valid phone number";
			} else 
				inputphone.style.background = "white";
			
			 if (fieldsetValidity === false) { 
				 // throw appropriate message based on current fieldset
				 
					throw errMsg;
				 
			  } else {
				 errorDiv.style.display = "none";
				 errorDiv.innerHTML = "";
			  }
				
		}
		catch(msg){
			errorDiv.style.display = "block";
			errorDiv.innerHTML = msg; 
			formValidity = false;
		}	
		
		
	}
	
	/* remove fallback placeholder text */
	function zeroPlaceholder() {
	   var messageBox = document.getElementById("customText");
	   messageBox.style.color = "black";
	   if (messageBox.value === messageBox.placeholder) {
		  messageBox.value = "";
	   }
	}

	//see if it got removed
	function checkPlaceholder() {
		var messageBox = document.getElementById("customText");
		if(messageBox.value === "") {
			messageBox.style.color = "rgb(178,184,183)";
			messageBox.value = messageBox.placeholder;
		}
	}
	
	/* add placeholder text for browsers that don't support placeholder attribute */
	function generatePlaceholder() {
	   if (!Modernizr.input.placeholder) {
		  var messageBox = document.getElementById("customText");
		  messageBox.value = messageBox.placeholder;
		  messageBox.style.color = "rgb(178,184,183)";
		  if (messageBox.addEventListener) {
			 messageBox.addEventListener("focus", zeroPlaceholder, false); 
			 messageBox.addEventListener("blur", checkPlaceholder, false); 
		  } else if (messageBox.attachEvent)  {
			 messageBox.attachEvent("onfocus", zeroPlaceholder);
			 messageBox.attachEvent("onblur", checkPlaceholder); 
		  }
	   }
	}

	//if someone starts to type in the custom message section, this will automatically check the custom check box
	function autocheckCustom() {
		var messageBox = document.getElementById("customText");
		
		if(messageBox.value !== "" && messageBox.value !== messageBox.placeholder){
			document.getElementById("custom").checked = "checked";
		}
		else //if there's nothing there uncheck the box
			document.getElementById("custom").checked = false;
	}

	/* validate demographics fieldset */
	function validateDemographics() {
	   var errorDiv = document.querySelector("#demographics .errorMessage");
	   var fieldsetValidity = true;
	   var selectElements = document.querySelectorAll("#demographics select");
	   var elementCount = selectElements.length;
	   var areas = document.getElementsByName("demograph");
	   var currentElement;
	   try { 
		  if (!areas[0].checked && !areas[1].checked && !areas[2].checked && !areas[3].checked) { 
			 // verify that an area is selected
			 for (var i = 0; i < 4; i++) {
				areas[i].style.outline = "1px solid red";
			 }
			 fieldsetValidity = false;
		  } else {
			 for (var i = 0; i < 4; i++) {
				areas[i].style.outline = "";
			 }
		  }
		  
		  if (!fieldsetValidity) { // check if any field is blank
			 throw "Please select the area you are from.";
		  } else {
			 errorDiv.style.display = "none";
		  }
	   }
	   catch(msg) {
		  errorDiv.style.display = "block";
		  errorDiv.innerHTML = msg;
		  formValidity = false;
	   }
	}

	/* validate the custom message fieldset */
	function validateMessage() {
	   var errorDiv = document.querySelector("#message .errorMessage");
	   var msgBox = document.getElementById("customText");
	   try {
		  if (document.getElementById("custom").checked && ((msgBox.value === "") || (msgBox.value === msgBox.placeholder))) {
			  // custom checked but message box empty
			 throw "Please enter your message text.";
		  } else {
			 errorDiv.style.display = "none";
			 msgBox.style.background = "white";
		  }
	   }
	   catch (msg) {
		  errorDiv.style.display = "block";
		  errorDiv.innerHTML = msg; 
		  msgBox.style.background = "rgb(255,233,233)";
		  formValidity = false;
	   }
	}

	//validate form
function validateForm(evt) {
	
	//prevent the form from submitting
	if( evt.preventDefault) 
		evt.preventDefault(); 
	else evit.returnValue = false; //prevent from from submitting in IE8
	
	formValidity = true; //reset for validation
	//call all the validation methods
	validateDemographics();
	validateContacts();
	validateMessage();
	
	
	if(formValidity == true) {
		document.getElementById("errorText").innerHTML = "";
		document.getElementById("errorText").style. display = "none";
		document.getElementsByTagName("form")[0].submit();
	}
	else {
		document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your order.";
		document.getElementById("errorText").style.display = "block";
		scroll(0,0);
	}
}

//add a function to check to see which options are selected and put them in an array
function checkOptions(event) {
	//get the list box
	var sel = document.getElementById("selEvent"); // get the list box
	
	var opt;
    for ( var i = 0; i < sel.length; i++ ) {
        opt = sel[i]; //get the current one
        if ( opt.selected === true ) {
			//add it to the array
            ideaList.push(opt.value);
			
			// add option value to list in  section
			var newIdea = document.createElement("li");
			newIdea.innerHTML = opt.value;
			document.getElementById("profileIdeas").appendChild(newIdea);
		  // make  section 
		  document.getElementById("profile").style.display = "block";
		  document.getElementById("ideasSection").style.display = "block";
	    } else { // if item has just been unselected
			  var listItems = document.querySelectorAll("#profileIdeas li");
			  for (var j = 0; j < listItems.length; j++) {
				 if (listItems[j].innerHTML === opt.value) {
					 ideaList.splice(j, 1);  //remove the one at position i called if uncheck the box

					// remove lodging from  list
					listItems[j].parentNode.removeChild(listItems[j]);
					break;
				 }
			  }
		}
    }
	
}
//add a function to display the array in the 

	
	function createEventListeners(){
	
		//add an event handler for the listbox
		var eventtypes = document.getElementById("selEvent");
		if(eventtypes.addEventListener)
			eventtypes.addEventListener("change", checkOptions, false);
		else if (eventtypes.attachEvent)
			eventtypes.attachEvent("onchange", checkOptions);
		
		//add an event to see if someone types in some text
		var messageBox = document.getElementById("customText");
		if(messageBox.addEventListener)
			messageBox.addEventListener("blur", autocheckCustom, false);
		else if (messageBox.attachEvent)
			messageBox.attachEvent("onblur", autocheckCustom);
	
		
		//add an event listener for the button
		var sbutton = document.getElementById("sButton"); 
		if (sbutton.addEventListener) {
			sbutton.addEventListener("click", validateForm, false);
		} 
		else if (sbutton.attachEvent) { 
			sbutton.attachEvent("onclick", validateForm);
		}
	}
	
	/* create event listeners and populate the placeholders */
	function setUpPage() {
		createEventListeners();
		insertPlaceholders();
	}



	//Put in the event listeners based on compatibility
	if (window.addEventListener) 
		window.addEventListener("load",  setUpPage, false);
	 else if (window.attachEvent) 
		window.attachEvent("onload", setUpPage);
	 
