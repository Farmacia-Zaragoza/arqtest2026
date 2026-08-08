// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia 
// ---------------------------------------------------------------------------
// Brqx 2016 - 22/06/16				Depth:[03]
// Version : 0.0.1                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Genera un fichero basandose en carpeta y ruta relativa
// ---------------------------------------------------------------------------
// - Funciones 
// ---------------------------------------------------------------------------
//-- create_file
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- create_full_filename
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

const 	fs 					= require(	'fs'																				);
		const creff = require( 	'/brqx/base/rcode/es6/com/libs/file/full_path/level_02/create_full_filename.es6'	);
		const empty = require(	'/brqx/base/react/zcommon/node_modules/is-empty'									);
		const recursive = require(	'/brqx/base/react/zcommon/node_modules/klaw-sync'									);
		const rimraf = require(  '/brqx/base/react/zcommon/node_modules/rimraf'										);
		const echo = require(	'/brqx/base/react/zcommon/node_modules/node-echo'									);

function create_file(folder_name, file_name )
{
	if (!fs.existsSync(folder_name) ) 
	{	
		mkdirp.sync(folder_name)
		fs.chmodSync(folder_name, 0755)
		let user = os.userInfo().username					
		fs.chownSync(folder_name, 48 , 48 )						

	}

	// Now we create file - Only add information the first time
    full_file_name=folder_name + "/" + file_name
    creff.create_full_filename(full_file_name)
}

function update_file(folder_name, file_name , DATA)
{
	
	// Now we create file
    full_file_name=folder_name + "/" + file_name
    creff.update_full_filename(full_file_name , DATA)
}

function create_update_file(folder_name, file_name_int , DATA)
{
	if (!fs.existsSync(folder_name) ) 
	{	
		mkdirp.sync(folder_name)
		fs.chmodSync(folder_name, 0755)
		let user = os.userInfo().username					
		fs.chownSync(folder_name, 48 , 48 )						
	}

	full_file_name=folder_name + "/" + file_name_int
    creff.create_update_full_filename(full_file_name, DATA)
}

function ignoreFunc(file, stats) {
  return !stats.isDirectory() || !stats.isFile()
}

// Based on klaw-sync
function delete_folder_if_exist(dirPath)
{

	if (!empty(dirPath)   && fs.existsSync(dirPath)				&&
		fs.lstatSync( dirPath ).isDirectory() 		)
    {

		rimraf.sync(dirPath)
	}
}

function delete_folder_content_if_exist(dirPath)
{

	if (!empty(dirPath)  							&&
		fs.lstatSync( dirPath ).isDirectory() 		)
    {

		if (dirPath.indexOf('/', dirPath.length - 1) == -1 )    
	    {
	        dirPath += '/'
	    }
	
		// echo ('D ' + dirPath)

		var files = recursive(dirPath)
	
		// paths = [{path: '/some/dir/dir1', stats: {}}, {path: '/some/dir/file1', stats: {}}]
	
	    for (var path of Object.values(files)) 
	    {
			let file = path.path
			let stat = path.stats

	    	console.log('File ' + file )
	    	
	        if (fs.lstatSync( file ).isFile()) 
	        {
	        	console.log('unlink file ' + file )
	        	// fs.unlinkSync(file)
	        } 
	    }
    	// rmdir(dirPath)
	}
}

module.exports.delete_folder_if_exist 			= 	delete_folder_if_exist
module.exports.delete_folder_content_if_exist	= 	delete_folder_content_if_exist
