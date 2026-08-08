// [DOCHANGED_PHP56_PHP52_NODE]
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Node Js Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia
// ---------------------------------------------------------------------------
// Brqx 2016 - 22/06/16				Depth:[0N]
// Version : 0.0.1                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Crea un fichero basandose en ruta absoluta
// ---------------------------------------------------------------------------
// - Funciones
// ---------------------------------------------------------------------------
//-- create_full_filename
// ---------------------------------------------------------------------------
// - Requiere
// ---------------------------------------------------------------------------
//-- fs - path - empty
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

// Different ways to read a file
// -   Synchronously
// -   Asynchronously
// -   As a stream

define("JS_TYP7" , 	path.join(global.ROOT, 'api/apps/es7/com/ctyp/t01/'			))

const	fs 					= 	require(	'fs'													);
		const path = require(	'path'																		);
		const empty = require(	'is-empty'							);
		const echo = require(	'node-echo'							);
		const util = require(	'util'													);
		const os = require(	'os'													);
		const { printlog } = require(path.join(JS_BASE, 'com/objects/logs/printlog.es6'))
		const mkdirp = require(	'mkdirp'							);

// Ok [17-10-21]
function create_full_filename(full_file_name_int)
{
	dir = path.dirname (full_file_name_int)

	// Si no existe la carpeta - la creamos
	if (!fs.existsSync(dir) )
	{
		mkdirp.sync(dir)
		fs.chmodSync(dir, 0775)
		let user = os.userInfo().username

		fs.chownSync(dir, 48 , 48 )

	}

	// Lo estamos creando nunca va a existir. Solo podemos verificar que exista la ruta
	if (!empty(full_file_name_int)  										&&
		fs.lstatSync( path.dirname(full_file_name_int) ).isDirectory() 		)
	{
		// Truncamos uno existente
		fs.closeSync(fs.openSync(full_file_name_int, 'w'))

	}
}

// Ok [17-10-21]
function create_full_filename_with_code(full_file_name_int, passed_code)
{
	var l = new printlog()

	dir = path.dirname (full_file_name_int)

	// Si no existe la carpeta - la creamos
	if (!fs.existsSync(dir) )
	{
		// no es sincrono
		mkdirp.sync(dir)
		fs.chmodSync(dir, parseInt('0755',8))
		let user = os.userInfo().username

		fs.chownSync(dir, 48 , 48 )

	}

	// Lo estamos creando nunca va a existir. Solo podemos verificar que exista la ruta
	if (!empty(full_file_name_int)  										&&
		fs.lstatSync( path.dirname(full_file_name_int) ).isDirectory() 		)
	{

		if (!fs.existsSync(full_file_name_int) )
			// Truncamos uno existente
			fs.closeSync(fs.openSync(full_file_name_int, 'w'))

		// l.p('Before_to_write ' + passed_code.length + ' ' + full_file_name_int)

	    fs.writeFileSync(full_file_name_int, passed_code)

	}
}

// Piensa que es recursivo. Pero es sincrono. Es una mala practica
function create_folder (dir)
{
    let padre 	= path.dirname (dir)
	let hijo	= dir

	// Hacemos un sencillo create recursivo
	if (!fs.existsSync(padre))
		create_folder(padre)

	// Hemos creado el padre, lo normal es que no exista el hijo
	if (!fs.existsSync(hijo) )
	{
		// console.log('Runnin Mk ' + dir)

		// Funciona con promesas y no se ha gestionado el rechazo
		// mkdirp.sync(dir)
		fs.mkdirSync(hijo)

		// console.log('After Mk ' + dir)

		fs.chmodSync(hijo, parseInt('0755',8))

		// console.log('After  ChmodSync ' + dir)

		let name = os.userInfo().username
		let user = os.userInfo().uid

		if (name == "root" ) user = 48

		fs.chownSync(hijo, user , 48 )

		// console.log('CREATED')
	}

}

function create_folder_filename (full_file_name_int = '')
{
		// Crea la ruta del padre
		// Aqui tenemos un problema pues si queremos crear la ruta DIR/new_dir/file  nunca va a funcionar
		// Excepcion que da aqui de node :

		// [PROCESS] Unhandled Promise Rejection
		// - - - - - - - - - - - - - - - - - - -
		// { Error: EPERM, Operation not permitted
		//  at /mnt/ssd/brqx/base/react/zcommon/node_modules/uid-number/uid-number.js:49:16

        if (!empty(full_file_name_int) )
		{

	        // Create folder && crate filname
	        let dir = path.dirname (full_file_name_int)
			br='</br>'

		// /brqx/pers/drupal/v50/fnode/truck/pages/page/multi_hola/amiguetm/es_mi_comando_page_fr

		// console.log('Checking file ' + full_file_name_int)

			// 1.El padre ya es un fichero - caso nuevo - no se que hacer
			if ( fs.existsSync(dir) &&   fs.lstatSync(dir).isFile() )
				console.log('OFU1 !!! Ya existe un fichero padre: ' + padre )
			else
			{
				// console.log('Checking folder ' + dir)
				create_folder (dir)
			}
        }
       //  create_full_filename(full_file_name_int)      // Crea truncando

}

