//--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
//Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
//Farmacia Zaragoza - Zaragofarma - Estaestufarmacia [Php_56]
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
//-- stringToArray
//---------------------------------------------------------------------------
//- Requiere
//---------------------------------------------------------------------------
//--
//--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
//Convierte cadena en array de caracteres
//Ya es array de caracteres
//uri@nocache_0_100

function stringToArray(s) {
	var r = Array()

	for (var i = 0 i < s.length i++) r[i] = s[i]

	return r
}

function process_string_to_vars(uri = "", pos = "", method = "", beg_pg = "", end_pg = "", symbol = "@", sep = "_") 
//Procesa una cadena gestionando los argumentos tras un separador
//Search uri with pagination
//Cadena a devolver sin la zona de busqueda
//Longitud completa de la cadena incluyendo la zona de busqueda
//print 'string - len   :' . $len . '-' . $pg_params . ' <br>'
{
	var len_params
	var uri_search = uri.substr(0, pos)
	var len = uri.length - 1
	var pg_params = uri.substr(pos + 1, len)

	if ((len_params = pg_params.length) > 0) //Puede ser 0 1 2
		{
			var pg_params_arr = pg_params.split("_")
			var len_arr = pg_params_arr.length
			if (len_arr < 4) if (len_arr > 2) {
				method = pg_params_arr[0]
				beg_pg = pg_params_arr[1]
				end_pg = pg_params_arr[2]
			} else if (len_arr > 1) {
				if (is_numeric(pg_params_arr[0])) {
					beg_pg = pg_params_arr[0]
					end_pg = pg_params_arr[1]
				} else {
					method = pg_params_arr[0]
					beg_pg = pg_params_arr[1]
				}
			} else if (is_numeric(pg_params_arr[0])) beg_pg = pg_params_arr[0]else method = pg_params_arr[0]
		}

	uri = uri_search
}
