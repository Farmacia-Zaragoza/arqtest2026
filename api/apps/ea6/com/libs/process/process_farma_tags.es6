//Genera un fichero con lineas con los tags relacionados con el archivo
//------------------------------------------------------------------------
//-Analiza los tags de forma inteligente
//-Procesa los dobles espacios dejando un caracter en su lugar
//------------------------------------------------------------------------
//Requiere
//-- stringToArray
//-- check_type_separator
//-- update_full_filename
//-- check_type_separator
//------------------------------------------------------------------------

function process_farma_tags(line_tags, file_tags) //Proceso de los tags del fichero
{
    var tags_updated = false;
    var line_len = line_tags.length;

    if (line_len > 1) //$arr now has character array
        //$ascval = array_map('ord', $arr);  //so i can do stuff like this
        //End foreach
        {
            var arr = stringToArray(line_tags);
            var new_line = "";
            var tag_name = "";
            var start_tag_phase = false;
            var end_tag_phase = false;
            var tag_start = "[";
            var tag_end = "]";

            for (var curChar of Object.values(arr)) //Lo primero que miramos es si ha llegado al final del tag
            //Algoritmo
            //1-Iterar cada letra
            //2-Hasta que llega INICIO_TAG
            //3-Iterar cada letra hasta END_TAG
            //Hola es un [
            //Hola es un [TAG
            //Hola es un [TAG]
            {
                if (curChar == tag_end) //Iniciamos el reconocimiento de tags
                    {
                        start_tag_phase = false;
                        end_tag_phase = true;
                    }

                if (start_tag_phase) {
                    tag_name += curChar;
                }

                if (end_tag_phase) {
                    insert_fix_farma_tag(tag_name, file_tags);
                    tag_name = "";
                    end_tag_phase = false;
                    tags_updated = true;
                }

                if (curChar == tag_start) //Iniciamos el reconocimiento de tags
                    {
                        start_tag_phase = true;
                        tag_name = "";
                    }
            }
        }

    return tags_updated;
};
