alert('my todo');
Todos.Todo = DS.Model.extend({
  title: DS.attr('string'),
  completed: DS.attr('boolean'),
  //isCompleted: DS.attr('boolean')
  isCompleted: function() {
	  alert('I will set isCompleted with ' + this.get('completed'));
	    return this.get('completed');
	  }.property('completed')
});
