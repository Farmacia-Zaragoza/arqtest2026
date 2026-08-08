//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js - Funciones match para gestionar patrones en rutas y mucho mas - falta revisar
//Updated 2017 - 08 - 25
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [COMMON-EA6]
//-------------------------------------------------------------------------------------
//Fast node load - Manage page and type combinations
//-------------------------------------------------------------------------------------

var 	cons 				= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.ess"		);

const 	glob 				= 	require(	'glob'										);
		const empty = require(	'is-empty'									);
		const path = require(	'path'														);

// Php strpos function
function strpos (haystack, needle, offset) {
  var i = (haystack+'').indexOf(needle, (offset || 0));
  return i === -1 ? false : i;
}

function match_path(str, path)
{
	var full_path_return = ""
	var arr_complex = Array()
	var arr_matches = Array()
	var last_elem = get_ideal_word(str, 1, arr_complex)
	if (path.substr(-1) != "/") path += "/"

	if (last_elem != "is_complex")
		arr_matches = glob(path + "*" + last_elem + "*")

	/*
	// glob("**.js", options, function (er, files) {
	  // files is an array of filenames.
	  // If the `nonull` option is set, and nothing
	  // was found, then files is ["**.js"]
	  // er is an error object or null.
	})
	*/
	// path/simple* - all files and folders in path not recoursive
	// path/double** - everything in path recoursively

	else //30809*lbufeira*laya*o*aneco
		//print ('match:: Str ' . $match_str . "\r\n")
		{
			var match_str = ""

			for (var elem of Object.values(arr_complex)) match_str += "*" + elem

			arr_matches = glob(path + match_str + "*")
		}

	if (arr_matches.length > 0) //print ('Match ' . $arr_matches[0] . "\r\n")
		///sata/Fotos/myr/2048x1536/2006/Portugal/b02_Lisboa
		{
			full_path_return = arr_matches[0]
		}

	return full_path_return
}

function match_word(str) //a01_Palabra_Loquesea
//Ej: a01_Lisboa ==> isboa
{
	var full_path_return = ""
	var arr_complex = Array()
	var arr_matches = Array()
	var last_elem = get_ideal_word(str, 0, arr_complex)

	if (last_elem == "is_complex") {
		last_elem = ""
		var num_elems = arr_complex.length - 1

		for (var pos in arr_complex)
		{
			var elem = arr_complex[pos]
			last_elem += elem
			if (pos < num_elems) last_elem += " "
		}
	}

	return last_elem
}

function get_ideal_word(str, substr = 1, complex_arr = "")
{
	// equivalent - pregsplit
	var output = str.split("/(-|_)/")

	var num_delim = output.length - 1
	var last_elem = ""

	switch (num_delim) {
		case 0:
			last_elem = str.substr(substr)
			break

		case 1:
			last_elem = output[1].substr(substr)
			break

		default:
			for (var elem of Object.values(output)) {
				if (!empty(elem))
					complex_arr.push(get_ideal_word(elem, substr))
			}

			last_elem = "is_complex"
			break
	}

	return last_elem.toLowerCase()
}

// Reviewed 2017-11-24
function sort_query(qri)
//Recibe una query y la devolvemos ordenada y no repetida
//Ahora los numeros deben ir al final
{
	var original_path_arr = qri.split("/")

	original_path_arr.sort()

	var output_arr = Array()
	var numbers_arr = Array()
	var words_arr = Array()

	for (var pos in original_path_arr)
	{
		var no_trim_elem = original_path_arr[pos]
		if (!empty(no_trim_elem) )
		{
			var elem_spaces = no_trim_elem.replace(/[&|@\/\\#,+()$~%.'":*?<>{}]/g,' ');

			// CON ESTO DEJAMOS SOLO LOS DE INGLES
			var elem_no_special = elem_spaces.replace(/[^a-zA-Z0-9_-]/g,'');
			// 02 - Limpiamos spacios exteriores
			var elem_trim = elem_no_special.trim()
			// 03 - Limpiamos espacios interiores
			var elem = elem_trim.replace(/\s\s+/g, '_');

			var pos_repeat
			var ideal_elem = get_ideal_word(elem, 0)

			if (!output_arr.includes(ideal_elem))
				output_arr.push(ideal_elem)
		}
	}

	for (var pos in output_arr) {
		var elem = output_arr[pos]
		if (is_numeric(elem))
			numbers_arr.push(elem)
		else
			words_arr.push(elem)
	}

	if (Array.isArray(numbers_arr)) for (var pos in numbers_arr) {
		var elem = numbers_arr[pos]
		words_arr.push(elem)
	}
	var query_result = words_arr.join("/")
	return query_result
}

module.exports.match_path		=	match_path
module.exports.match_word		=	match_word
module.exports.get_ideal_word	=	get_ideal_word
module.exports.sort_query		=	sort_query
module.exports.strpos			=	strpos
