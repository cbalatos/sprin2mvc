// an input JSON string
var jstr = '{"msg_deletion_confirm": "����� �������� ��� ������ �� ���������� {0} ������������� ��������?"}';

var data = jQuery.parseJSON(jstr);
console.log(data.mykey);