// Define double curly brackets fot micro template
//_.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };

// Define a Todo Model
var Todo = Backbone.Model.extend({
  // Default todo attribute values
  defaults: {
    title: '',
    info:'',
    completed: true
  },
  
     // initialize: function(){
     // 	alert("A new Todo");
     // }
});

// Instantiate the Todo Model with a title, with the completed attribute
// defaulting to false
var myTodo = new Todo({
  title: 'Check attributes property of the logged models in the console.',
  info:'All the info of the object goes here'
});

var TodoView = Backbone.View.extend({

  tagName:  'li',

  // Cache the template function for a single item.
  todoTpl: _.template( $('#item-template').html() ),

  events: { // simulates the Controller configuration
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit':   'close'
  },

  // Called when the view is first created
  initialize: function() {

    this.$el = $('#todo');
   		  //alert("A new to do view");   
          this.render();
    // Later we'll look at:
    // this.listenTo(someCollection, 'all', this.render);
    // but you can actually run this example right now by
    // calling todoView.render();
  },

  // Re-render the titles of the todo item.
  render: function() {
  	//alert(this.model.toJSON());
    this.$el.html( this.todoTpl( this.model.toJSON() ) );
    // $el here is a reference to the jQuery element 
    // associated with the view, todoTpl is a reference
    // to an Underscore template and toJSON() returns an 
    // object containing the model's attributes
    // Altogether, the statement is replacing the HTML of
    // a DOM element with the result of instantiating a 
    // template with the model's attributes.
   this.input = this.$('.edit');
    return this;
  },

  edit: function() {
    // executed when todo label is double clicked
  },

  close: function() {
    // executed when todo loses focus
  },

  updateOnEnter: function( e ) {
    // executed on each keypress when in todo edit mode, 
    // but we'll wait for enter to get in action
  }
});

// create a view for a todo
var todoView = new TodoView({model: myTodo});