(function($){
  var ListView = Backbone.View.extend({
    el: $('body'), // el attaches to existing element


    events: {
      'click button#add': 'addItem',
      'click button#addAnother': 'addAnother'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'addItem','addAnother'); // every function that uses 'this' as the current object should be in here

      this.counter = 0; // total number of items added thus far
      this.render();
    },

	

    render: function(){
      $(this.el).append("<button id='add'>Add list item</button>");
      $(this.el).append("<ul></ul>");
      $(this.el).append("<button id='addAnother'>Another Button what it does is a mistry</button>");
    },

	

    addItem: function(){
      this.counter++;
      $('ul', this.el).append("<li>hello world"+this.counter+"</li>");
    },
    
    addAnother:function(){
      alert('So far you have '+this.counter+' items in the list');
    }

  });

  var listView = new ListView();
})(jQuery);