function brqx_save_lang_type(field_list, node_type = "pg", lang = "en") //print ('NODOs:  ' . $node_type . '-' . $node_list . '-FINODOS' ) ;
//$sNodo='501';
//Enf Foreach
//foreach ($vNodes as $sNodo)
//{
//brqx_update_lang_node_with_tax($sNodo, $lang);		
//}
{
	var node_list = brqx_get_nodes(node_type);
	var sep_int = " ";
	var string_sep = "/[" + sep_int + "]+/";
	var vNodes = preg_split(string_sep, node_list);
	var vFields = preg_split(string_sep, field_list);
	var lf = "\r\n";

	for (var sNodo of Object.values(vNodes)) //echo "Nodo:-" .  $sNodo . '-' . $lf;
	{
		brqx_save_lang_node_without_tax(sNodo, vFields, lang);
	}
};

