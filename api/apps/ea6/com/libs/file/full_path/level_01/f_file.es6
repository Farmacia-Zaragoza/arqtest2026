// [DOCHANGED_PHP56_PHP52_NODE]
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Node Js - Farma AQR - AGILE ( BRQX NG Arquitectura 2018 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia
// ---------------------------------------------------------------------------
// Brqx 2017 - 22/10/21				Depth:[0N]
// Version : 0.0.1                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Crea un fichero basandose en ruta absoluta
// ---------------------------------------------------------------------------
// - Funciones
// ---------------------------------------------------------------------------
//-- file_put_contents - f_mkdirp
// ---------------------------------------------------------------------------
// - Requiere
// ---------------------------------------------------------------------------
//--
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

var 	cons 		= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.ess"	);

const 	fs 			= 	require(	'fs'													);
		const mkdirp = require(	'mkdirp'							);
		const empty = require(	'is_empty'							);
		const echo = require(	'node-echo'							);
		const nlr = require(	'node-line-reader'					);

// No comments 1.0
function no_comments(a)
{
	return  (a.substr(0,1) != "#" )
}

// No comments 2.0
function is_comment_line(line)
{
	// Funcion startsWith
	if ( line.lastIndexOf('#', 0) === 0  ||
	     line.lastIndexOf(' ', 0) === 0  ||
	     line.lastIndexOf('//', 0) === 0
	   )
	   return true
	return false

}

function is_comment_yaml_line(line)
{
	// Funcion startsWith
	if ( empty(line.trim()) 			  ||
		 line.substr(0,1) 		 === '#'  ||
	     line.trim().substr(0,1) === '_'  ||
	     line.substr(0,2) 		 === '//'
	   )
	   return true
	return false
}

function is_title_yaml_line(line)
{
	// Funcion startsWith
	if ( line.trim().substr(-1,1) === ':')
	   return true
	return false
}

function is_yaml_level(line, num_pased)
{
	// siempre es num menos 1. Puesto que el primer nivel no tiene espacios

	let num =  num_pased -1

	if (num == 0 ) return true

	// Funcion startsWith
	var spaces		= '  '.repeat(num)
	var num_yaml 	= num * 2

	// echo ('LINEPA :' + line + '-')
	// echo ('SPACES :' + spaces + '-')
	// echo ('SUBSTR :' + line.substr(0, num_yaml) + '-')

	if ( line.substr(0, num_yaml) === spaces )
	   return true
	return false

}

// Get File in Array
function get_content_file (file_name , array_name)
{
	var lines = fs.readFileSync(file_name, 'utf8').split('\n');
	var rawData = '';
	for (var l in lines){
	    var line = lines[l];
	    rawdata += line;
	}
	array_name = JSON.parse('[' + rawdata + ']');
}

function properties_from_file_async(file_name)
{
	LineReader = nlr.LineReader;
	var reader = new LineReader(file_name);
	this.arr	=	Array()

	// echo ('READING')

	// Each execution of nextLine will get a following line of text from the input file
	reader.nextLine(function (err, line) {

       	console.log('file line: ', line);

	    if (!err)
	    {
			if (!line.startsWith("#") )
			{
	        	console.log('file line: ', line);
				this.arr.push(line)
	        }
	    }
	});
}

function properties_from_file (file_name)
{
	// echo ('File to read  ' + file_name )
	var temp_arr = fs.readFileSync(file_name).toString().split('\n')
	this.arr = Array()

	for (pos in temp_arr)
	{
		line = temp_arr[pos]
		// echo('L ' + line)
		if (!is_comment_line(line) )
		{
			this.arr.push(line)
		}

	}
	// echo ('File Length  ' + this.arr.length )

	// Tenemos que devolverlo como objeto. Sino falla. En objetos si funciona pero con funciones y  arrays no
}

// Get properties in array
function array_from_file (file_name)
{
	// echo ('File to read  ' + file_name )
	this.arr = fs.readFileSync(file_name).toString().split('\n')

	// echo ('File Length  ' + array_name.length )

	// Tenemos que devolverlo como objeto. Sino falla. En objetos si funciona pero con funciones y  arrays no
}

// Get code
function file_get_contents (file_name)
{
	let code = fs.readFileSync(file_name)
	return code
}

// Save Array to File
function file_put_contents (file_name , array_name)
{
var file = fs.createWriteStream(file_name);
file.on('error', function(err) { /* error handling */ });
array_name.forEach(function(line) { file.write(line  + '\n'); });
file.end();
}

function f_mkdirp(folder)
{

	if (!fs.existsSync(folder))
	{

		mkdirp(folder, function (err) {
	    if (err) console.error(err)
	    else console.log('created folder ' + folder)
		})

	}
}

function is_file(file_name)
{
return fs.lstatSync(file_name).isFile()
}

function is_folder(file_name)
{
return fs.lstatSync(file_name).isDirectory()
}

function size(filename , help = '') {
	if (!empty(filename)		&&
		fs.existsSync(filename) &&
		fs.lstatSync(filename).isFile())
	{
	    var stats = fs.statSync(filename)
	    var fileSizeInBytes = stats["size"]
	    return fileSizeInBytes
    }
    // echo ('Wrong__file ' + help + ' ' + filename)
    return -1
}

// Sure fast copy -- pending to understand cb
function copy(source, target, cb = false) {

  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err)
  {
    if (!cbCalled)
    {
      cb(err);
      cbCalled = true;
    }
  }
}

module.exports.copy 				= 	copy
module.exports.size 				= 	size
module.exports.is_comment_line 		= 	is_comment_line
module.exports.is_comment_yaml_line = 	is_comment_yaml_line
module.exports.is_title_yaml_line	=	is_title_yaml_line
module.exports.is_yaml_level 		= 	is_yaml_level

// Get file in array
module.exports.file_get_contents 	= 	file_get_contents
// Objetos
module.exports.array_from_file 		= 	array_from_file
module.exports.properties_from_file = 	properties_from_file

