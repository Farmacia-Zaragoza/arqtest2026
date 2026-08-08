// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Node Js - Url LibraryFarma AQR - AGILE ( BRQX NG Arquitectura 2018 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia
// ---------------------------------------------------------------------------
// Brqx 2017 - 29/10/17				Depth:[0N]
// Version : 0.0.1                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Prepara urls con barra
// ---------------------------------------------------------------------------
// - Funciones
// ---------------------------------------------------------------------------
//-- url_with_bar - strpos
// ---------------------------------------------------------------------------
// - Requiere
// ---------------------------------------------------------------------------
//--
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=


function url_with_bar(url_pased)
{

	if (url_pased.substr(-1) !== '/' )
	url_pased+='/'

	return url_pased
}

// No me funciona
function points_count(input_line)
{
return (input_line.match(/\./g)).length
}


function substr_count(input_line , input_char)
{
// echo (  (line.match(/\./g) || []).length  )
var arr_str = input_line.split(input_char);

return arr_str.length
}


//Php strpos like
function strpos (haystack, needle, offset) {
  var i = (haystack+'').indexOf(needle, (offset || 0));
  return i === -1 ? false : i;
}


// Clase para reemplazar globalmente
function replace(string, source, target)
{
	this.result = string.replace(new RegExp(source, "g"), target)
}


module.exports.url_with_bar 		= url_with_bar
module.exports.substr_count 		= substr_count
module.exports.points_count 		= points_count
module.exports.strpos 				= strpos
module.exports.replace 				= replace

