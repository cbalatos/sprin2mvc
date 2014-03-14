Todos.Router.map(function() {
 // this.resource('todos', { path: '/' });
	this.resource('todos', { path: '/' }, function () {
		// additional child routes will go here later
	    this.route('active');
	    this.route('completed');
	});
});


Todos.TodosRoute = Ember.Route.extend({ //By Default it will search for data-template-name: todos
	  model: function() {
	    return this.store.find('todo');  // this.store accesses the DS associated with the ember application
		//   return $.getJSON("http://localhost:8080/SpringMVC/rest/todo");
	  }
	});

Todos.TodosIndexRoute = Ember.Route.extend({  //By Default it will search for data-template-name: todos/index
	  model: function() {
	    return this.modelFor('todos');  //the same model with the todos route
	  }
	});

Todos.TodosActiveRoute = Ember.Route.extend({
	  model: function(){
	    return this.store.filter('todo', function(todo) {
	      return !todo.get('isCompleted');
	    });
	  },
	  renderTemplate: function(controller) {
	    this.render('todos/index', {controller: controller});
	  }
	});

Todos.TodosCompletedRoute = Ember.Route.extend({
	model: function() {
	    return this.store.filter('todo', function(todo) {
	      return todo.get('isCompleted');
	    });
	  },
	  renderTemplate: function(controller) {
	    this.render('todos/index', {controller: controller});
	  }
	});