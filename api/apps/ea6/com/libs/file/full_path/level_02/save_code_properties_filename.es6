// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Node Js - Farma AQR - AGILE ( BRQX NG Arquitectura 2018 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia
// ---------------------------------------------------------------------------
// Brqx 2017 - 22/10/17				Depth:[0N]
// Version : 0.0.1                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Almacena codigo y arrays en ficheros
// ---------------------------------------------------------------------------
// - Funciones
// ---------------------------------------------------------------------------
//-- save_properties|code_to_file - file_get_code
// ---------------------------------------------------------------------------
// - Requiere
// ---------------------------------------------------------------------------
//--
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

const 	fs 					= require(	'fs'																				);
		const path = require(	'path'																				);
		const os = require(	'os'																				);
		const empty = require(	'is-empty'									);
		const trim = require(	'trim'										);
		const mkdirp = require(	'mkdirp'										);
		const creff = require( 	'com/libs/file/full_path/level_02/create_full_filename.es6'	);

// Ok [17-10-22]
function save_update_properties_to_file(fich = '' , arr_properties = '')
{
		if (!empty(fich))
			creff.update_full_filename_with_array(	fich 		, arr_properties	)
}

// Ok [17-10-22]
function save_properties_to_file(fich = '' , arr_properties = '')
{
		if (!empty(fich))
			creff.create_full_filename_with_array(	fich 		, arr_properties	)
}

// Ok [17-10-22]
function save_code_to_file(fich = '', code = '')
{
		// Saving block code
		if ( !empty(fich) 	&&
			 !empty(code) 	)
		{
			creff.create_full_filename_with_code(		fich , code			)
		}
}

function save_binary_code_to_file(fich = '', code = '')
{
    // Ideal para ficheros binarios. Pero se basa en una url
	let dir = path.dirname (fich)

	if (!fs.existsSync(dir) )
	{
		mkdirp.sync(dir)
		fs.chmodSync(dir, 0775)
		let user = os.userInfo().username
		fs.chownSync(dir, 48 , 48 )

	}
	else if (!fs.existsSync(fich) )
	{

		// Y si no existe
		if ( fs.existsSync(fich) )
			// Truncamos uno existente
			fs.closeSync(fs.openSync(fich, 'w'))
		else
			// Creamos uno
			fs.openSync(fich, 'w')
	}

	fs.writeFileSync(fich, code)
}

// Pendiente de entender contexto
function save_properties_to_file_with_check(fich = '' , file_path = '', arr_properties = '')
{
	// lOS CREATE update eran para las traducciones
		if (!empty(fich) ) 	temp_file_path = fich
		else 				temp_file_path = file_path

		creff.update_full_filename_with_array(	temp_file_path 		, arr_properties	)

}

// Pendiente de entender contexto
function save_code_to_file_with_check(fich = '', file_path = '' , code = '')
{
		// Saving block code
		if (!empty(fich)) 	temp_file_path = fich
		else 				temp_file_path = file_path

//  		print 'pcomp - savefile' . temp_file_path . '<br>'
//		  	print 'pcomp - savefile' . this->code . '<br>'

		creff.create_update_full_filename(		temp_file_path , code			)
}

// Ok [17-11-02]
function file_get_code_clean(full_path_file = '')
{
	let br		=	'</br>'
	let code = 	''

	if (  !empty(full_path_file)   				&&
		  fs.existsSync(full_path_file) 		&&
		( fs.lstatSync(full_path_file).isFile() || fs.lstatSync(full_path_file).isSymbolicLink() )
		)
	{
		code = fs.readFileSync(full_path_file).toString()
	}
	return code
}

function file_get_code(full_path_file = '')
{
	// For live environments
	return file_get_code_clean (full_path_file)

	// For Dev environments

	// return file_get_code_with_name (full_path_file)

}

function file_get_svg_code(full_path_file = '')
{
	// For live environments
	// return file_get_code_clean (full_path_file)

	// For Dev environments

	return file_get_code_with_name (full_path_file)

}

function file_get_code_with_name(full_path_file = '')
{
	// Svg file to help on debugging
	var svg_name 	= '<!-- SVG : ' + full_path_file + ' -->'

	// Comentar para tener el codigo sin SVG
	svg_name		+= file_get_code_clean (full_path_file)
	return svg_name
}

module.exports.save_properties_to_file 			= save_properties_to_file
module.exports.save_update_properties_to_file	= save_update_properties_to_file
module.exports.save_code_to_file				= save_code_to_file
module.exports.save_binary_code_to_file			= save_binary_code_to_file

module.exports.file_get_code 					= file_get_code
module.exports.file_get_svg_code 				= file_get_svg_code
