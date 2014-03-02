Backbone.on('event', function() {console.log('Handled Backbone event');}); 
Backbone.trigger('event'); // logs: Handled Backbone event


var ourObject = {};

//Mixin events model into out object
_.extend(ourObject, Backbone.Events);

//Add a custom event with inline fuction
ourObject.on('dance', function(msg){
console.log('We triggered ' + msg);
});

//Trigger the custom event
ourObject.trigger('dance', 'our event')

//Define the function then add it
function dancing (msg) { console.log("We started " + msg); }

// Add namespaced custom events
ourObject.on("dance:tap", dancing);
ourObject.on("dance:break", dancing);

// Trigger the custom events
ourObject.trigger("dance:tap", "tap dancing. Yeah!");
ourObject.trigger("dance:break", "break dancing. Yeah!");

// This one triggers nothing as no listener listens for it
ourObject.trigger("dancme", "danceme for break dancing. Yeah!");


//the all keyword means that this will happen for all events
ourObject.on("all", function(eventName){
	  console.log("The name of the event passed was " + eventName);
	});

//This time the danceme will fire an event the all event
ourObject.trigger("dancme", "danceme for break dancing. Yeah!");

//Now lets delete the all event trigger
ourObject.off("all");

ourObject.trigger("dancme", "danceme for break dancing. Yeah!"); //No log


//Trigger multiple events speparated by spaces
//Multiple events
ourObject.trigger("dance dance:tap dance:break", 'very tired from so much action.');

//passing multiple attributes

function doAction (action, duration) {
	  console.log("We are " + action + ' for ' + duration ); 
	}

ourObject.on("jump", doAction);
ourObject.trigger("jump", 'dancing', "5 minutes");