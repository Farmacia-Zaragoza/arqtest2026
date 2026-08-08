//--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
//Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
//Farmacia Zaragoza - Zaragofarma - Estaestufarmacia
//---------------------------------------------------------------------------
//Brqx 2016 - 22/06/16				Depth:[0N]
//Version : 0.0.1                  Type :[FUNCTION]
//---------------------------------------------------------------------------
//- Notas
//---------------------------------------------------------------------------
//+ Convierte cadena en array de caracteres (chars)
//---------------------------------------------------------------------------
//- Funciones
//---------------------------------------------------------------------------
//-- trans_sort
//---------------------------------------------------------------------------
//- Requiere
//---------------------------------------------------------------------------
//--
//--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
//Recibe un array e intelientenement lo ordena eliminando duplicados
//Ojo que es funcion 52 - 56

function trans_sort(arr_in, sep = "@@") //Method name
//A. Ordenamos el array
//B. Procesamos inteligentemente
{
	var m = "trans_sort-:";
	arr_in.sort("strcasecmp");
	var previous_line_es = "";
	var previous_line_lan = "";

	for (var pos in arr_in) //[PR_ENABLED]
	{
		var line = arr_in[pos];
		print(m + line);
	}
};

