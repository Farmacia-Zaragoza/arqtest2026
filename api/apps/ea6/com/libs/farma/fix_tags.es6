//Funciones de negocio
//Requiere Libs
//
//Devuelve
//mm_term --> Nombre comercial
//cc_raw  --> Concentracion
//uc_term --> Unidad concentracion
//Establece los principios activos y los excipientes

function insert_fix_farma_tag(tags_in, file_tags_in) //Change point by spaces && make Upcae
//Ahora toca arreglar los raros
//Solo debe insertar el tag si no existe
{
   var sep_space = " ";
   var sep_point = ".";
   var sep_underscore = "_";
   var point_str = str_replace(sep_point, sep_space, tags_in);
   var ucase_str = locale_str_ucase(point_str);
   var under_str = str_replace(sep_space, sep_underscore, ucase_str);
   var tags_solve_a = str_replace("_A_", "_a_", under_str);
   var tags_solve_de = str_replace("_De_", "_de_", tags_solve_a);
   tags_in = tags_solve_de;

   if (strpos(file_get_contents(file_tags_in), tags_in) == false) {
                  update_full_filename(file_tags_in, tags_in);
   }
}

