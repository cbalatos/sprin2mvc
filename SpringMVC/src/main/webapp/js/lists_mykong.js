var Shop = Backbone.Model.extend({
  defaults: {
    name: '',
  },

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
console.log("--------------------------------------------------");
console.log("I will add two shops");

shops.create({name:'My New Shop'});

shops.create({name:'Another New Shop'});


shops.reset();
shops.fetch({async:false}); // sends HTTP GET to /todos fetch to get thhe new id's

console.log("My shops list after insertion is  "+JSON.stringify(shops.toJSON()))

var sortedByAlphabet = shops.sortBy(function (shop) {
    return shop.get("name").toLowerCase();
});

console.log("- Now sorted: ");

sortedByAlphabet.forEach(function(model){
  console.log(model.get('name') + " with id "+model.get('id'));
});

console.log("--------------------------------------------------");
console.log("I will delete the last shop");

var delId = shops.length -1;

console.log("I will delete the last shop with id = "+delId); 
var delShop = shops.get(delId);

delShop.destroy();


console.log("My shops list size after deletion before reload is "+shops.length);

shops.fetch( {reset: true, async:false}); // sends HTTP GET to /todos fetch 
console.log("My shops list size after deletion after reload is "+shops.length);


