// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Node Js - Farma AQR - AGILE ( BRQX NG Arquitectura 2018 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia
// ---------------------------------------------------------------------------
// Brqx 2018 - 24/10/18				Depth:[0N]
// Version : 0.0.1                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Functiones gestion de arrays y queries
// ---------------------------------------------------------------------------
// - Funciones
// ---------------------------------------------------------------------------
//-- copy_full_filename
// ---------------------------------------------------------------------------
// - Requiere
// ---------------------------------------------------------------------------
//--
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

const	mat					= require('libs/string/match.es6'			);
		const path = require(	'path'														);
		const fs = require(	'fs'														);
		const os = require(	'os'														);
		const empty = require(	'is_empty'			);
		const is_numeric = require(	'isnumeric'			);
		const ucfirst = require(	'ucfirst'				);

// Javascript always passes by value. However, if you pass an object to a function, the "value" is really a reference to that objec

// Genera una linea de resutlados para almacenar
function set_results_line(doc , sep , search_line)
{

	let path_alias 		= 	doc.path_alias		 // Uri
	let id				= 	path.basename (doc.path ) 			 // node/36539
	search_line			= 	id + sep + path_alias

	this.result = search_line
}

function process_results_array(	query_docs 						,
								arr_results 					,
								forcode 						,
								sep 			= '@' 			,
								end_line 		= '</br>'		)
{
	// Genera una cadena con todos los resultados
	// Devuelve array results

	if (Array.isArray(query_docs))
	{
		// foreach ( query_docs as index => doc )
		let _query_docs = Array.from(query_docs)
		for (var index in _query_docs)
		{
			var doc			=	query_docs[index]

		  //"path": "node/3543"
			set_results_line(doc, sep , search_line)							 // Search line
		 //	arr_results[index]	=	search_line
			arr_results.push ( search_line	)
			forcode	+=	search_line + end_line
		}
	}
}

function process_generate_results_array(	query_docs 			,
											arr 				,
											index_arr = 'rst'	)
{
	//br = "\n\r"
	// br = "</br>"

	// Genera una cadena con todos los resultados
	// Devuelve array results
    //foreach ( query_docs as index => doc )
	let _query_docs = Array.from(query_docs)
	for (var index in _query_docs)
	{
		var doc			=	query_docs[index]
	  //"path": "node/3543"
	  // 52168@codigo/espana/madrid/[field_anno-term]/brqx_mad06sls
	  	let path_alias 		= 	doc.path_alias				 // Uri
	  	// Alias recuerdo/2007/espana/madrid/reyes_2006_2007
		id				= 	path.basename (doc.path ) 		 // node/36539
		//type 			=
			 //	arr_results[index]	=	search_line
		arr[index_arr][id]	=	path_alias
	}
}

// Generate solr query string
function generate_query(arr_qrys , query , method = 'OR')
{
	// echo ('Antes de check array ' + arr_qrys.length)
	if (Array.isArray(arr_qrys))
	{
		// echo ('Tras de check array')
		let arr_size = arr_qrys.length
		let cont = 0

		// echo ('Tras de check array ' + arr_size )

		//foreach (arr_qrys as arg)
		for (var arg of Object.values(arr_qrys))
		{
			query 	+=	arg
			cont++

			if (cont < arr_size) query +=  ' ' + method + ' '

		}
	}

	 // echo ('QQ:' + query + ':--+')

	this.result = query
}

function create_solr_query_field(	qry_string	=	''			,
									qry_name 	=	''			,
									arg		=	''				)
{
	let arg_clean	=	arg.replace( "/\r|\n/", "")

	// echo ('Argumento '+ arg + ' Clean ' + arg_clean )

	if (is_numeric(arg_clean) )
			qry_string = 	qry_name + ':*' 			+	arg	+ '*'
	else
	{
	// VAmos a hacerlo mas inteligente. si son numeros no hace falta el or

		// ?q=(sm_vid_Lugar%3A*Madrid*)+or%0A(sm_vid_Lugar%3A*madrid*)%0A&wt=json&indent=true
		qry_string = '('

		qry_string += 	qry_name + ':*' 			+	arg_clean.toLowerCase()	+ '*'
		qry_string += ' or '
		qry_string +=	qry_name + ':*' 			+	ucfirst(arg_clean)		+ '*'

		qry_string += ')'

	}
	// echo ('Argumento '+ arg + ' Clean ' + arg_clean  + ' Q :' + qry_string + '--')
	this.result = qry_string

}

function create_solr_query_field_num(	qry_string	=	''			,
										qry_name 	=	''			,
										arg		=	''			)
{
//		qry_string = 'sm_vid_Pais:*' 			+	strtolower(arg)	+ '*'	+	' OR '
//		qry_string +='sm_vid_Pais:*' 			+	ucfirst(arg)	+ '*'

		qry_string = 	qry_name + ':*' 			+	arg	+   '*'

		this.result = qry_string
}

