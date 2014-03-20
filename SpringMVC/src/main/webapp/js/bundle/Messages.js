// an input JSON string
var jstr = '{"msg_deletion_confirm": "Are you sure that you want to delete {0} completed items?"}';

var data = jQuery.parseJSON(jstr);
console.log(data.mykey);