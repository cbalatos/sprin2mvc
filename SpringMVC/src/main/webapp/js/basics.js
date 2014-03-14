var Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  },	
  initialize: function(){
      console.log('This model has been initialized.');
  }
});



// Now we can create our concrete instance of the model
// with default values as follows:
var todo1 = new Todo();

// Following logs: {"title":"","completed":false}
console.log(JSON.stringify(todo1));

// Or we could instantiate it with some of the attributes (e.g., with custom title):
var todo2 = new Todo({
  title: 'Check attributes of the logged models in the console.'
});

// Following logs: {"title":"Check attributes of the logged models in the console.","completed":false}
console.log(JSON.stringify(todo2));

// Or override all of the default attributes:
var todo3 = new Todo({
  title: 'This todo is done, so take no action on this one.',
  completed: true
});

// Following logs: {"title":"This todo is done, so take no action on this one.","completed":true} 
console.log(todo3.get('title')); // empty string
console.log(todo3.get('completed')); // false

todo3.set({
  title: "Both attributes set through Model.set().",
  completed: true
});
console.log(JSON.stringify(todo3));

todo3.set("completed", false); //Only one attribute is set

console.log(JSON.stringify(todo3));


var Person = new Backbone.Model();
Person.on("change:name", function() { console.log('Name changed'); });

console.log("Has a person changed name?" +  Person.hasChanged("name"));
// true: change was recorded
console.log("Has a person changed abything?" +   Person.hasChanged(null));

Person.set({name: 'Andrew'});
// log entry: Name changed

Person.set({name: 'Jeremy'}, {silent: true});
// no log entry

console.log("Has a person changed name?" +  Person.hasChanged("name"));
// true: change was recorded
console.log("Has a person changed abything?" +   Person.hasChanged(null));
// true: something (anything) has changed
