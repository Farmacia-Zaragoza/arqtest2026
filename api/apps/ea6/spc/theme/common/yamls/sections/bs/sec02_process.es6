// [DOCHANGED_PHP56_PHP52_ES6]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Sections P Structure  [V.0.1.1]  (2017-12-14)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//<section>
//  <h2> What are cookies?
//   <p> Text                  x N
//-------------------------------------------------------------------------------------
//* SECTION
//	  H2
//	  P
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_data   	  : Build section based on yaml file
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 						= 	require(	"/brqx/base/rcode/ea6/com/libs/general/constants.es6"											);

const 	{ html_style } 				= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'),
		const { sec02_process_tit } 		= 	require(	path.join(JS_BASE, 'spc/theme/common/yamls/sections/base/gen/sec02_process_tit.es6'),
		const { sec02_process_se } 		= 	require(	path.join(JS_BASE, 'spc/theme/common/yamls/sections/se/sec02_process_se.es6'),
		const { sec02_process_sa } 		= 	require(	path.join(JS_BASE, 'spc/theme/common/yamls/sections/sa/sec02_process_sa.es6'),
		const { sec02_process_se_ext } 	= 	require(	path.join(JS_BASE, 'spc/theme/common/yamls/sections/se/sec02_process_se_ext.es6'));
		empty 						= 	require(	path.join(NODE_MOD, 'is_empty'));


class sec02_process extends html_style {

	constructor() 
	{
		// ESTE DEVUELVE LA SECCION - POR TANTO ES DISTINTO A LOS OTROS
		// passed_tittle es el titulo del padre
		let tag_type = "section"

		super(tag_type)
		this.n 					= "sec02_process::"

		// Sorted array passed  - 
		// Sorted elem passed
		this.sa					= 	''		
		this.parent_title		=	''

		this.se					= 	''				// SE - Sorted Elem
		this.inse				=	''				// Inner SE		

		this.dim 				= 	0
		this.maxdim				=	0
		this.level_sa			=	0
		this.level_se			=	0
		
		this.elem_se			= 	''
		this.elem_sa			= 	''
		this.elem_01			= 	''

		this.elem_title			=	''

		this.tag_type 			= 	"section"

	}

	choose_process_sa()
	{
		this.m		=	'choose_process_sa'

		// this.p('ChoLevel ' + this.level_sa)

		if 			(this.level_sa === 0 ) this.elem_sa			= 	new sec02_process_sa()
	}


	choose_process_se()
	{
		this.m		=	'choose_process_se'

		// this.p('ChoLevel ' + this.level_se)


		if 			(this.level_se === 0 ) this.elem_se			= 	new sec02_process_se()
	}

	choose_process_se_ext()
	{
		this.m		=	'choose_process_se_ext'

		// this.p('ChoLevel ' + this.level_se)


		if 			(this.level_se === 0 ) this.elem_se			= 	new sec02_process_se_ext()
	}

	reprocess(elem	, 	level_sa = 0  ,level_se = 0  , 	maxdim = 0) 
	{
		let tag_type 			= 	"section"

		this.n 					= 	"sec02_process::"
		this.m					=	'reprocess'

		// Sorted array passed - Sorted elem passed
		this.sa					= 	elem		

		this.dim 				= 	elem.dim
		this.maxdim				=	maxdim
		this.level_sa			=	level_sa
		this.level_se			=	level_se

		this.process_childrens()

	}

	process_children()
	{
		this.m					=	'process_children'


		// SORTED ELEMS - (tit - str - pos - dim)
		// this.p('Process_children ' + this.se.type + ' Str ' + this.se.str + ' Tit ' + this.se.tit)

		if ( typeof this.se === 'object')
		{

			if 		(this.se.type === 'sorted_array')
			{		
				// this.p('SA [' + this.level_sa + ']' + this.se.str + ' Tit ' + this.se.tit )

				this.choose_process_sa()

				this.elem_sa.reprocess(			this.se 				,   
											  	this.level_sa + 1		, 
											  	this.level_se 			, 
											  	this.maxdim				)

				this.content		 	+= 		this.elem_sa.code
				this.elem_sa			= 		null 
											  	
			}
			else if	(this.se.type === 'sorted_elem' )
			{
				// this.p('SE '+ this.inse.str + ' Tit ' + this.inse.tit )

				this.choose_process_se()

				this.elem_se.reprocess(
												this.se 			,
												this.level_sa		,   
											  	this.level_se + 1 	, 
											  	this.maxdim	)

				this.content		 	+= 		this.elem_se.code
				this.elem_se			= 		null 
				
			}		
			else
				this.p('RARE '+ this.type + ' ' + this.se.str + ' Tit ' + this.se.tit + ' PTit ' + this.parent_title)
					
		}
		else
		{
		 	// Es una cadena
			// this.p('SE ' + this.se  + ' Tit ' + this.se.tit + ' PTit ' + this.parent_title)

			this.elem_01			= new html_style('p')
			this.elem_01.content	= this.se
			this.elem_01.pcreate()

			this.content 			+= 		this.elem_01.code
			this.elem_01			= 		null 

		}

	}

	process_childrens() 
	{
		this.m					=	'process_childrens'

		if ( typeof this.sa === 'object')
		{

			// this.p('TypeSA [' + this.sa.type + '] dim ' + this.sa.dim )

			if			(this.sa.type === 'sorted_elem' )
			{
				// this.p('SE - Obj Level '+ this.level_se + ' Dim ' + this.maxdim )

				this.choose_process_se_ext()
			
				this.elem_se.reprocess(				this.sa 			,
													this.level_sa		,   
											  		this.level_se + 1 	, 
											  		this.maxdim			)

				this.content 	+= this.elem_se.code
				this.elem_se			= null 

			}					
			else if 	(this.sa.type === 'sorted_array')
			{
				/// this.p('NO SE SI ENTRARA AQUI')
				// SA - Sorted - Array

				// Elem_se para todos los nodos
				for (var i = 0 ; i < this.sa.num ; i++) 
				{
					this.se = this.sa.elems[i]			// sorted_elem
		
					if (!empty (this.se))
					{
						// Types 0 sorted_elem dim 0 - ( tit - str - pos - dim) 
						// this.p('Type [' + i + '] ' + this.se.type + ' dim ' + this.se.dim )
				
						// First level - sections
						this.process_children()
			
					}
				}
			}
		}		
		else
		{
			// this.p('No_es_Objeto' + this.sa )
			// NO ES OBJETO - llega como cadena - OK	
			this.elem_01			= new html_style('p')
			this.elem_01.content	= this.sa
			this.elem_01.pcreate()
			this.content 			+= this.elem_01.code
			
			this.elem_01			= null 
					
		}

		this.pcreate()

	} // End Function
	

} // End Class

exports.sec02_process = sec02_process