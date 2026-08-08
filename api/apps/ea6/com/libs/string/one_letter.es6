//Genera una cadena sin saltos de linea addicionales ni lineas en blanco

function fix_letter(str_in) //Reemplazamos los saltos de elinea
{
	var str_aux = strtolower_utf8_clean_for_file(str_in)
	str_aux = str_replace(" ", "_", str_aux)
	return str_aux
}

function one_letter(str_in) {
	var str_aux = fix_letter(str_in).trim()
	var str_len = str_aux.length
	if (str_len < 1) return "_"
	return str_aux
}

function two_letters(str_in) {
	var str_aux = fix_letter(str_in).trim()
	var str_len = str_aux.length
	if (str_len < 1) return "__"
	if (str_len < 2) return str_aux + "_"
	return str_aux
}

function three_letters(str_in) {
	var str_aux = fix_letter(str_in).trim()
	var str_len = str_aux.length
	if (str_len < 1) return "___"
	if (str_len < 2) return str_aux + "__"
	if (str_len < 3) return str_aux + "_"
	return str_aux
}

