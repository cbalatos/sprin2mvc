if (!!window.EventSource) {
   console.log("Event source available");
//   var source = new EventSource('/SpringMVC/rest/sse/systemalert');
   

   var source = new EventSource('/SpringMVC/rest/todos/reloadalert');
   source.addEventListener('message', function(e) {
	   console.log ('Refresh signal has been caught');


	   
   });

   source.addEventListener('open', function(e) {
        console.log("Connection was opened.");
   }, false);

   source.addEventListener('error', function(e) {
        if (e.readyState == EventSource.CLOSED) {
            console.log("Connection was closed.");
        } else {
            console.log(e.readyState);    // in windows XP it prints Error here
        }
   }, false);
} else {
        console.log("No SSE available");
}