(function($){
	
	
  //Backbone.sync: Overrides persistence storage with dummy function. 
  //This enables use of Model.destroy() without raising an error.
  Backbone.sync = function(method, model, success, error){
    success();
  }
  	
  //Events Section
    var Item = Backbone.Model.extend({
    defaults: {
      part1: 'hello',
      part2: 'world'
    }
  });
  
  var List = Backbone.Collection.extend({
    initialize: function () {
        this.bind('remove', this.onModelRemoved, this);
    },
    model: Item,
    onModelRemoved: function () {
        alert("An Item  is removed");
    }    
  });	
  
  //ItemView class: Responsible for rendering each individual Item.
  var ItemView = Backbone.View.extend({
	  tagName: 'li', // name of (orphan) root tag in this.el
	  events: { // ItemViews now respond to two clickable actions for each Item: swap and delete.
      'click span.swap':  'swap',
      'click span.delete': 'remove'
      },    
      initialize: function(){
        _.bindAll(this, 'render', 'unrender', 'swap', 'remove'); // every function that uses 'this' as the current object should be in here

        this.model.bind('change', this.render);
        this.model.bind('remove', this.unrender);
      },
	  render: function(){
      $(this.el).html('<span style="color:black;">'+this.model.get('part1')+' '+this.model.get('part2')+'</span> &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
	    return this; // for chainable calls, like .render().el
	  },
	  
	  unrender: function(){
      	$(this.el).remove();
      },
      swap: function(){
      	var swapped = {
        	part1: this.model.get('part2'),
        	part2: this.model.get('part1')
      	};
      	this.model.set(swapped);
      },
      remove: function(){
      	this.model.destroy();
      }
  });
  
  //View Section	
  var ListView = Backbone.View.extend({
    el: $('body'), // el attaches to existing element


    events: {
      'click button#add': 'addItem',
      'click button#addAnother': 'addAnother',
      'click span.delete':  'deleteItem'
    },
    
    initialize: function(){
      _.bindAll(this, 'render', 'addItem', 'addAnother', 'appendItem','deleteItem'); // every function that uses 'this' as the current object should be in here
 	  
 	  
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
      alert('So far you have '+this.counter+' items in the view and '+ this.collection.length + ' items in  the list');
    },
    
    //appendItem: function(item){
    //  $('ul', this.el).append("<li>"+item.get('part1')+" "+item.get('part2')+"</li>");
    //}
    
    appendItem: function(item){
      var itemView = new ItemView({
        model: item
      });
      $('ul', this.el).append(itemView.render().el);
    },
    
    deleteItem: function(){
    	alert('Decrease Counter');
    	this.counter--;
    }


  });

  var listView = new ListView();
})(jQuery);