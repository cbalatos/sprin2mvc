Todos.TodoController = Ember.ObjectController.extend({
	actions: {
		  editTodo: function() {
		    this.set('isEditing', true);
		  },
		  acceptChanges: function() {
		    this.set('isEditing', false);

		  //Using the auto-proxy behavior of Ember if no title property defined in the controller get it from the model
		    if (Ember.isEmpty(this.get('model.title'))) { 
		      this.send('removeTodo');
		    } else {
		      this.get('model').save();
		    }
		  },
		  removeTodo: function(){
			    var todo = this.get('model');
			    if (confirm('Are you sure that you want to delete todo entry with title:'+todo.get('title') + '?')){
			    	todo.deleteRecord();
			    	todo.save();
			    } else{
			    	alert('You selected to skip deletion');
			    }
		  }
		},
  
  isEditing: false, //Initial Values for controller of this type
	
  isCompleted: function(key, value){
    var model = this.get('model');

    if (value === undefined) {
      // property being used as a getter
      return model.get('isCompleted');
    } else {
      // property being used as a setter
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property('model.isCompleted') //isCompleted function is marked a computed property whose value is dependent on the value of model.isCompleted
});