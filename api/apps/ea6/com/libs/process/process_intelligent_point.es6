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

function process_intelligent_point(full_file_name_col, sep_int = ".", end_line_point = ".") //Hay que iterar las lineas buscando puntos pero hay que hacerlo de forma inteligente
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
        var line_minus_len = line_len - 1;

        if (line_len > 1) //[STRING_TO_ARRAY]
            //$ascval = array_map('ord', $arr);  //so i can do stuff like this
            //echo "Actualizando linea:" . $new_line . "\n";
            {
                var arr = Array();

                for (var c = 0; c < sLinea.length; c++) arr.push(sLinea[c]);

                c = 0;
                var new_line = "";
                var check_new_line = false;

                for (c = 0;; c < line_len; c++) //Es un punto aparte si:
                //1. no es un digito lo que tiene detras calle 50
                //Caracteres anteriores al actual de forma
                //ant_char2 - ant_char1 - curChar
                {
                    var curChar = arr[c];
                    if (c > 0) var ant_char1 = arr[c - 1];
                    if (c > 1) var ant_char2 = arr[c - 2];
                    var curr_line = new_line.trim();

                    if (c >= 2) {
                        if (is_needed_create_line_feed(ant_char2, ant_char1, curChar)) //hola viene una nubE.V
                            //Hemos grabado hasta la E (antes del punto)
                            //Hay que crear una nueva linea
                            //Activamos desactivamos punto final de linea
                            //nubE.V
                            //nube
                            //echo "Salto de linea - Insertando [" . $end_line_point . "]";
                            //Ha guaradado "nube."
                            //Pero el siguiente caracter va a ser un punto
                            {
                                curr_line += ant_char2;
                                curr_line += end_line_point;
                                update_full_filename(full_file_name_new, curr_line);
                                new_line = "";
                                c++;
                            } else //Nube.v
                            //nUbe.v
                            //nuBe.v
                            //$new_line.=$ant_char2;
                            //Es un caso sin punto nubeciTA rica
                            //Comentamos gestion de espacios de momento
                            {
                                if (ant_char2 == " " and ant_char1 == " ") //Caso dobles espacios. No imprimimos un nuevo espacio
                                    {
                                        new_line = new_line;
                                    } else //Caso generico donde no hay puntos ni dobles espacios
                                    //$new_line.=$curChar;
                                    {
                                        new_line += ant_char2;
                                    }
                            }
                    }

                    if (c == line_minus_len) //es la ultima posicion de la linea. Insertamos un caracter
                        //echo "End line reached :" . $ant_char2 . $ant_char1 . "\n";
                        {
                            if (end_line_point == "." && ant_char1 != ".") //Todas las lineas deben terminar en punto
                                {
                                    new_line += end_line_point;
                                } else if (end_line_point == "" && ant_char1 != ".") //Ninguna linea debe terminar en punto
                                {
                                    new_line = new_line.substr(0, line_minus_len);
                                }
                        }
                }

                curr_line = new_line.trim();
                update_full_filename(full_file_name_new, curr_line);
            }
    }

    rename(full_file_name_new, full_file_name_col);
};

