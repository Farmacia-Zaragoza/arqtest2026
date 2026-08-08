function brqx_update_lang_node_with_tax(sNodo, lang = "en") //$sNodo='451';
{
	var lf = "\r\n";
	var sep_int = " ";
	var string_sep = "/[" + sep_int + "]+/";

	if (sNodo != "") //echo 'NODO: -'. $sNodo . '-' . $lf ;
		//Falta comprobar si existen los archivos
		//Working update parragraphs
		//1.Guardar el valor de las categorias del nodo
		//3.Actualizar los codigos
		//Works
		{
			var field_value = Array();
			var field_name = Array();
			var sField_init = file_get_contents("nodes/brqx_fields." + sNodo);
			var sValue_init = file_get_contents("nodes/brqx_value." + sNodo);
			var vField = preg_split(string_sep, sField_init);
			var vValue = preg_split(string_sep, sValue_init);
			field_value = Array();
			field_name = Array();

			for (var sField of Object.values(vField)) {
				if (sField != "") //echo "Campo: " . $sField . $lf;
					{
						field_name.push(sField);
					}
			}

			for (var sValue of Object.values(vValue)) {
				if (sValue != "") //echo "Valor: " . $sValue . $lf;
					{
						field_value.push(sValue);
					}
			}

			cck_update_taxonomy(sNodo, field_name, field_value);
		}
};

