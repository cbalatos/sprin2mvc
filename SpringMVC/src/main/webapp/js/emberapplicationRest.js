window.Todos = Ember.Application.create();

//Adapters are responsible for communicating with a source of data for your application. Typically this will be a web service API

Todos.ApplicationAdapter = DS.RESTAdapter.extend({
	  namespace: 'SpringMVC/rest',
	  host: 'http://localhost:8080'
		  /*
		   *   headers: {
    "API_KEY": "secret key",
    "ANOTHER_HEADER": "Some header value"
  }
		   */
	});