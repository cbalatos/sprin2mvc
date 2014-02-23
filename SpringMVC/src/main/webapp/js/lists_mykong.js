var Shop = Backbone.Model.extend({
  defaults: {
    name: '',
  }
});

var ShopsList = Backbone.Collection.extend({
  model: Shop,
  url: 'http://localhost:8080/SpringMVC/rest/kfc/brands/',
});

var shops = new ShopsList();
shops.fetch({async:false}); // sends HTTP GET to /todos

shops.forEach(function(model){
	  console.log(model.get('name'));
	});

console.log("My shops list size is "+shops.length);

console.log("My shops list is "+JSON.stringify(shops.toJSON()))

shops.create({name:'My New Shop'});