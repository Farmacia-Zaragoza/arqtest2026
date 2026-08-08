//--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
//Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
//Farmacia Zaragoza - Zaragofarma - Estaestufarmacia
//---------------------------------------------------------------------------
//Brqx 2016 - 22/06/16				Depth:[0N]
//Version : 0.0.1                  Type :[FUNCTION]
//---------------------------------------------------------------------------
//- Notas
//---------------------------------------------------------------------------
//+ Genera listas aliatorias para arrays
//---------------------------------------------------------------------------
//- Funciones
//---------------------------------------------------------------------------
//-- uniq_sort
//---------------------------------------------------------------------------
//- Requiere
//---------------------------------------------------------------------------
//--
//--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
////--------------------------------------------------------------------------------------------------------------
//echo lrand(1,10,'norepeat', 5) . PHP_EOL  
////--------------------------------------------------------------------------------------------------------------

// PENDING TO REVIEW

function fast_random(num_max = 100, repeat = true, num_min = 0, num_rows = 200) 
{
	var repeat_string = "repeat"
	var mins = "" + num_min
	var maxs = "" + num_max
	var rowss = "" + num_rows
	var min_str = "" + str_repeat(0, 4 - mins.length) + mins
	var max_str = "" + str_repeat(0, 4 - maxs.length) + maxs
	var num_rows_str = "" + str_repeat(0, 4 - rowss.length) + rowss
	var min_max = min_str + "_" + max_str + "_" + num_rows_str
	if (!repeat) repeat_string = "no" + repeat_string
	var file_name = "txt/random_" + repeat_string + "." + min_max
	var pos_rand = rand(0, num_rows - 1)
	var lines = file(file_name)
	return lines[pos_rand]
}

function lrand(num_min = 0, num_max = 100, repeat = true, num_elems = 1, num_rows = 200) //Get Random line - last version
//file in to an array
{
	var repeat_string = "repeat"
	var mins = "" + num_min
	var maxs = "" + num_max
	var rowss = "" + num_rows
	var elems = "" + num_elems
	var min_str = "" + str_repeat(0, 4 - mins.length) + mins
	var max_str = "" + str_repeat(0, 4 - maxs.length) + maxs
	var num_rows_str = "" + str_repeat(0, 4 - rowss.length) + rowss
	var num_elem_str = "" + str_repeat(0, 4 - elems.length) + elems
	var min_max = min_str + "_" + max_str + "_" + num_elem_str + "_" + num_rows_str
	if (!repeat) repeat_string = "no" + repeat_string
	var file_name = "rnd/random_" + repeat_string + "." + min_max
	var pos_rand = rand(0, num_rows - 1)
	var lines = file(file_name)
	return lines[pos_rand]
}

function fgenerate_random_files(min = 0, max = 100, num_rows = 100, repeat = true, relative_folder = "dat") 
//Slow method
//echo $file_name .	PHP_EOL														
{
	var lf = "\n\r"
	var repeat_string = "repeat"
	if (!repeat) repeat_string = "no" + repeat_string
	var mins = "" + min
	var maxs = "" + max
	var rowss = "" + num_rows
	var min_str = "" + str_repeat(0, 4 - mins.length) + mins
	var max_str = "" + str_repeat(0, 4 - maxs.length) + maxs
	var num_rows_str = "" + str_repeat(0, 4 - rowss.length) + rowss
	var min_max = min_str + "_" + max_str + "_" + num_rows_str
	var file_name = relative_folder + "/random_" + repeat_string + "." + min_max

	if ("A" == "B") //.29s
		//fclose($fh)
		{
			for (var i = 0 i < num_rows i++) //arg: max - repeat - min
			{
				var line = fast_random(max, repeat, min, num_rows) + PHP_EOL
			}
		}
}

