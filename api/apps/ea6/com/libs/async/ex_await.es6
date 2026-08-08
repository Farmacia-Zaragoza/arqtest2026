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

const 	fs 			= 	require('fs'																					);
		const mkdirp = require('/brqx/base/react/zcommon/node_modules/mkdirp'											);
		const echo = require(	'/brqx/base/react/zcommon/node_modules/node-echo'									);

// No callback example

function addToArray (data, array) {
  const promise = new Promise(function (resolve, reject) {
    setTimeout(function() {
      array.push(data);
      resolve(array);
    }, 1000);
    
    if (!array) {
      reject(new Error('No existe un array'));
    }
  })
  
  return promise;
}

async function processData (data, array) {
  try {
    const result = await addToArray(data, array);
    console.log(result)
  } catch (err) 
  {
    return console.log(err.message);
  }
}

const array = [1, 2, 3];

processData(4, array)
// [1,2,3,4]
processData(5, array)
// [1,2,3,4,5]
processData(6, array)
// [1,2,3,4,5,6]
