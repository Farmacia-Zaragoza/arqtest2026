// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia 
// ---------------------------------------------------------------------------
// Brqx 2016 - 22/06/16				Depth:[03]
// Version : 0.0.1                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Crea y actualiza ficheros en todos los idiomas cambiadndo BD de idiomas
// ---------------------------------------------------------------------------
// - Funciones 
// ---------------------------------------------------------------------------
//-- create_update_lan_full
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- create_update_full_filename
//-- get_translated_line
// ---------------------------------------------------------------------------
// - Ejemplo 
// ---------------------------------------------------------------------------
//-- create_update_lan_full FOLDER
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

function create_update_lan_full(folder_file							, 
								parent				=	'PROSPECTOS'	, 
								folder_name_int	=	'AAAAAA'		, 
								file_name_int		=	'fichero' 		,	 
								DATA				=	'datos'			,
								LANGS				=	'en'			,
								SW_TRANSLATE_LINE	=	false			,
								SW_MAIN_TRANSLATE	=	false			,
								sep_int			=	'@@'			)
{
// Crea todos los idiomas traduciendo
lf="\r\n"
sep="/"

//echo "CR Linea principal : " . DATA . lf	 


array_LANG = explode(' ', LANGS)

#-Create Spanish file
create_update_lan_file(folder_file, parent, folder_name_int,file_name_int,DATA,'es')

foreach (array_LANG as slang)
{
// Tenemos ya la iteracion de los idiomas
//echo slang . lf	

	// Obtiene la linea de la BD de lineas ya traducidas o incrementa la base
	//get_translated_line(LINE, TRANS_LINE , slang='en' , folder_file='' , sep_int='@@', db_file_name='words_')
	if (SW_TRANSLATE_LINE)
	{
		if (SW_MAIN_TRANSLATE)
		{
		// Solo se traduce si es una expresion principal - indice
//			echo "CRU - MAIN  TRANSLATE : " . DATA . lf	 
			get_translated_line(DATA,TRANS_LINE, slang, folder_file ,sep_int, 'main')
		}
		else 
		{
//			echo "CRU -   TRANSLATE : " . DATA . lf	 
		// Se debe traducir - Es una linea normal
			get_translated_line(DATA,TRANS_LINE, slang, folder_file ,sep_int)
		}
	}
	else
	{
		// En este caso se trata de una linea que no debe traducirse
		if (SW_MAIN_TRANSLATE)
		{
//			echo "CRU - MAIN  TRANSLATE : " . DATA . lf	 
			// Solo se traduce si es una expresion principal - indice
			get_translated_line(DATA,TRANS_LINE, slang, folder_file ,sep_int, 'main')
		}
		else 
		{
			// En este caso no se traduce
//			echo "CRU -    NO TRANSLATE : " . DATA . lf	 
			TRANS_LINE		=	DATA	
		}
	}
	create_update_lan_file(folder_file, parent, folder_name_int,file_name_int,TRANS_LINE,	slang)
} // End Foreach



}



