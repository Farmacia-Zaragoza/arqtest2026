//--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
//Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
//Farmacia Zaragoza - Zaragofarma - Estaestufarmacia
//---------------------------------------------------------------------------
//Brqx 2016 - 25/06/16				Depth:[01]
//Version : 0.0.4                  Type :[FUNCTION]
//---------------------------------------------------------------------------
//- Notas
//---------------------------------------------------------------------------
//+ Procesa el fichero y genera subficheros relacionados
//---------------------------------------------------------------------------
//- Funciones
//---------------------------------------------------------------------------
//-- process_file
//---------------------------------------------------------------------------
//- Requiere
//---------------------------------------------------------------------------
//-- process_line
//-- create_update_lan_full
//-- update_lan_full
//-- create_lan_full
//-- check_translated_line
//--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
//- Ejemplo
//---------------------------------------------------------------------------

function process_file(product_file, parent = "PROSPECTOS", LANGS = "en", folder_file = "") //Recibe un parametro con el nombre del archivo que sera CN.TXT
//712786
//Si no se definie path pilla el actual
//Obtiene el CN
//- El codido del producto se va a usar como la carpeta contendora. Para buscar un sistema multi lang debemos insertar el idioma
//-Fichero principal de prospecto a iterar
//RUTA ACTUAL / PROSPECTOS / FICHERO CON EXTENSION
//echo "Fichero : " . $full_file_name_file  . $lf;
//Podemos mostrar / trabajar con todas las líneas:
//Division del prospecto - Codigo inicial
//NUmero de division del prospecto
//control traducciones especiales - frecuentes - indices
//Variable para comprobar si es la primera vez que se inserta crear fichero
//End Foreach
{
    var lf = "\r\n";
    if (folder_file == "") folder_file = getcwd();
    var array_CN = product_file.split(".");
    var INPUT_CODE = array_CN[0];
    var full_file_name_file = folder_file + "/" + parent + "/" + product_file;
    var vlineas = file(full_file_name_file);
    var num_lines = 0;
    var SUBCODE = "nombre_comercial";
    var NUM_CODE = "00";
    var SW_MAIN_TRANS = false;
    var check_insert = 0;
    var MEDICAMENTO = "";

    for (var sLinea of Object.values(vlineas)) //Reemplazamos los saltos de elinea
    //Evitamos lineas vaias y con espacios
    {
        var LINE = eregi_replace("[\n|\r|\n\r]", "", sLinea);

        if (LINE != "" && LINE != " ") //Ha llegado un texto. Cambiamos a Fase Parrafos
            //Guardamos el codigo actual
            //No debe tradudir los apartados
            //Mientras el codigo sea igual escribimos
            //Se debe traducir una linea siempre que no sea el nombre comercial u otro apartado
            //echo "Linea ". '(' .  $check_insert  . '):' . $LINE  . " SUBCODE: " . $SUBCODE . '[' . $SW_TRANSLATE_LINE . '] - [' . $SW_MAIN_TRANS . ']'   . $lf;
            //Relative file
            //echo "File to update: " . $file_name . $lf;
            {
                num_lines++;
                var OLD_SUBCODE = SUBCODE;
                SUBCODE = process_line(LINE, SUBCODE, NUM_CODE);
                var SW_TRANSLATE_LINE = check_translated_line(LINE, SUBCODE, SW_MAIN_TRANS);
                var file_name = NUM_CODE + "-" + SUBCODE + ".txt";

                if (SUBCODE == "nombre_comercial" && check_insert == 0) //Si es nombre comercial, no debe traducirlo
                    //$file_name=$INPUT_CODE . "_" . $MEDICAMENTO . "-" . $NUM_CODE . "-" . $SUBCODE . ".txt";
                    //Folder - File - Line - padre  --> padre - Folder - File
                    //PROSPECTOS / es / fichero
                    //echo "Li CRU ". '(' .  $check_insert  . '):' . $LINE  . " SUBCODE: " . $SUBCODE . '[' . $SW_TRANSLATE_LINE . '] - [' . $SW_MAIN_TRANS . ']'   . $lf;
                    {
                        MEDICAMENTO = LINE.substr(0, strpos(LINE, " ")).toLowerCase();
                        file_name = NUM_CODE + "-" + SUBCODE + ".txt";
                        create_update_lan_full(folder_file, parent, INPUT_CODE, file_name, LINE, LANGS, SW_TRANSLATE_LINE, SW_MAIN_TRANS);
                        check_insert++;
                    } else if (SUBCODE != "") //Si devolvemos un valor vacio no deseamos guardar esa cadena
                    {
                        if (OLD_SUBCODE == SUBCODE) //En el momento en que no es igual es que ha habido un cambio de codigo
                            //echo "Li UPD ". '(' .  $check_insert  . '):' . $LINE  . " SUBCODE: " . $SUBCODE . '[' . $SW_TRANSLATE_LINE . '] - [' . $SW_MAIN_TRANS . ']'   . $lf;
                            //echo $sw_saltos . "-C-Printing Aspirina:" . substr($LINE,0,10) . "\n" ;
                            {
                                update_lan_full(folder_file, parent, INPUT_CODE, file_name, LINE, LANGS, SW_TRANSLATE_LINE, SW_MAIN_TRANS);
                            } else //Hay un codigo nuevo - Creamos archivo pero no escribimos - Pero debemos traducirlo
                            //Aqui deberiamos procesar el archivo actual
                            //process_file FILE_NAME MEDICAMENTO PA NAN
                            //echo $sw_saltos . "-D-Printing Aspirina:" . substr($LINE,0,10) . "\n" ;
                            //create_lan_file RUTA PROSPECTOS 661111 fichero
                            //Debe crear RUTA / PROSPECTOS / es / 661111 / fichero
                            //echo "Li CRE ". '(' .  $check_insert  . '):' . $LINE  . " SUBCODE: " . $SUBCODE . '[' . $SW_TRANSLATE_LINE . '] - [' . $SW_MAIN_TRANS . ']'   . $lf;
                            {
                                create_lan_full(folder_file, parent, INPUT_CODE, file_name, LINE, LANGS, SW_TRANSLATE_LINE, SW_MAIN_TRANS);
                                check_insert++;
                            }
                    }
            }
    }
};

