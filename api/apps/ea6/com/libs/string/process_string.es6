//Procesa una cadena identificando numeros separadores y expresiones

function process_string(str_in) //
{
	var lr = "\n\r"
	var sep_multi_preg = "([0-9]|'|\"|\\{|\\}|\\<|\\>|\\[|\\]|\\(|\\)|,|\\.|\\:|\\|\\*|\\-|\\\xA1|\\!)"
	var sep_spaces_preg = "(\\ |_)"
	var arr_str = Array()

	for (var c = 0 c < str_in.length c++) arr_str.push(str_in[c])

	var word_started = false
	var word = ""

	for (var pos in arr_str) {
		var crc = arr_str[pos]

		if (preg_match(sep_multi_preg, crc)) {
			if (word_started) {
				print("pos -es palabra - " + pos + " crc " + word + lr)
				word_started = false
				word = ""
			}

			print("pos -es separador - " + pos + " crc " + crc + lr)
		} else if (preg_match(sep_spaces_preg, crc)) {
			if (word_started) {
				print("pos -es palabra - " + pos + " crc " + word + lr)
				word_started = false
				word = ""
			}

			print("pos -es espacio - " + pos + " crc " + crc + lr)
		} else //es un caracter
			{
				word += crc
				word_started = true
			}
	}

	if (word_started) {
		print("pos -es palabra - " + pos + " crc " + word + lr)
		word_started = false
	}
}

