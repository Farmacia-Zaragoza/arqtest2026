//Genera un fichero con lineas de forma que cada linea ha sido separada por
//el separador indicado
//------------------------------------------------------------------------
//Requiere
//-- create_full_filename
//-- check_type_separator
//-- update_full_filename
//-- check_type_separator
//------------------------------------------------------------------------

function process_colon_file(full_file_name_col, sep_int = ":") //Sabemos que son lineas limpias. Sin lineas en blanco
//Primero iteramos los puntos
//Luego los dos puntos
//Finalment los punto y coma
//Algoritmo :
//1.Convertir el fichero en un array e iterarlo (primer foreah)
//2.Para cada registro comprobar separadores ":" y "." y actuar en consecuencia (segundo foreach)
//Move file
//Delete file
//unlink($full_file_name_new);
{
    var vlineas = file(full_file_name_col);
    var full_file_name_new = full_file_name_col + "_b";
    create_full_filename(full_file_name_new);

    for (var sLinea of Object.values(vlineas)) //-- 01-Inicio Primer Foreach ---------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-- 01-Fin Primer Foreach ------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    {
        var pos = strpos(sLinea, sep_int);

        if (pos === false) //-- 02-Inicio If No Existe Cadena | Separador ----------------------------------------
            //No existe la cadena. no tenemos que iterar nada
            //echo "1" . "-" . $sLinea ;
            {
                update_full_filename(full_file_name_new, sLinea);
            } else //-- 02-Else If Si existe la cadena ---------------------------------------------------
            //Expresion regular con el separardo
            //Indica el numero de lineas en el nuevo parrafo generado tras el split del separador
            //-- 02-Else If Si existe la cadena ---------------------------------------------------
            //-------------------------------------------------------------------------------------
            {
                var string_sep = "/[" + sep_int + "]+/";
                var split_arr = preg_split(string_sep, sLinea);
                var num_bucle = 1;

                for (var aLinea of Object.values(split_arr)) //-- 02-Inicio Segundo Foreach --------------------------------------------------------
                //-------------------------------------------------------------------------------------
                //create_update_file($folder_name, $file_name , $aLinea);
                //Evitamos lineas vacias
                //-------------------------------------------------------------------------------------
                //-- 03-Fin Segundo Foreach -----------------------------------------------------------
                {
                    var len_alinea = aLinea.length;

                    if (len_alinea > 1) //Hay que evitar que la linea comience por espacio, pues no aporta nada.
                        {
                            check_type_separator(aLinea, sep_int, num_bucle);
                            update_full_filename(full_file_name_new, aLinea);
                        }

                    num_bucle++;
                }
            }
    }

    rename(full_file_name_new, full_file_name_col);
};
