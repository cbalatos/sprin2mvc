
Todos.Todo = DS.Model.extend({
  //id: DS.attr('number'),
  title: DS.attr('string'),
  completed: DS.attr('boolean'),
  
  startDate:DS.attr('date'),
  endDate:DS.attr('date'),
  
  //isCompleted: DS.attr('boolean')
  isCompleted: function() {
	    return this.get('completed');
	  }.property('completed')
});
