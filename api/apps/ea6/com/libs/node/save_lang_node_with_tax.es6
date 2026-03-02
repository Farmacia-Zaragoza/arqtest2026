function brqx_save_lang_node_with_tax(sNodo, vFields, lang = "en") //NO FUNCIONA TODO JUNTO. NO VEO EL MOTIVO
//$sNodo='451';
{
	var lf = "\r\n";

	if (sNodo != "") //echo 'NODO: -'. $sNodo . '-' . $lf ;
		//Working update parragraphs
		//1.Guardar el valor de las categorias del nodo
		//2.Traducir el Nodo
		//3.Actualizar los codigos
		//Works
		//JUnto no funciona. No lo tengo claro pero si lanzo esta funcion no se actualiza el nodo
		//Necesito conocer para este nodo los valores de codigo articul y pagina articulo que tenía antes de hacer las actualizaciones
		//$field_name=array("field_codigo_articulo","field_pagina_articulo"); // Taxonomy Division_Prospecto (
		//$new_value=array("a0002","p02");
		///	cck_update_taxonomy($sNodo,$field_name,$field_value);
		{
			var field_value = Array();
			var field_name = Array();

			for (var sField of Object.values(vFields)) {
				if (sField != "") {
					var value_field = brqx_get_field_value(sNodo, sField);
					field_name.push("field_" + sField);
					field_value.push(value_field);
					puting_contents_field += "field_" + sField + " ";
					puting_contents_value += value_field + " ";
				}
			}

			file_put_contents("brqx_fields" + sNodo, puting_contents_field);
			file_put_contents("brqx_value" + sNodo, puting_contents_value);
			echo("Saving Node:" + sNodo + "- Lang: " + lang);
			brqx_save_lang_node(sNodo, lang);
		}
};
