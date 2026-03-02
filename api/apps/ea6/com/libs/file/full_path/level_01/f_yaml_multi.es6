// [DOCHANGING_PHP56_PHP52_ES6]
// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--=
// Node Js - Farma AQR - AGILE ( BRQX NG Arquitectura 2018 )
// Farmacia Zaragoza - Zaragofarma - Estaestufarmacia 
// ---------------------------------------------------------------------------
// Brqx 2017 - 22/10/21				Depth:[0N]
// Version : 0.0.1                  Type :[FUNCTION]
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

var 	cons 				= 	require(	"/brqx/base/rcode/ea6/com/libs/general/constants.ess"				)

const 	fs 					= 	require(	'fs'																),
		mkdirp 				= 	require(	cons.NODE_MOD 	+ 'mkdirp'											),
		echo 				= 	require(	cons.NODE_MOD 	+ 'node-echo'										),
		f_file				=	require(	cons.JS_BASE 	+ 'com/libs/file/full_path/level_01/f_file.es6'		),
		{ printlog } 		= 	require(	cons.JS_BASE  	+ 'com/objects/logs/printlog.es6'					),
		{ sorted_array } 	= 	require(	cons.JS_BASE  	+ 'com/objects/drupal/structs/sorted_array.es6'		),
		nlr  				= 	require(	cons.NODE_MOD 	+ 'node-line-reader'								);


function yaml_from_file (file_name)
{
	// echo ('File to read  ' + file_name ) 
	var temp_arr = fs.readFileSync(file_name).toString().split('\n')

	this.arr 	= new sorted_array()

	this.aux_1 		= ''		// Array_Nivel 2
	this.aux_2 		= ''		// Array_Nivel 3
	this.aux_3 		= ''		// Array_Nivel 3
	this.aux_4 		= ''		// Array_Nivel 4

	
	var title 		= 	''
	var trim_line	=	''
	
	// Necesitamos un array dimensional de titulos
	
	this.tit			= 	Array()			// Boolean array
	this.tit_name		= 	Array()			// Name array

	for (var i = 1 ; i<=4 ; i++ ) 	this.tit[i]			= 	false
	
	for (pos in temp_arr)
	{
		line 		= temp_arr[pos]
		trim_line 	= line.trim()
		
		if (!f_file.is_comment_yaml_line(line) )
		{
			// Hay que ver si la linea va a ser titulo o no si 

			if (f_file.is_title_yaml_line(line))
			{
			// CASO TITULO
				if 		(f_file.is_yaml_level(line,4))
				{
					// ESTE CASO NO LO TENEMOS TODAVIA
					if (!this.tit[4])
					{ 
						this.aux_4 = new sorted_array()
						this.tit[4] 		= 	true
						this.tit_name[4]	=	trim_line
					}

					this.aux_4.add( trim_line  , this.aux_5 )	

					echo ('Linea 4 es titulo: ' + line)
				}
				if 		(f_file.is_yaml_level(line,3))
				{
					if (!this.tit[3])
					{ 
						echo ('Linea 3 es titulo: ' + line)

						this.aux_3 = new sorted_array()
						this.tit[3] 		= 	true
						this.tit_name[3]	=	trim_line
					}

					this.aux_3.add( trim_line  , this.aux_4 )	

				}
				else if (f_file.is_yaml_level(line,2))
				{
					if (!this.tit[2])
					{ 
						this.aux_2 = new sorted_array()
						this.tit[2] 		= 	true
						this.tit_name[2]	=	trim_line
					}

					this.aux_1.add( trim_line  , this.aux_2 )	

					// echo ('Linea 2 es titulo: ' + line)
					
				}
				else if (f_file.is_yaml_level(line,1))
				{
					if (!this.tit[1])
					{ 
						this.aux_1 = new sorted_array()
						this.tit[1] 		= 	true
						this.tit_name[1]	=	trim_line
					}

					this.arr.add(trim_line, this.aux_1)	
					// echo ('Linea 1 es titulo: ' + line)
							
				}
				else
					echo ('Level 3 ' + trim_line) 

			}
			else
			{
			// CASO SIMPLE
				if 		(f_file.is_yaml_level(line,4))
				{
					if (!this.tit[4])		this.aux_4 = new sorted_array()

					echo ('Nivel 4 es linea: ' + line)
					this.aux_3.add_str(trim_line)
				}
				else if (f_file.is_yaml_level(line,3))
				{
					// Si hay algun array superior hay que reiniciarlo e insertarlo
					if (this.tit[3])
					{   
						this.tit[3] 		= 	false
						echo ("Insertar array3_superior " + line )
						this.aux_3.add( trim_line  , this.aux_4 )	
					}
					else
						this.aux_3 = new sorted_array()
					
					// echo ('Nivel 3 es linea: ' + line)
					this.aux_2.add_str(trim_line)
				}
				else if (f_file.is_yaml_level(line,2))
				{
					if (this.tit[4])   this.tit[4] 		= 	false
					if (this.tit[3])   this.tit[3] 		= 	false
					if (this.tit[2])   this.tit[2] 		= 	false

					// echo ('Nivel 2 es linea: ' + line)
					this.aux_1.add_str(trim_line)
					
				}
				else if (f_file.is_yaml_level(line,1))
				{
					if (this.tit[4])   this.tit[4] 		= 	false
					if (this.tit[3])   this.tit[3] 		= 	false
					if (this.tit[2])   this.tit[2] 		= 	false
					if (this.tit[1])   this.tit[1] 		= 	false
					
					// echo ('Nivel 1 es linea: ' + line)
					this.arr.add_str(trim_line)
					
				}

				// arr[0] = Linea primera
			}
		}

	
	}	
	// echo ('File Length  ' + this.arr.num )

	echo (".....................................")

	this.arr.marr()

	// Tenemos que devolverlo como objeto. Sino falla. En objetos si funciona pero con funciones y  arrays no
}

// let file = '/brqx/pers/drupal/v50/fnode/truck/fnode/cookies_structure/fr_cookies_yaml'

// echo ('Parsing File ' + file )

// var ya = new yaml_from_file(file)

// var a = '  Level_01'
// var b = '    Level_02'

// echo ('Test Yaml ' + f_file.is_yaml_level(a,1) + ' ' + true )
// echo ('Test Yaml ' + f_file.is_yaml_level(b,2) + ' ' + true )


module.exports.yaml_from_file = yaml_from_file
