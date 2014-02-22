//Managing collections
var TodosCollection = new Backbone.Collection();

TodosCollection.add([
    { id: 1, title: 'go to Jamaica.', completed: false },
    { id: 2, title: 'go to China.', completed: false },
    { id: 3, title: 'go to Disneyland.', completed: true }
]);

// we can listen for add/change/remove events
TodosCollection.on("add", function(model) {
  console.log("Added " + model.get('title'));
});

TodosCollection.on("remove", function(model) {
  console.log("Removed " + model.get('title'));
});

TodosCollection.on("change:completed", function(model) {
  console.log("Completed " + model.get('title'));
});

// we can listen for reset events
TodosCollection.on("reset", function() {
  console.log("Collection reset.");
});

TodosCollection.set([
    { id: 1, title: 'go to Jamaica.', completed: true },
    { id: 2, title: 'go to China.', completed: false },
    { id: 4, title: 'go to Disney World.', completed: false }
]);

// Above logs:
// Removed go to Disneyland.
// Completed go to Jamaica.
// Added go to Disney World.

TodosCollection.reset([
  { title: 'go to Cuba.', completed: false }
]);
// Above logs 'Collection reset.'

console.log('Collection size: ' + TodosCollection.length); // Collection size: 1



// Define a model of type 'Beatle' with a 'job' attribute
var Beatle = Backbone.Model.extend({
  defaults: {
    job: 'musician'
  }
  
});


// Create models for each member of the Beatles
var John = new Beatle({ firstName: 'John', lasttName: 'Lennon', id : 1});
var Paul = new Beatle({ firstName: 'Paul', lastName: 'McCartney', id : 2});
var George = new Beatle({ firstName: 'George', lastName: 'Harrison', id : 3});
var Ringo = new Beatle({ firstName: 'Ringo', lastName: 'Starr', id:4});

// Create a collection using our models
var theBeatles = new Backbone.Collection([John, Paul, George, Ringo]);

theBeatles.on("add", function(model) {
  console.log("Added " + model.get('firstName'));
});

theBeatles.on("remove", function(model) {
  console.log("Removed " + model.get('firstName'));
});

theBeatles.on("change", function(model) {
  console.log("Changed " + model.get('lastName'));
});

theBeatles.on("reset", function(theBeatles, options) {
  console.log("Reset " + options.previousModels);
});
// Create a separate model for Pete Best
var Pete = new Beatle({ firstName: 'Pete', lastName: 'Best', id: 5} );

John.set("lastName", "Sir Lennon")
// Update the collection
theBeatles.set([John, Paul, George, Pete]);

// Fires a `remove` event for 'Ringo', and an `add` event for 'Pete'.
// Updates any of John, Paul and Georges's attributes that may have
// changed over the years.

console.log("Te beatles group consists of "+ theBeatles.length + " persons");
console.log(JSON.stringify(theBeatles.toJSON()));

theBeatles.remove(John);
console.log("The beatles group consists of "+ theBeatles.length + " persons");

console.log("Beatle with id 2: "+ JSON.stringify(theBeatles.get(2).toJSON()) + " persons");

theBeatles.reset();

theBeatles.set([Paul, George, Pete, John]);


theBeatles.forEach(function (model){
	console.log("Iterating over the list beatle name is "+ model.get('lastName') + ' '+ model.get('firstName') + ':'+  model.get('id'));
});

//sort a collection backbone utilizes underscore functionality
var sortedBeatles = theBeatles.sortBy(function(model){
	 return model.get("lastName").toLowerCase();
});

console.log("- Now sorted: ");

sortedBeatles.forEach(function (model){
	console.log("Iterating over the list beatle name is "+ model.get('lastName') + ' '+ model.get('firstName') + ':'+  model.get('id'));
});

var firstNames = theBeatles.pluck('firstName');
// returns list of captions

console.log("Beatle with id 2: "+ JSON.stringify(firstNames.toJSON()) + " persons");