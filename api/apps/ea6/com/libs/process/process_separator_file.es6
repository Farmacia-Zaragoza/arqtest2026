//Genera un fichero con lineas de forma que cada linea ha sido separada por
//el separador indicado
//------------------------------------------------------------------------
//-Procesa los dos puntos
//-Procesa los puntos y los dobles espacios
//------------------------------------------------------------------------
//Requiere
//-- create_full_filename
//-- check_type_separator
//-- update_full_filename
//------------------------------------------------------------------------

function process_separator_file(file_name_ext, sep_ext_blank = "") //Sabemos que son lineas limpias. Sin lineas en blanco
//Primero iteramos los puntos
//Luego los dos puntos
//Finalment los punto y coma
//process_colon_file($file_name_ext ,$sep_ext_semi_colon);
//process_colon_file($file_name_ext ,$sep_ext_colon);
//Podemos seleccionar si las lineas terminan en punto o no
{
     var sep_ext_colon = ":";
     process_intelligent_colon(file_name_ext, sep_ext_colon);
     var sep_ext_point = ".";
     process_intelligent_point(file_name_ext, sep_ext_point, sep_ext_blank);
     process_line_feeds(file_name_ext);
};

