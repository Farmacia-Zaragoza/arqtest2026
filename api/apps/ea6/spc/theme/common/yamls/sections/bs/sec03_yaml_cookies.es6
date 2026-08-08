// [DOCHANGED_PHP56_PHP52_ES6]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Sections P Structure  [V.0.1.1]  (2017-12-14)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//<section>
//<p>
//CAMBIO RADICAL - YA NO USAMOS ARRAYS DE JAVASCRIPT- HE CREADO SORTED_ARRAY
//-------------------------------------------------------------------------------------
// SECTION
//H2
//H3
//P
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_data   	  : Build section based on yaml file
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 					= 	require(	"/brqx/base/rcode/ea6/com/libs/general/constants.es6"							);

const 	{ html_style } 			= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'));
		const { sec02_process } 		= 	require(	path.join(JS_BASE, 'spc/theme/common/yamls/sections/bs/sec02_process.es6'));
		const { sorted_array } 		= 	require(	path.join(JS_BASE, 'com/objects/drupal/structs/sorted_array.es6'));


class sec03_yaml_cookies extends sorted_array {

	constructor(	elems				, 
					tit 	= ''		, 
					tit02 	= ''		) 
	{
		super()

		this.n 						= "sec03_yaml_cookies::"
		this.line_separator 		= ""

		// Pasamos el sorted array
		// Igual una mejora es que sea ya el sorted array sec03

		this.ancient_title			=	tit02
		this.parent_title			=	tit
		this.sa						= 	elems
		
		// Elem code
		
		this.elem01					= 	''
		
		// Object code
		this.sec01					=	''
		
		this.object_code			=	''
		
		this.code					=	''

		this.build_data()
	}


	build_data() 
	{
		this.code = ''
		//Procesado del titulo - Debe ser al generar la seccion
		// Passed Title

//		this.elem_01 = new sec02_se3_process()
		
//		this.elem_01.reprocess(	'abc' 			,0 				, this.sa.dim	)
		
		// Procesado de elementos complejos / o simples [SORTED_ELEM]

		this.elem_01 = new sec02_process()

		for (var i = 0 ; i < this.sa.num ; i++) 
		{
			var se = this.sa.elems[i]			// sorted_elem

			// Types 0 sorted_elem dim 0 - ( tit - str - pos - dim) 
			// this.p('Types ' + i + ' ' + elem.type + ' dim ' + elem.dim )

			
			// First level - sections
			// Level SA - Level SE
			this.elem_01.reprocess(se ,	0 , 0 , this.sa.dim)

			this.code 	+= this.elem_01.code
		}



	} // End Method

} // End Class

exports.sec03_yaml_cookies	= sec03_yaml_cookies