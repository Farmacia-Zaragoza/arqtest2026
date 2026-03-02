// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia 
// ---------------------------------------------------------------------------
// Brqx 2016 - 22/06/16				Depth:[03]
// Version : 0.0.1                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Obtiene una linea traducida buscando previamente en BBDD
// ---------------------------------------------------------------------------
// - Funciones 
// ---------------------------------------------------------------------------
//-- do_translate
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- 
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

function do_translate(			SLINE								,
								TRANS_LINE		=	''			,	 
								slang				=	'en'		) 
{

	SPECIAL_LANGS='de in ru ko zh'	
//translated_par= brqx_google_translate_special(current_par, slang)

	IS_SPECIAL_LANG=strpos(SPECIAL_LANGS, slang)	

	if ( IS_SPECIAL_LANG)
	{
		TRANS_LINE= brqx_google_translate_special(SLINE, slang)
	}
	else	
	{
		TRANS_LINE= brqx_google_translate_es(SLINE, slang)
	}
}

