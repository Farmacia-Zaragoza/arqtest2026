// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Node Js - Farma AQR - AGILE ( BRQX NG Arquitectura 2017 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia 
// ---------------------------------------------------------------------------
// Brqx 2017 - 31/10/17				Depth:[0N]
// Version : 0.0.3                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Funciones de copia de ficheros
// ---------------------------------------------------------------------------
// - Funciones 
// ---------------------------------------------------------------------------
// - d-copy_full_filename- (normal/ascii | binary)
// - d-copy_binary_full_filename-
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- fs - path - echo - request
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

const	fs 					= 	require(	'fs'																		);
		const path = require(	'path'																		);
		const echo = require(	'/brqx/base/react/zcommon/node_modules/node-echo'							);
		const request = require(	'/brqx/base/react/zcommon/node_modules/request'								);
		const os = require(	'os'																		);
		const mkdirp = require(	'/brqx/base/react/zcommon/node_modules/mkdirp'								);

// Ok [17-10-21]
function copy_full_filename(abs_source , abs_target)
{

	if ( fs.existsSync(abs_source) &&   
		(
		fs.lstatSync(abs_source).isFile()  			|| 
		fs.lstatSync(abs_source).isSymbolicLink()   
		)
	   )
	{
		dir = path.dirname (abs_target)			

		// echo (dir)

		// No funciona si no existe
		if (!fs.existsSync(dir) ) 
		{	
			// Caso 1 no existe
			mkdirp.sync(dir)
			fs.chmodSync(dir, 0775)					
			// apache is 48 uid - gid
			// let user = os.userInfo().username					
			fs.chownSync(dir, 48 , 48 )						
		}
		// echo ('S ' +  abs_source + ' T ' + abs_target)

		// Y si no existe
		if ( fs.existsSync(abs_target) )
			// Truncamos uno existente
			fs.closeSync(fs.openSync(abs_target, 'w'))
		else
			// Creamos uno
			fs.openSync(abs_target, 'w')

		fs.copyFileSync(abs_source,abs_target)

	} 
	else
        console.log("cff::The file dont exist or is not a file : S " + abs_source  + " - T " + abs_target)

}

// Ok [17-10-21]
function copy_binary_full_filename(abs_source , abs_target)
{
    // Ideal para ficheros binarios. Pero se basa en una url
	let dir = path.dirname (abs_target)			

	if ( fs.existsSync(abs_source) &&  fs.lstatSync(abs_source).isFile() )
	{
		if (!fs.existsSync(dir) ) 
		{	
			mkdirp.sync(dir)
			fs.chmodSync(dir, 0775)					
			let user = os.userInfo().username					

			fs.chownSync(dir, 48 , 48 )						
		}

		if ( fs.existsSync(abs_target) )
			// Truncamos uno existente
			fs.closeSync(fs.openSync(abs_target, 'w'))
		else
			// Creamos uno
			fs.openSync(abs_target, 'w')
		
		fs.copyFileSync(abs_source, abs_target,'binary')

	}
	else
        console.log("cbff::The file dont exist or is not a file : " + abs_source  + " - T " + abs_target )
	
}

// Ok [17-10-21]
function copy_binary_from_url(url_source , abs_target)
{
	dir = path.dirname (abs_target)			

	if (!fs.existsSync(dir) ) 
	{	
		mkdirp.sync(dir)
		fs.chmodSync(dir, 0775)					
		let user = os.userInfo().username					
		fs.chownSync(dir, 48 , 48 )						

	}

    // Ideal para ficheros binarios. Pero se basa en una url
	request.get({url: url_source, encoding: 'binary'}, function (err, response, body) {
	  fs.writeFile(abs_target, body, 'binary', function(err) {
	    if(err)
	      console.log(err);
	    //else
	    //  console.log("The file was saved!")
	  }) 
	})

}

// Ok [17-10-21]
function link_full_filename(abs_source , abs_target)
{
	if ( fs.existsSync(abs_source) &&  fs.lstatSync(abs_source).isFile() )
	{
		dir = path.dirname (abs_target)			

  		if (!fs.existsSync(dir)) 
  		{
			mkdirp.sync(dir)
			fs.chmodSync(dir, 0775)					
			fs.chownSync(dir, 48,48)						
		}
		
		// Revisar
		fs.symlinkSync(abs_source,abs_target)					
	}
	else
        console.log("lff::The file dont exist or is not a file : " + abs_source  + " - T " + abs_target)

}

module.exports.copy_full_filename 						=	copy_full_filename 
module.exports.copy_binary_full_filename				=	copy_binary_full_filename
module.exports.copy_binary_from_url						=	copy_binary_from_url
module.exports.link_full_filename						=	link_full_filename

