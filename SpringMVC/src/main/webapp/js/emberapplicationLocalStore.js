window.Todos = Ember.Application.create();

//Adapters are responsible for communicating with a source of data for your application. Typically this will be a web service API
Todos.ApplicationAdapter = DS.LSAdapter.extend({
	  namespace: 'todos-emberjs'
	});