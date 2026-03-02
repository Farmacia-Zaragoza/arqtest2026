// #!/usr/local/bin/node
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Node Js - Farma AQR - AGILE ( BRQX NG Arquitectura 2018 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia 
// ---------------------------------------------------------------------------
// Brqx 2017 - 22/10/21				Depth:[0N]
// Version : 0.0.1                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Promises examples. Entendiendo JS asincrono
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

function addToArray (data, array) {
  const promise = new Promise(function (resolve, reject) {
    setTimeout(function() {
      array.push(data)
	  // Caso de exito
      resolve(array)
    }, 3000);
    
	// Caso de error
    if (!array) {
      reject(new Error('No existe un array'))
    }
  })
  
  return promise
}


function addToArraY (data, array) {
  const promise = new Promise(function (resolve, reject) {
      array.push(data)
	  // Caso de exito
      resolve(array)
      if (!array) 
      {
	      reject(new Error('No existe un array'))
      }
  })
  
  return promise
}


// Ahora la función addToArray crea un objeto Promise que recibe como parámetros una función con las funciones resolve y reject

const array = [1, 2, 3]

var fnode = addToArray(4, array)
  .then(function() { return addToArray(5, array) })
  .then(function() { return addToArray(6, array) })
  .then(function() { return addToArray(7, array) })
  .then(function () {
	// Espera que se ejecuten todas las promesas
    console.log(array)
  })



// 


 

