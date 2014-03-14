
Todos.Todo = DS.Model.extend({
  title: DS.attr('string'),
  completed: DS.attr('boolean'),
  //isCompleted: DS.attr('boolean')
  isCompleted: function() {
	    return this.get('completed');
	  }.property('completed')
});
