#!/usr/local/bin/node
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Node Js - Farma AQR - AGILE ( BRQX NG Arquitectura 2018 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia 
// ---------------------------------------------------------------------------
// Brqx 2017 - 22/10/21				Depth:[0N]
// Version : 0.0.1                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Callbacks examples. Entendiendo JS asincrono
// ---------------------------------------------------------------------------
// - Funciones 
// ---------------------------------------------------------------------------
//--  
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- 
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

const 	fs 			= 	require('fs'																					),
		mkdirp 		= 	require('/brqx/base/react/zcommon/node_modules/mkdirp'											),
		echo 		= 	require(	'/brqx/base/react/zcommon/node_modules/node-echo'									);


// No callback example

function addToArrayA (data, array) 
{
  setTimeout(function() { 
    array.push(data)
  }, 3000)
}

// CallBacks example

function addToArrayB (data, array, callback) 
{
  if (!array) 
  {
	// Formato CB ( error , array ) 
    callback(new Error('No existe el array'), null)
  } 
   setTimeout(function() { 
    	array.push(data)

		// Formato CB ( error , array ) 
    	callback(null, array)
   }, 3000)
}

var myarray = [1,2,3]

// With callback
addToArrayB(4, myarray, 

	// Formato CB ( error , array )
	// No hace falta enviar el array pues ya lo tenemos
	// El error lo necesitamos para gestionar el retorno. 
	// - Si hay error enconces no hacemo nada
	// - Si no hay error entonces imprimimos el array 
	function (check_err)  // (check_err , myarray)
	{
  		if (check_err) return console.log(err.message)
  		console.log(myarray)
	}
)
// Without callback

addToArrayA(5, myarray) 
console.log(myarray)


// Cuando se termine de ejecutar la función addToArrayB se ejecutará el callback y nos mostrará el array con el nuevo dato.
// Aparecera detras del array 123 aunque se ha ejecutado antes

[ 1, 2, 3 ]
[ 1, 2, 3, 4 ]


 

