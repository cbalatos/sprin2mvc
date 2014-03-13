//reate an extension of Ember.TextField in order to edit a todo element
Todos.EditTodoView = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  }
});

Ember.Handlebars.helper('edit-todo', Todos.EditTodoView); //bind the two elements edit-todo with  Todos.EditTodoView