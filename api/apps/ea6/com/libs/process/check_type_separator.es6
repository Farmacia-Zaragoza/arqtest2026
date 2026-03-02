//Comprueba el tipo de separador y en funcion del mismo actua

function check_type_separator(linea_entrada, separator, num_line_parrafo) //Dependiendo de si es ":" o "." actua de una forma o de otra
//Con ":" solo debe ponerlo en la primera linea
//echo $num_line_parrafo . "-" . $aliena_sep . "\n";
{
     var aliena_sep = linea_entrada.trim();
     if (separator == ".") aliena_sep += separator;else if (num_line_parrafo == 1) //Aqui sabemos que el separador es ":"
          {
               aliena_sep += separator;
          } else aliena_sep = ucfirst(aliena_sep);
     linea_entrada = aliena_sep;
};
