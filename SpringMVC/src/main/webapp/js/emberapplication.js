window.Todos = Ember.Application.create();

//Adapters are responsible for communicating with a source of data for your application. Typically this will be a web service API
//Fixtures are a way to put sample data into an application before connecting the application to long-term persistence.
Todos.ApplicationAdapter = DS.FixtureAdapter.extend();