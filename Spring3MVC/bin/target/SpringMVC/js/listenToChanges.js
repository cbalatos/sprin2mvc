var Todo = Backbone.Model.extend({
  // Default todo attribute values
  defaults: {
    title: '',
    completed: false
  },
  initialize: function(){
    console.log('This model has been initialized.');
    this.on('change', function(model, options){ // when the model has changed
    	  	console.log("options object previousModels"+options.previousModels[0]);
    	  	console.log("new title " +[model]);
        console.log('- Values for this model have changed.');
    });
    this.on('change:title', function(){ // when an attribute has changed
        console.log('Title value for this model has changed.');
    });
    this.on("invalid", function(model, error){
        console.log('AN ERROR!' + error);
    });
  },
  validate: function(attributes){
    if(attributes.title === undefined){
        return "Remember to set a title for your todo.";
       }
    if (attributes.title.length < 10){
    	return "Title must be bigger than 10.";
    }
    console.log('Title Validation is ok for '+ attributes.title);
  },
  setTitle: function(newTitle){
    this.set({ title: newTitle });
  },

});

var myTodo = new Todo();

myTodo.set('title', 'The listener is triggered whenever an attribute value changes.');
console.log('Title has changed: ' + myTodo.get('title'));


myTodo.set('completed', true);
console.log('Completed has changed: ' + myTodo.get('completed'));

myTodo.set({
  title: 'Changing more than one attribute at the same time only triggers the listener once.',
  completed: true
});


myTodo.setTitle("a title set by a function? Does it trigger the event? As you can see it does");

myTodo.unset('title', {validate: true}); //Force validaqtion on unset

// Above logs:
// This model has been initialized.
// - Values for this model have changed.
// Title has changed: The listener is triggered whenever an attribute value changes.
// - Values for this model have changed.
// Completed has changed: true
// - Values for this model have changed.