function create_folder_and_filename (full_file_name_int = '')
{
        if (!empty(full_file_name_int) )
		{
	        // Create folder && crate filname
	        dir = path.dirname (full_file_name_int)

            create_folder (dir)
	        create_full_filename(full_file_name_int)      // Crea truncando

			fs.chmodSync(full_file_name_int, parseInt('0755',8))

			fs.chownSync(full_file_name_int, 48 , 48 )

		}
}

function create_full_filename_with_array(full_file_name_int = '' , arr_data)
{
    // Lo estamos creando. El fichero no puede existir aun

    if ( !empty(full_file_name_int ) )
    {
    	dir =  path.dirname(full_file_name_int)
			if ( fs.existsSync(dir) 				&&
				 fs.lstatSync(dir).isDirectory()  	&&
		 		 util.isArray(arr_data)				)
    		{
				// Y si no existe
				if ( fs.existsSync(full_file_name_int) )
					// Truncamos uno existente
					fs.closeSync(fs.openSync(full_file_name_int, 'w'))
				else
					// Creamos uno
					fs.openSync(full_file_name_int, 'w')

				for (var DATA of Object.values(arr_data))
				{
					// Aqui tenemos que evitar los ctrl M
					// Est correcto pues hace un reemplazo global con la g
					input = DATA.replace('/\r\n/g', "")    // DOS style newlines
					input = input.replace('/\r/g', "")
				    LNDATA= input + os.EOL
				    fs.appendFileSync(full_file_name_int, LNDATA)
				}

			}
	}
}

// Crea y actualiza ficheros basado en fullpath
function create_update_full_filename(full_file_name_int = '', DATA)
{
    if ( !empty(full_file_name_int) && !empty(DATA) )
    {
    	dir =  path.dirname(full_file_name_int)
		if ( fs.existsSync(dir) 				&&
			 fs.lstatSync(dir).isDirectory()  	)
		{
		    LNDATA= DATA + os.EOL ;
			fs.appendFileSync(full_file_name_int,LNDATA)

			fs.chmodSync(full_file_name_int, parseInt('0755',8))
			let user = os.userInfo().username

			fs.chownSync(full_file_name_int, 48 , 48 )

		}
	}
}

function update_full_filename(full_file_name_int , DATA)
{
    if ( !empty(full_file_name_int) && !empty(DATA) )
    {
    	dir =  path.dirname(full_file_name_int)
		if ( fs.existsSync(dir) 				&&
			 fs.lstatSync(dir).isDirectory() 	)
		{
		    LNDATA= DATA + os.EOL
			fs.writeFileSync(full_file_name_int,LNDATA)
		}
	}
}

function update_full_filename_with_array(full_file_name_int , arr_data)
{
    if ( !empty(full_file_name_int ) )
    {
    	dir =  path.dirname(full_file_name_int)
			if ( fs.existsSync(dir) 							&&
				 fs.lstatSync(dir).isDirectory() 				&&
		 		 util.isArray(arr_data)							)
    		{
				for (var DATA of Object.values(arr_data))
				{
					// Aqui tenemos que evitar los ctrl M
					input = DATA.replace('/\r\n/g', "")    // DOS style newlines
					input = input.replace('/\r/g', "")
				    LNDATA= input + os.EOL
				    fs.appendFileSync(full_file_name_int, LNDATA)
				}
			}
	}

}

function delete_full_filename(full_file_name_int)
{
	if ( fs.existsSync(full_file_name_int) &&
		 fs.lstatSync(full_file_name_int).isFile() )
		     fs.unlinkSync(full_file_name_int)
}

function delete_if_exist_full_filename(full_file_name_int)
{
	if (fs.existsSync(full_file_name_int))
    	unlinkSync(full_file_name_int)
}

function filesize(filename) {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
}

function is_file(full_file_name_int)
{
	return fs.existsSync(full_file_name_int) &&
		   fs.lstatSync(full_file_name_int).isFile()
}

module.exports.create_full_filename 				= 	create_full_filename
module.exports.create_folder_filename 				= 	create_folder_filename
module.exports.create_full_filename_with_code		= 	create_full_filename_with_code
module.exports.create_full_filename_with_array 		= 	create_full_filename_with_array
module.exports.create_folder						=	create_folder

module.exports.update_full_filename					=	update_full_filename
module.exports.update_full_filename_with_array		=	update_full_filename_with_array

module.exports.create_update_full_filename			=	create_update_full_filename

module.exports.delete_full_filename					=	delete_full_filename
module.exports.delete_if_exist_full_filename		=	delete_if_exist_full_filename

module.exports.filesize								=	filesize
module.exports.is_file								=	is_file
