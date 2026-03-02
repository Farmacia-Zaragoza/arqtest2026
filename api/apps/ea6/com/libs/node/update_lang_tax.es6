function brqx_update_lang_tax(node_type = "pg", lang = "en") //print ('NODOs:  ' . $node_type . '-' . $node_list . '-FINODOS' ) ;
//$sNodo='501';
{
  var node_list = brqx_get_nodes(node_type);
  var sep_int = " ";
  var string_sep = "/[" + sep_int + "]+/";
  var vNodes = preg_split(string_sep, node_list);
  var lf = "\r\n";

  for (var sNodo of Object.values(vNodes)) {
    brqx_update_lang_node_with_tax(sNodo, lang);
  }
};
