//Funciones para gestionar bine los saltos de parrafo cuando llega un punto
//Convierte cadena en array de caracteres

function is_needed_create_line_feed(car_ant, car_actual, car_sig) //El caracter actual de en medio de la frase es un punto :
{
    var needed_new_line = false
    var cad = "-" + car_ant + "_" + car_actual + "_" + car_sig + "-"

    if (car_actual == ".") {
        if (is_numeric(car_ant) && is_numeric(car_sig)) //10.3
            //No hay que aplicar un salto de linea
            {
                needed_new_line = false
            } else //echo "New Line:" . $cad . "\n"
            {
                if (is_numeric(car_ant)) //10.A todo gas
                    //Hay que aplicar un salto de linea
                    //echo "New Line:" . $cad . "\n"
                    {
                        needed_new_line = true
                    }

                if (is_numeric(car_sig)) //A.10 campanas
                    //Hay que aplicar un salto de linea
                    //echo "New Line:" . $cad . "\n"
                    {
                        needed_new_line = true
                    } else needed_new_line = true
            }
    }

    return needed_new_line
}
