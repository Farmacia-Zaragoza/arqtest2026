//Devuelve una cadena en el mismo formato que la cadena modelo

function same_as(str_in = "", model_phrase = "") //Si es may devolvera mayusculas
//print "Model - " . $model_phrase . "\n\r"   
{
	var model = utf8_clean_for_file(utf8_clean_for_file_upper(strtok(model_phrase, " ")))
	var char_02 = ""
	var char_01 = model[0]
	if (model.length > 1) char_02 = model[1]

	if (ctype_upper(char_01) && ctype_upper(char_02)) //print "MAY - " . $char_01 . $char_02 . ' + ' . $model . "- \n\r"   
		{
			return str_in.toUpperCase()
		} else if (ctype_lower(char_01) && ctype_lower(char_02)) //print "MIN - " . $char_01 . $char_02 . ' + ' . $model . "- \n\r"   
		{
			return str_in.toLowerCase()
		} else if (ctype_upper(char_01) && ctype_lower(char_02)) return ucfirst(str_in)else //ALERT SAME_AS - _ + _-
		//print "ALERT SAME_AS - " . $char_01 . $char_02 . ' + ' . $model . "- \n\r"   
		//print utf8_clean_for_file('ácidos' . " \n\r")
		{
			return str_in
		}
}

