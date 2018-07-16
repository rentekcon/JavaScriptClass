/*  JavaScript 6th Edition
    Chapter 12
    

    Areas around town
    Author: Renee Slattery
    Date:   July 8, 2018

    Filename: script.js
*/

"use strict";

//leaving in the comments for learning
// $("ul.mainmenu li").children("ul").addClass("show");

function display(event){
	// $(event.currentTarget).children("ul").addClass("show");
	//$(event.currentTarget).children("ul").show();
	$(event.currentTarget).children("ul").slideDown("fast");
}

function hide(event) {
	//	$(event.currentTarget).children("ul").removeClass("show");
	$(event.currentTarget).children("ul").hide();
}

//this tells it to only do the display when hovering over a menu
 $("ul.mainmenu li").hover(display,hide);

