//--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
//Node Js - Farma AQR - AGILE ( BRQX NG Arquitectura 2016 )
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
//--------------------------------------------------------------------------------------------------------------------
//Start program - Generate files of  200 lines
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

function random(initial,end)
{
	// Cambiar cuando tengamos fast random
	return slow_random(initial , end)
}

function slow_random(initial , end)
{
 // 1 and 6, you would calculate:
	return Math.floor(Math.random() * end) + initial  
}

function fast_random(initial , end)
{
	// Recover from file
	
	
}


// PENDING TO REVIEW
function slow_uniq_random(num_min = 0, num_max = 100, word_repeat = "repeat", num_positions = 5) 
//va a devolver una cadena con todos los valores de un random , pero rapido
{
	var random_line = ""
	var arr = Array()
	var cont = 0
	var repeat = word_repeat == "repeat"

	if (!repeat) //en este caso el número de posiciones nunca pude ser mayor que la resta del maximo al minimo
		//echo "No se repite - ojo " . $resta . ' - ' . $num_positions  . PHP_EOL 
		//Nunca se ejecutara
		{
			var resta = num_max - num_min

			if (resta < num_positions) //echo "Problem - No Repeat Max positions"		. PHP_EOL 
				{
					cont = 10000
				}
		}

	if (cont < num_positions) {
		while (cont < num_positions) 
		{
			var rand = rand(num_min, num_max)

			if (repeat) //Repeat case
				{
					random_line += rand + " "
					cont++
				} else //Not repeat case
				{
					if (!(-1 !== arr.indexOf(rand)) {
						arr.push(rand)
						random_line += rand + " "
						cont++
					}
				}
		}

		if (repeat) arr = random_line.split(" ")
	}

	return random_line.trim()
}

function generate_random_files(mid_min = 0, mid_max = 100, mid_positions = 30, mid_rows = 100, mid_repeat = "repeat", relative_folder = "sta") 
//Slow method
//Example : 0001_0030_0200
//echo $file_name .	PHP_EOL														
//if('A' == 'A' )
//if ( !is_file($file_name)	)
{
	var fh
	var lf = "\n\r"
	var mins = "" + mid_min
	var maxs = "" + mid_max
	var rowss = "" + mid_rows
	var poss = "" + mid_positions
	var min_str = "" + str_repeat(0, 4 - mins.length) + mins
	var max_str = "" + str_repeat(0, 4 - maxs.length) + maxs
	var num_rows_str = "" + str_repeat(0, 4 - rowss.length) + rowss
	var num_poss_str = "" + str_repeat(0, 4 - poss.length) + poss
	var min_max = min_str + "_" + max_str + "_" + num_poss_str + "_" + num_rows_str
	var file_name = relative_folder + "/random_" + mid_repeat + "." + min_max

	if (fh = fopen(file_name, "w")) 
		//.29s
		//echo "EFECTO" . PHP_EOL 
		//Rows of a file
		{
			for (var mid_i = 0 ;  mid_i < mid_rows ; mid_i++) 
			//arg: min, max - repeat - posiciones|campos de la linea
			//echo $mid_max . ' -  ' .  $mid_repeat . ' - ' . $mid_min  . ' - ' .  $mid_positions 	. PHP_EOL		
			{
				var line = slow_uniq_random(mid_min, mid_max, mid_repeat, mid_positions) + PHP_EOL
				fwrite(fh, line, 1024)
			}

			fclose(fh)
		}
}

module.exports.random = random