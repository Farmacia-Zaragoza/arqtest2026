//Genera un fichero con lineas de forma que cada linea ha sido separada por
//el separador indicado
//------------------------------------------------------------------------
//-Analiza los puntos de forma inteligente, aplicando salto solo si lo requiree
//-Procesa los dobles espacios dejando un caracter en su lugar
//------------------------------------------------------------------------
//Requiere
//-- create_full_filename
//-- check_type_separator
//-- update_full_filename
//-- check_type_separator
//------------------------------------------------------------------------

function process_intelligent_colon(full_file_name_col, sep_colon = ":") //Hay que iterar las lineas buscando puntos pero hay que hacerlo de forma inteligente
//De manera que 50.7 no debe separarse
//Algoritmo :
//1.Convertir el fichero en un array e iterarlo (primer foreah)
//Move file
//Delete file
//unlink($full_file_name_new);
{
    var vlineas = file(full_file_name_col);
    var full_file_name_new = full_file_name_col + "_b";
    create_full_filename(full_file_name_new);

    for (var sLinea of Object.values(vlineas)) //-------------------------------------------------------------------------------------
    //-- 01-Inicio Primer Foreach ---------------------------------------------------------
    {
        var line_len = sLinea.length;

        if (line_len > 1) //[STRING_TO_ARRAY]
            //$ascval = array_map('ord', $arr);  //so i can do stuff like this
            //echo "Actualizando linea:" . $new_line . "\n";
            {
                var arr = Array();

                for (var c = 0; c < sLinea.length; c++) arr.push(sLinea[c]);

                var new_line = "";

                for (var curChar of Object.values(arr)) //Es un punto aparte si:
                //1. no es un digito lo que tiene detras calle 50
                //Caracteres anteriores al actual de forma
                //ant_char2 - ant_char1 - curChar
                {
                    new_line += curChar;
                    var curr_line = new_line.trim();

                    if (curChar == sep_colon) //Hay que crear una nueva linea
                        {
                            update_full_filename(full_file_name_new, curr_line);
                            new_line = "";
                        }
                }

                curr_line = new_line.trim();
                update_full_filename(full_file_name_new, curr_line);
            }
    }

    rename(full_file_name_new, full_file_name_col);
};
