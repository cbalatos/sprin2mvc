// an input JSON string
var jstr = '{"msg_deletion_confirm": "Είσαι σίγουρος ότι θέλεις να διαγράψεις {0} ολοκληρωμένες εργασίες?"}';

var data = jQuery.parseJSON(jstr);
console.log(data.mykey);