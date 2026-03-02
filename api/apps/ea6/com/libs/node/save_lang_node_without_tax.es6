function brqx_save_lang_node_without_tax(sNodo, vFields, lang = "en") //$sNodo='451';
{
	var lf = "\r\n";

	if (sNodo != "") //echo 'NODO: -'. $sNodo . '-' . $lf ;
		//Working update parragraphs
		//1.Guardar el valor de las categorias del nodo
		//2.Traducir el Nodo
		//echo "Saving Node:" . $sNodo . '- Lang: ' . $lang ;
		{
			var field_value = Array();
			var field_name = Array();
			var puting_contents_field = "";
			var puting_contents_value = "";

			for (var sField of Object.values(vFields)) {
				if (sField != "") //$field_name[]	=	'field_' . $sField;
					//$field_value[]	=	$value_field ;
					{
						var value_field = brqx_get_field_value(sNodo, sField);
						puting_contents_field += "field_" + sField + " ";
						puting_contents_value += value_field + " ";
					}
			}

			file_put_contents("nodes/brqx_fields." + sNodo, puting_contents_field);
			file_put_contents("nodes/brqx_value." + sNodo, puting_contents_value);
			brqx_save_lang_node(sNodo, lang);
		}
};
