//Genera una cadena sin saltos de linea addicionales ni lineas en blanco

function process_str_feeds(str_in) //Reemplazamos los saltos de elinea
{
     var LINE = eregi_replace("[\n|\r|\n\r]", "", str_in)
     return LINE
}