// content is a file converted as string. Not a file converted as array
function exist_in_content(	content 			= 	''				,
							string_to_search	=	''				)
{
	if (!empty(content) && !empty(string_to_search) )
        if (mat.strpos(content, string_to_search) !== false )
        	return true
	return false

}

// Comprueba si existe en el array la cadena
function exist_in_array(	arr 							,
							string_to_search		=	''	,
							position				=	''	)
{
	position = -1
	let low_search = string_to_search.toLowerCase()

	if (Array.isArray(arr))
	{
		// foreach(arr as key=>line)

		let _arr = Array.from(arr)
		for (var key in _arr)
		{
			var line			=	_arr[key]

			// strpos busca en la cadena no es la posicion o indice en el array
			let low_line = line.toLowerCase()
	//		low_line = preg_replace( "/\r|\n/", "", low_line_break)

			// Ojo - Activando este echo vemos todas las consultas a los arrays
			// echo low_line  + '  -  ' + low_search  + "\n\r"
			// strpos string to search - expresion_a_buscar
			// Si lo encuentra devuelve 0

	//		pos = strpos(low_line , low_search )

			let swpos = false

			if ( swpos= mat.strpos(low_line , low_search   ) !== false )
			{
				// echo ( swpos + ' -- ' + '+' + low_line + '+'  + '  -  *' + low_search  + "\n\r" )

				position = key
				return true
		    }
		}

	}
//	echo "Internal Position " + position  + "\n\r"
	return false
//	if (position == -1) return false
//	return true

}

// Comprueba la cadena en todos los arrays
function exist_in_array_langs(	arr_langs 						,
								string_to_search			= '',
								position					= '',   // Posicion de la expresion buscada
								lang						= '')	// Idioma en el que se encuentra la expresion buscada
{
	// No Son arrays de dos dimensiones. Son arrays de arrays para poder reutilizar funciones
	// 1. Primer array / dimension - El idioma
	// 2. Segundo array / dimension - El termino

	let c=0
	//foreach (arr_langs as key=>int_arr)
	let _arr_langs = Array.from(arr_langs)
	for (var key in _arr_langs)
	{
		var int_arr			=	_arr_langs[key]

//		echo "Processing " + key	. ' - ' +  string_to_search + ' ' + count (int_arr)			. "\n\r"
		if (exist_in_array(int_arr , string_to_search , position) )
		{
			lang = key
			return true
		}
		c++
	}

	// Indice del termino en el array interno
//	echo "Position: " + position + "\n\r"

	return false

}

// aqui pasamos un array
// qry.exist_in_array_resolutions(	this.arr['ini'] , this.foto_resolutions.entity_arr	)
function exist_in_array_resolutions(	arr_elem 						,
										arr_resolutions 			)
{
	// Hay que iterar los elementos y ver si algunos es una resolucion
	// echo ("AA-Before enter resolutions " + elem +  ' res size ' + arr_resolutions.length)
	// foreach (arr_resolutions as resolution)
	for (var elem in arr_elem)
		for (var resolution of Object.values(arr_resolutions))
		{
			// echo ("AA-Res " + resolution + ' E ' + elem)
			if (exist_in_array(elem , resolution) )
			{
				return true
			}
		}
		// echo ("AA-Before go out resolutions " + elem +  ' res size ' + arr_resolutions.length)

	return false

}

// Guarda un array de un fichero en otro array
function load_array_file_in_array_master (array_master , file_to_load , lang)
{
//	echo "Loading : " + lang + ' - ' + file_to_load +  "\n\r"
	if ((!empty(file_to_load )  ) &&
		( fs.existsSync(file_to_load ) &&   fs.lstatSync(file_to_load ).isFile() ) )
	{
		let aux_arr				=	Array()
		aux_arr 				=	fs.readFileSync(file_to_load).toString().split('\n')
		// aux_arr 				=	file(file_to_load)
		array_master[lang]		=	aux_arr

//		echo "After load master " + lang +  "\r\n"

	}
}

module.exports.set_results_line					=	set_results_line
module.exports.process_results_array			=	process_results_array
module.exports.process_generate_results_array	= 	process_generate_results_array
module.exports.generate_query					=	generate_query
module.exports.create_solr_query_field			= 	create_solr_query_field
module.exports.create_solr_query_field_num		= 	create_solr_query_field_num
module.exports.exist_in_content					= 	exist_in_content
module.exports.exist_in_array					= 	exist_in_array
module.exports.exist_in_array_langs				= 	exist_in_array_langs
module.exports.exist_in_array_resolutions		= 	exist_in_array_resolutions
module.exports.load_array_file_in_array_master	=	load_array_file_in_array_master

