// [DOCHANGING_PHP56_PHP52_NODE]
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Node Js - Farma AQR - AGILE ( BRQX NG Arquitectura 2018 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia
// ---------------------------------------------------------------------------
// Brqx 2017 - 26/12/17				Depth:[0N]
// Version : 0.0.2                  Type :[FUNCTION]
// ---------------------------------------------------------------------------
// - Notas
// ---------------------------------------------------------------------------
//  + Crea un fichero basandose en ruta absoluta
// ---------------------------------------------------------------------------
// - Funciones
// ---------------------------------------------------------------------------
//-- file_put_contents - f_mkdirp
// ---------------------------------------------------------------------------
// - Requiere
// ---------------------------------------------------------------------------
//--
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=

var 	cons 		= 	require(	"/brqx/base/rcode/ea6/com/libs/general/constants.ess"						)

const 	fs 					= 	require(	'fs'																);
		const mkdirp = require(	'mkdirp'											);
		const echo = require(	'node-echo'										);
		const empty = require(	'is-empty'										);
		const f_file = require(path.join(JS_BASE, 'com/libs/file/full_path/level_01/f_file.es6'))
		const { printlog } = require(path.join(JS_BASE, 'com/objects/logs/printlog.es6'))
		const { sorted_array } = require(path.join(JS_BASE, 'com/objects/drupal/structs/sorted_array.es6'))
		const nlr = require(	'node-line-reader'								);

function yaml_from_file (file_name)
{
	// echo ('File to read  ' + file_name )
	var temp_arr = fs.readFileSync(file_name).toString().split('\n')

	this.arr 	= new sorted_array()

	this.aux_1 		= ''		// Array_Nivel 1
	this.aux_2 		= ''		// Array_Nivel 2
	this.aux_3 		= ''		// Array_Nivel 3
	this.aux_4 		= ''		// Array_Nivel 4

	var title 		= 	''
	var trim_line	=	''

	var num_levels	=	5
	// Necesitamos un array dimensional de titulos

	this.level			= 	Array()			// Boolean array

	for (var i = 1 ; i<= num_levels ; i++ ) 	this.level[i]			= 	false

	for (pos in temp_arr)
	{
		line 		= temp_arr[pos]
		trim_line 	= line.trim()

		if (!f_file.is_comment_yaml_line(line) )
		{
			// Hay que ver si la linea va a ser titulo o no si

			if (f_file.is_title_yaml_line(line))
			{
			//--------------------- CASO TITULO -----------------------
				if (f_file.is_yaml_level(line,4))
				{
					if (!this.level[4])
					{
						this.aux_4 = new sorted_array()
						this.level[4] 		= 	true
					}
					else
					{
						// echo ('Titulo 4 con L4 abierto : ' + line)
						this.aux_4 = new sorted_array()
						this.level[4] 		= 	false
					}

					let title_line = trim_line.substr(0,trim_line.length -1)
					this.aux_3.add( title_line  , this.aux_4 )

					// echo ('Linea 4 es titulo: ' + line)

				}

				else if (f_file.is_yaml_level(line,3))
				{
					if (!this.level[3])
					{
						this.aux_3 = new sorted_array()
						this.level[3] 		= 	true
					}
					else
					{
						// echo ('Titulo 3 con L3 abierto : ' + line)
						this.aux_3 = new sorted_array()
						this.level[3] 		= 	false
					}

					let title_line = trim_line.substr(0,trim_line.length -1)
					this.aux_2.add( title_line  , this.aux_3 )

					// echo ('Linea 3 es titulo: ' + line)

				}
				else if (f_file.is_yaml_level(line,2))
				{
					if (!this.level[2])
					{
						this.aux_2 = new sorted_array()
						this.level[2] 		= 	true
					}
					else
					{
						// echo ('Titulo 2 con L2 abierto : ' + line)
						this.aux_2 = new sorted_array()
						this.level[2] 		= 	false
					}

					if (empty(this.aux_1))
					{
						this.aux_1 = new sorted_array()
						this.level[1] 		= 	true
					}

					let title_line = trim_line.substr(0,trim_line.length -1)
					this.aux_1.add( title_line  , this.aux_2 )

					// echo ('Linea 2 es titulo: ' + line)

				}
				else if (f_file.is_yaml_level(line,1))
				{
					// GESTION TITULOS NIVEL 1
					if (this.level[4])
					{
						this.aux_4 = new sorted_array()
						this.level[4] 		= 	false
					}

					if (this.level[3])
					{
						this.aux_3 = new sorted_array()
						this.level[3] 		= 	false
					}

					if (this.level[2])
					{
						this.aux_2 = new sorted_array()
						this.level[1] 		= 	false
					}

					if (!this.level[1])
					{
						this.aux_1 = new sorted_array()
						this.level[1] 		= 	true
					}
					else
					{
						// echo ('Titulo 1 con L1 abierto : ' + line)
						this.aux_1 = new sorted_array()
						this.level[1] 		= 	false
					}

					let title_line = trim_line.substr(0,trim_line.length -1)
					this.arr.add(title_line, this.aux_1)
					// echo ('Linea 1 es titulo: ' + line)

				}
				else
					echo ('CASO RARO ' + trim_line)

			}
			else
			{
			// CASO SIMPLE - NO TITULO
				if (f_file.is_yaml_level(line,5))
				{
					if (this.level[5])   this.level[5] 		= 	false

					// echo ('Nivel 5 es linea: ' + line)
					this.aux_4.add_str(trim_line)

				}

				else if (f_file.is_yaml_level(line,4))
				{
					if (this.level[4])   this.level[4] 		= 	false

					// echo ('Nivel 4 es linea: ' + line)
					this.aux_3.add_str(trim_line)

				}
				else if (f_file.is_yaml_level(line,3))
				{
					if (this.level[4])
					{
						this.aux_4 = new sorted_array()
						this.level[4] 		= 	false
					}

 					if (this.level[3])   this.level[3] 		= 	false

					// echo ('Nivel 3 es linea: ' + line)
					this.aux_2.add_str(trim_line)

				}
				else if (f_file.is_yaml_level(line,2))
				{
					if (this.level[4])
					{
						this.aux_4 = new sorted_array()
						this.level[4] 		= 	false
					}

					if (this.level[3])
					{
						this.aux_3 = new sorted_array()
						this.level[3] 		= 	false
					}

					if (this.level[2])   this.level[2] 		= 	false

					if (empty(this.aux_1))
					{
						this.aux_1 = new sorted_array()
						this.level[1] 		= 	true
					}

					// echo ('Nivel 2 es linea: ' + line)
					this.aux_1.add_str(trim_line)

				}
				else if (f_file.is_yaml_level(line,1))
				{
					// GESTION ARBOLES  NIVEL 1
					if (this.level[4])
					{
						this.aux_4 = new sorted_array()
						this.level[4] 		= 	false
					}

					if (this.level[3])
					{
						this.aux_3 = new sorted_array()
						this.level[3] 		= 	false
					}

					if (this.level[2])
					{
						this.aux_2 = new sorted_array()
						this.level[1] 		= 	false
					}

					if (this.level[1])
					{
						// echo ('Nivel 1 con L1 abierto : ' + line)
						this.level[1] 		= 	false
					}

					// echo ('Nivel 1 es linea: ' + line)
					this.arr.add_str(trim_line)

				}

				// arr[0] = Linea primera
			}
		}

	}
	// echo ('File Length  ' + this.arr.num )

	// echo (".....................................")

	// this.arr.marr()

}

module.exports.yaml_from_file = yaml_from_file

