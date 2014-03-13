Todos.TodosController = Ember.ArrayController.extend({
  actions: { 
    createTodo: function() { //createTodo is the action property of the field in html
      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create the new Todo model
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      todo.save();
    },
    clearCompleted: function() {
        var completed = this.filterBy('isCompleted', true);
        if (confirm('Are you sure that you want to delete all completed actions? '+ completed.get('length') + ' ' +(completed.get('length') === 1 ? 'item' : 'items') + '  will be deleted.')){
            completed.invoke('deleteRecord');
            completed.invoke('save');        	
        } else{
        	alert('Deletion Aborted');
        }

      }

  },
  
  remaining: function() { //Define a controller property. A Computed Property
  	//alert('here i am');
  	  return this.filterBy('isCompleted', false).get('length');
  	}.property('@each.isCompleted'),
  
  inflection: function() {
  		  var remaining = this.get('remaining');
  		  return remaining === 1 ? 'item' : 'items';
  		}.property('remaining'),
  		
  hasCompleted: function() {
  		  return this.get('completed') > 0;
  		}.property('completed'),
  		
  
  completed: function() { 
  		  return this.filterBy('isCompleted', true).get('length');
  		}.property('@each.isCompleted'),
  		
  allAreDone: function(key, value) {
  		  if (value === undefined) {
  		    return !!this.get('length') && this.everyProperty('isCompleted', true);
  		  } else {
  		    this.setEach('isCompleted', value);
  		    this.invoke('save');
  		    return value;
  		  }
  		}.property('@each.isCompleted')

});