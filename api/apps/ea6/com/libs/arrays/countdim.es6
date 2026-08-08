// [DOCHANGED_NODE_PHP52_ES6]
//--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
//Farma AQR - AGILE ( BRQX NG Arquitectura 2018 )
//Farmacia Zaragoza - Zaragofarma - Estaestufarmacia
//---------------------------------------------------------------------------
//Brqx 2018 - 12/01/18				Depth:[0N]
//Version : 0.0.1                  Type :[FUNCTION]
//---------------------------------------------------------------------------
//- Notas
//---------------------------------------------------------------------------
//+ Inserta una cadena en un fichero ordenado
//---------------------------------------------------------------------------
//- Funciones
//---------------------------------------------------------------------------
//-- countdim
//---------------------------------------------------------------------------
//- Requiere
//---------------------------------------------------------------------------
//--
//--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
//Recibe un array e intelientenement lo ordena eliminando duplicados
//Ojo que es funcion 52 - 56

define("JS_TYP7" , 	path.join(global.ROOT, 'api/apps/es7/com/ctyp/t01/'			)))


const 	echo 		= 	require(	'node-echo'										);


function countdim(my_array)
{
    if (Array.isArray(my_array))
    {
		let initial_dim = 1
		let current_dim = initial_dim
		for (pos in my_array)
		{
			if (Array.isArray(my_array[pos]) )
			{
				var child_array = my_array[pos]
				dim	= initial_dim + countdim (child_array)

				if (dim > current_dim )		current_dim = dim
			}
		}
		return current_dim
    }
    return 0

}


// var a = [['a1','a2','a3'], [1,1,1 , [3,3,3]  ], [2,2,2, [3,3, [4,4,4],3]], [1,1,1]]
// var dim = countdim(a)
//echo ('Dims ' + dim  +  ' ')


module.exports.countdim = countdim
