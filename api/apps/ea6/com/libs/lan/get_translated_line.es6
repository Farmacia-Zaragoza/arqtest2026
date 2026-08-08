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
//-- get_translated_line
// ---------------------------------------------------------------------------
// - Requiere 
// ---------------------------------------------------------------------------
//-- 
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

var { f_mkdirp } 			=	require('/brqx/base/rcode/es6/com/lib/f_file.es6')

function get_translated_line(	LINE								,	// 01. Linea a traducir
								TRANS_LINE 						, 	// 02. Linea traducida
								slang				=	'en'		, 	// 03. Idioma a traducir 
								folder_db_lan_file	=	'' 			, 	// 04. Path BD Idiomas
								sep_int			=	'@@'		, 	// 05. Separador idiomas en cada linea
								db_file_name		=	'word'	)		// 06. Nombre - Tipo de Base de datos
{
	//1. Debe comprobar si existe el fichero de idioma 
	// Ficheros de idioma : de_a (frases que empiezan por a)
	// Estructura de idiomas LANGS/de/a/aa/words_de.aab

	//2. Debe hacer una busqueda a ver si existe la frase
	// -Si existe recuperarla
	// -Si no existe actualizar el fichero

// Si no se define path pilla el actual
if (folder_db_lan_file == "")
    folder_db_lan_file	=	getcwd();

lf="\r\n";

sep="/";

sep_end_line=';|:|.';


line_without=locale_str_tolower(LINE);

//Las lineas las guardamos sin espacios y en minusculas
line_points=strspecial_to_dash(line_without);

// Evitamos las lineas con dos puntos
line = get_first_clean_occurence(line_points,	sep_end_line	,	end_line);

//echo "Linea a traducir - " . LINE . lf;
//echo "Linea a gestionar - " . line . lf;

one_letter=substr(line,0,1);  // Dos primeras letras

two_letters=substr(line,0,2);  // Dos primeras letras

three_letters=substr(line,0,3);  // Tres primeras letras

// Ya tenemos la carpeta donde debe ir
LANG_FOLDER=folder_db_lan_file . sep . 'LANGS' . sep . slang . sep .  one_letter . sep .  two_letters ;	

// words_es.esp
LANG_FILE=three_letters . '.' . db_file_name;

FULL_LANG_FILE=LANG_FOLDER . sep . LANG_FILE;

//echo LANG_FOLDER . lf;

f_mkdirp(LANG_FOLDER)


//     mkdir(LANG_FOLDER,0775,true);

//echo "Actualizando " . full_file_name . lf;	

TRANS_LINE_TO_WRITE="";

if (!is_file(FULL_LANG_FILE))
{	

//	echo "Caso 1 : Fichero no existe : Hay que traducir" . lf;
	// Son lineas con el formato esp@@idioma

	// Aqui tenemos que considerar tanto la linea que guardamos como la linea que traducimos e imprimimos en el fichero
	// Por lo que tendremos dos DUAL LINES o bien dos TRANS_LINES
	
	SLINE=get_first_clean_occurence(LINE,sep_end_line,end_line);

	print 'TRADUCIR ' . SLINE .  ' en  ' . slang ;
##	do_translate(SLINE,TRANS_LINE ,slang)							;

	TRANS_LINE_TO_WRITE	= TRANS_LINE	. end_line;
	
	DUAL_LINE=line . sep_int . TRANS_LINE;
	
//	echo "Linea dual : " . DUAL_LINE . lf;
	
	// Crea y actualiza fichero de BD de idiomas
	create_update_full_filename(FULL_LANG_FILE,DUAL_LINE);
}
else if (!search_lan_file(FULL_LANG_FILE, line ,TRANS_LINE, sep_int))
{
	//2. Debe hacer una busqueda a ver si existe la frase
	// -Si existe recuperarla - en la variable TRANS_LINE
	// -Si no existe actualizar el fichero
	// En este caso existe fichero y es una cadena nueva

//	echo "Caso 3: Fichero existe Hay que traducir al ser nueva cadena" . lf;
	SLINE=get_first_clean_occurence(LINE, sep_end_line, end_line)	;

	print 'TRADUCIR ' . SLINE .  ' en  ' . slang ;

//	do_translate(SLINE,TRANS_LINE ,slang)							;
	TRANS_LINE_TO_WRITE	= TRANS_LINE	. end_line					;
	
	DUAL_LINE=line . sep_int . TRANS_LINE;

	// Actualiza fichero de BD de idiomas
	update_full_filename(FULL_LANG_FILE,DUAL_LINE);

	//3. Si se ha actualizado el fichero hay que ordenarlo

	// Revisar file 
	vlineas = readFileAsArray(FULL_LANG_FILE); 
    usort(vlineas, "strcasecmp");	

	//Save the serialized array to a text file.
	file_put_contents(FULL_LANG_FILE, vlineas);
 
} // End If

	// Retornamos la linea traducida para escribir en fichero		
	TRANS_LINE = TRANS_LINE_TO_WRITE;
}

