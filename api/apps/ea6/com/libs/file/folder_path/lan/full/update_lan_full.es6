// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia 
// ---------------------------------------------------------------------------
// Brqx 2016 - 25/06/16				Depth:[03]
// Version : 0.0.2                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Actualiza ficheros de todos los idiomas y cambia BD de idiomas
// ---------------------------------------------------------------------------
// - Funciones 
// ---------------------------------------------------------------------------
//-- update_lan_file
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- update_full_filename
//-- get_translated_line
// ---------------------------------------------------------------------------
// - Ejemplo 
// ---------------------------------------------------------------------------
//-- update_lan_full FOLDER
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=


function update_lan_full(		folder_file, 
								parent				=	'PROSPECTOS'	, 
								folder_name_int	=	'AAAAAA'		, 
								file_name_int		=	'fichero' 		, 
								DATA				=	'datos' 		, 
								LANGS				=	'en'			, 
								SW_TRANSLATE_LINE	=	false			,		// Sw traduccion
								SW_MAIN_TRANSLATE	=	false			,		// Sw traduccion especial
								sep_int			=	'@@'			)
						
{
	
// Crea todos los idiomas traduciendo
lf="\r\n";
sep="/";

//echo "UP Linea principal : " + DATA + lf	; 


// Hay lenguajes UTF8 y lenguages especiales

array_LANG = explode(" ", LANGS);

folder_es_path=folder_file + sep +  parent + sep +  'es' + sep + folder_name_int;
full_es_name=folder_es_path  + sep + file_name_int;

// Puede ser que se actualize el fichero varias veces. Por tanto este control no tiene sentido
	#-Create Spanish file
update_lan_file(folder_file,parent,folder_name_int, file_name_int, DATA,'es');

foreach (array_LANG as slang)
{
// Tenemos ya la iteracion de los idiomas
//echo slang + lf;	

//		echo "Traducir Update" + slang + lf;

	if (SW_TRANSLATE_LINE)
	{
		if (SW_MAIN_TRANSLATE)
		{
//			echo "UPD - MAIN TRANSLATE : " + DATA + lf	; 
		// Solo se traduce si es una expresion principal - indice
			get_translated_line(DATA,TRANS_LINE, slang, folder_file ,sep_int, 'main');
		}
		else 
		{
//			echo "UPD -      TRANSLATE : " + DATA + lf	; 
		// Se debe traducir - Es una linea normal
			get_translated_line(DATA,TRANS_LINE, slang, folder_file ,sep_int);
		}
	}
	else
	{
		if (SW_MAIN_TRANSLATE)
		{
//			echo "UPD - MAIN TRANSLATE : " + DATA + lf	; 
			// Solo se traduce si es una expresion principal - indice
			get_translated_line(DATA,TRANS_LINE, slang, folder_file ,sep_int, 'main');
		}
		else 
		{
//			echo "UPD - NO   TRANSLATE : " + DATA + lf	; 
			// En este caso no se traduce
			TRANS_LINE		=	DATA	;
		}
	}

		update_lan_file(folder_file,parent,folder_name_int, file_name_int, TRANS_LINE, slang);
	}


}

