// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia 
// ---------------------------------------------------------------------------
// Brqx 2016 - 25/06/16				Depth:[03]
// Version : 0.0.2                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Genera ficheros para los n idiomas actualizando BD de idiomas
// ---------------------------------------------------------------------------
// - Funciones 
// ---------------------------------------------------------------------------
//-- create_lan_full
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- create_lan_file
//-- get_translated_line
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

// PENDING TO REVIEW
function create_lan_full( 		folder_file							, 
								parent				=	'PROSPECTOS'	, 
								folder_name_int		=	'AAAAAA'		, 
								file_name_int		=	'fichero' 		,
								DATA				=	'datos'			,
								LANGS				=	'en'			,
								SW_TRANSLATE_LINE	=	false			,
								SW_MAIN_TRANSLATE	=	false			,
								sep_int			=	'@@'			)
{
// Crea todos los idiomas traduciendo
// 1. Crea el fichero
// 2. ACtualiza cadenas en BD de idiomas

lf="\r\n"
sep="/"


array_LANG = explode(' ', LANGS)
//array_LANG = stringToArray(LANGS) // Characters array

folder_es_path=folder_file + sep +  parent + sep +  'es' + sep + folder_name_int
full_es_name=folder_es_path  + sep + file_name_int

create_lan_file(folder_file,parent,folder_name_int,file_name_int,'es')

foreach (array_LANG as slang)
{
// Tenemos que crear el fichero y que traducir el indice
//echo slang + lf	

	folder_full_path=folder_file + sep +  parent + sep +  slang + sep + folder_name_int
    full_file_name=folder_full_path  + sep + file_name_int

//	echo "Crear futuro fichero a traducir" + lf
	create_lan_file(folder_file,parent,folder_name_int,file_name_int,slang)

	if (SW_TRANSLATE_LINE)
	{
		if (SW_MAIN_TRANSLATE)
		{
//			echo "CRE - MAIN  TRANSLATE : " + DATA + lf	 
		// Solo se traduce si es una expresion principal - indice
			get_translated_line(DATA,TRANS_LINE, slang, folder_file ,sep_int, 'main')
		}
		else 
		{
//			echo "CRE -       TRANSLATE : " + DATA + lf	 
		// Se debe traducir - Es una linea normal
			get_translated_line(DATA,TRANS_LINE, slang, folder_file ,sep_int)
		}
	}
	else
	{
		// En este caso se trata de una linea que no debe traducirse
////		echo "CRE - SW NO TRANSLATE : " + DATA + lf	 
		if (SW_MAIN_TRANSLATE)
		{
//			echo "CRE - MAIN  TRANSLATE : " + DATA + lf	 

				// Solo se traduce si es una expresion principal - indice
			get_translated_line(DATA,TRANS_LINE, slang, folder_file ,sep_int, 'main')
		}
	}
	
} // End Foreach


}

