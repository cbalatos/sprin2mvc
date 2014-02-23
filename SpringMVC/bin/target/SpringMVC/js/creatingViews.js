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

// We create two DOM elements representing buttons
// which could easily be containers or something else
var button1 = $('<button></button>');
var button2 = $('<button></button>');

// Define a new view
var View = Backbone.View.extend({
      events: {
        click: function(e) {
          console.log(view.el === e.target);
        }
      }
    });


// Create a new instance of the view, applying it
// to button1
var view = new View({el: button1});

// Apply the view to button2 using setElement
view.setElement(button2);

button1.trigger('click'); 
button2.trigger('click'); // returns true


// We can also provide raw markup to setElement
// as follows (just to demonstrate it can be done):
var viewStatic = new Backbone.View;
viewStatic.setElement('<p><a><b>test</b></a></p>');
console.log (viewStatic.$('a b').html()); // outputs "test"

// Instantiate the Todo Model with a title, with the completed attribute
// defaulting to false
var myTodo = new Todo({
  title: 'Check attributes property of the logged models in the console.',
  info:'All the info of the object goes here'
});

var TodoView = Backbone.View.extend({

  tagName:  'li',

  // Cache the template function for a single item.
  todoTpl: _.template( "An example template" ),

  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit':   'close'
  },

  
  
  // Called when the view is first created
  initialize: function() {

    this.$el = $('#todo');
   		  //alert("A new to do view");   
    this.render();

  },

  // Re-render the title of the todo item.
  render: function() {
    this.$el.html( this.todoTpl( this.model.toJSON() ) );
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

//var todoView = new TodoView();
// log reference to a DOM element that corresponds to the view instance
var todoView = new TodoView({model: myTodo});
console.log(todoView.el); // logs <li></li>

var TodosView = Backbone.View.extend({
  tagName: 'ul', // required, but defaults to 'div' if not set
  className: 'container', // optional, you can assign multiple classes to 
                          // this property like so: 'container homepage'
  id: 'todos', // optional
});

var todosView = new TodosView();
console.log(todosView.el); // logs <ul id="todos" class="container"></ul>