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

var 	cons 						= 	require(	"/brqx/base/rcode/ea6/com/libs/general/constants.es6"								);

const 	{ html_style } 			= 	require(path.join(JS_BASE, 'com/objects/html/html_style.es6'))
		const { sec02_process_tit } = require(path.join(JS_BASE, 'spc/theme/common/yamls/sections/base/gen/sec02_process_tit.es6'))
		const { sec02_process_se1 } = require(path.join(JS_BASE, 'spc/theme/common/yamls/sections/se/sec02_process_se1.es6'))
		const { sec02_process_sa1 } = require(path.join(JS_BASE, 'spc/theme/common/yamls/sections/sa/sec02_process_sa1.es6'))

class sec02_process_sa extends html_style {

	constructor() 
	{
		super()
		this.n 					= 	"sec02_process_sa::"

		// Sorted array passed
		this.sa					= 	''		
		this.parent_title		=	''

		this.se					= 	''				// SE - Sorted Elem
		this.inse				=	''				// Inner SE		

		this.dim 				= 	''
		this.maxdim				=	0
		this.level_sa			=	0
		this.level_se			=	0
		
		this.elem_title			=	''
		this.elem_se			=	''
		this.elem_sa			=	''
		this.elem_01			=	''

	}

	choose_process_sa()
	{
		this.m		=	'choose_process_sa'

		// this.p('ChoLevel ' + this.level_sa)

		if 			(this.level_sa === 0 ) this.elem_sa			= 	new sec02_process_sa1()
	}

	choose_process_se()
	{
		this.m		=	'choose_process_se'

		// this.p('ChoLevel ' + this.level_se)

		if 			(this.level_se === 0 ) this.elem_se			= 	new sec02_process_se1()
	}

	reprocess(elem	, 	level_sa = 0  ,level_se = 0  , 	maxdim = 0) 
	{

		this.m 					= "reprocess::"

		// Sorted array passed
		this.sa					= 	elem		
		this.dim 				= 	elem.dim
		this.maxdim				=	maxdim
		this.level_sa			=	level_sa
		this.level_se			=	level_se

		// this.p('Deep_SA ' + this.level_sa)

		this.process_childrens()

	}

	process_children()
	{
		// SORTED ELEMS - (tit - str - pos - dim)
		// this.p('Elem_children ' + this.se.type + ' Str ' + this.se.str + ' Tit ' + this.se.tit)

		if ( ( typeof(this.se) != "undefined" ) &&	
			 ( typeof this.se === 'object')		  )
		{

			if 		(this.se.type === 'sorted_array')
			{		
				// this.p('SA [' + this.level_sa + ']' + this.se.str + ' Tit ' + this.se.tit )

				this.choose_process_sa()

				this.elem_sa.reprocess(			this.se 			, 
											  	this.level_sa + 1 	, 
											  	this.level_se  		, 
											  	this.maxdim			)

				this.code 	+= this.elem_sa.code

			}
			else if	(this.se.type === 'sorted_elem' )
			{
				// this.p('SE - Obj '+ this.se + ' Level ' + this.level_se + ' Maxdim '+ this.maxdim)

				// Ya se el fallo. Hace referencia circular

				this.choose_process_se()

				// this.p('Type_Before_Call ' + this.se.type)
				this.elem_se.reprocess(			this.se 			,   
											  	this.level_sa	 	, 
											  	this.level_se + 1 	, 
											  	this.maxdim			)

				this.code 				+= 		this.elem_se.code
																  	
			}		
			else
				this.p('RARE '+ this.type + ' ' + this.se.str + ' Tit ' + this.se.tit + ' PTit ' + this.parent_title)
					
		}
		else if ( typeof this.se === 'string')
		{
		 	// Es una cadena
			// this.p('SE ' + this.se  + ' Tit ' + this.se.tit + ' PTit ' + this.parent_title)

			this.elem_01			= new html_style('p')
			this.elem_01.content	= this.se
			this.elem_01.pcreate()

			//if (typeof(this.elem_01) != "undefined")	
			this.code 	+= this.elem_01.code
		}
		else
			this.p('RARE '+ this.type + ' ' + this.se.str + ' Tit ' + this.se.tit + ' PTit ' + this.parent_title)

	}

	process_childrens() 
	{

		if ( typeof this.sa === 'object')
		{

			// this.p('TypeSA [' + this.sa.type + '] dim ' + this.sa.dim )
		
			// SA - Sorted - Array
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
		else
		{
			// NO ES OBJETO - llega como cadena - OK	
			this.elem_01			= 		new html_style('p')
			this.elem_01.content	= 		this.sa
			this.elem_01.pcreate()
			this.code 				+= 		this.elem_01.code
			
			this.elem_01 			=	 	null
					
		}
	}

}

exports.sec02_process_sa = sec02_process_sa