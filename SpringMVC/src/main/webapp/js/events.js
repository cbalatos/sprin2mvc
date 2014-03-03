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


//listenTo() tells an object to listen for events on another object, allowing the listener to keep track of the events 
//for which it is listening. stopListening() can subsequently be called on the listener to tell it to stop listening for events:

var a = _.extend({}, Backbone.Events);
var b = _.extend({}, Backbone.Events);
var c = _.extend({}, Backbone.Events);

// add listeners to A for events on B and C
a.listenTo(b, 'anything', function(event){ console.log("anything happened"); });
a.listenTo(c, 'everything', function(event){ console.log("everything happened"); });

// trigger an event
b.trigger('anything'); // logs: anything happened

// stop listening
//be aware of ghost views when using on() and off() 
//see more on http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
a.stopListening();

// A does not receive these events
b.trigger('anything');
c.trigger('everything');


// When views are removed all listenTo are stopped.
var view = new Backbone.View();
var b = _.extend({}, Backbone.Events);

view.listenTo(b, 'all', function(){ console.log(true); });
b.trigger('anything');  // logs: true

view.listenTo(b, 'all', function(){ console.log(false); });
view.remove(); // stopListening() implicitly called
b.trigger('anything');  // does not log anything