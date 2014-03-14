(function($){
	
  //Events Section
    var Item = Backbone.Model.extend({
    defaults: {
      part1: 'hello',
      part2: 'world'
    }
  });
  
  var List = Backbone.Collection.extend({
    model: Item
  });	
  
  //View Section	
  var ListView = Backbone.View.extend({
    el: $('body'), // el attaches to existing element


    events: {
      'click button#add': 'addItem',
      'click button#addAnother': 'addAnother'
    },
    
    initialize: function(){
      _.bindAll(this, 'render', 'addItem', 'addAnother', 'appendItem'); // every function that uses 'this' as the current object should be in here
 	  
 	  this.collection = new List();
      this.collection.bind('add', this.appendItem); // collection event binder

	  //Start with an object
	  var item = new Item();
	  item.set({
	  	part1: 'Predefined',
	  	part2: 'Item'
	  })

 	  this.collection.add(item);
      this.counter = this.collection.length ; // total number of items added thus far
      this.render();
    },

	

    render: function(){
      var self = this; //	Save reference to this so it can be accessed from within the scope of the callback below
      $(this.el).append("<button id='add'>Add list item</button>");
      $(this.el).append("<ul></ul>");
      $(this.el).append("<button id='addAnother'>Another Button what it does is a mistry</button>");
      _(this.collection.models).each(function(item){ // in case collection is not empty
      	alert('On render i found an item');
        self.appendItem(item);
      }, this);      
    },

	

    addItem: function(){
      this.counter++;
     // $('ul', this.el).append("<li>hello world"+this.counter+"</li>");
     var item = new Item();
      item.set({
        part2: item.get('part2') + this.counter + 'wow' // modify item defaults
      });
      this.collection.add(item); // add item to collection; view is updated via event 'add'
    },
    
    addAnother:function(){
      alert('So far you have '+this.counter+' items in the list');
    },
    
    appendItem: function(item){
      $('ul', this.el).append("<li>"+item.get('part1')+" "+item.get('part2')+"</li>");
    }


  });

  var listView = new ListView();
})(jQuery);