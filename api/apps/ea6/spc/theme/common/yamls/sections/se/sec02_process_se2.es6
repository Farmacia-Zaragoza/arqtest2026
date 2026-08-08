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

const 	{ html_style } 				= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6')),
		{ sec02_process_tit } 		= 	require(	path.join(JS_BASE, 'spc/theme/common/yamls/sections/base/gen/sec02_process_tit.es6')),
		{ sec02_process_se3 } 		= 	require(	path.join(JS_BASE, 'spc/theme/common/yamls/sections/se/sec02_process_se3.es6')),
		{ sec02_process_sa3 } 		= 	require(	path.join(JS_BASE, 'spc/theme/common/yamls/sections/sa/sec02_process_sa3.es6'));


class sec02_process_se2 extends html_style {

	constructor() 
	{
		super()
		this.n 					= 	"sec02_process_se2::"

		// Sorted array passed
		this.se					= 	''		

		this.sa					= 	''				// SE - Sorted Elem
		this.inse				=	''				// Inner SE		

		this.dim 				= 	0
		this.maxdim				=	0
		this.level_sa			=	0
		this.level_se			=	0
		
		this.elem_title			=	''
		this.elem_01			=	''
		this.elem_se			=	''
		this.elem_sa			=	''

	}

	choose_process_sa()
	{
		this.m		=	'choose_process_sa'

		// this.p('ChoLevel ' + this.level_sa)

		if 			(this.level_sa === 1 ) this.elem_sa			= 	new sec02_process_sa3()
	}


	choose_process_se()
	{
		this.m		=	'choose_process_se'

		// this.p('ChoLevel ' + this.level_se)


		if 			(this.level_se === 1 ) this.elem_se			= 	new sec02_process_se3()
	}


	reprocess(elem 		,level_sa = 0  	,level_se = 0  	, maxdim = 0) 
	{
		this.se					= 	elem		

		this.dim 				= 	elem.dim
		this.maxdim				=	maxdim
		this.level_sa			=	level_sa
		this.level_se			=	level_se

		this.process_se()
	}


	process_se()
	{
		// ONLY SORTED ELEMS - (tit - str - pos - dim)
		// this.p('Elem_children ' + this.se.type + ' Str ' + this.se.str + ' Tit ' + this.se.tit)

		if ( ( typeof this.se === 'object' 		) && 
			 ( this.se.type === 'sorted_elem' )	)
		{
			// Sabemos que es un objeto - Gestion Posible titulo
			if (!empty(this.se.tit))
			{
				this.elem_title 	= 		new sec02_process_tit(this.se.tit , this.level_sa, this.maxdim ) 
				
				this.code 			+=		this.elem_title.code
			}  

			// PROCESO CONTENIDO DEL ELEMENTO
			this.inse	= this.se.str

			// Hay otro caso, que sea indefinido
		
			if ( ( typeof(this.inse) != "undefined" ) &&	
			     ( typeof this.inse === 'object'    )	)
			{

				if 		(this.inse.type === 'sorted_array')
				{
						// this.p('SORTED_ARRAY_BEFORE ' + this.inse.num + ' Inse ' + this.inse)
	
						this.choose_process_sa()
						
						this.elem_sa.reprocess(				this.inse 				,  
													  		this.level_sa + 1 		, 
													  		this.level_se	 		, 
													  		this.maxdim				)

						if (typeof(this.elem_sa.code) != "undefined")	
							this.code 	+= this.elem_sa.code

				}
				else if	(this.inse.type === 'sorted_elem' )
				{

						this.choose_process_se()

						this.elem_se.reprocess(				this.inse 				,   
													  		this.level_sa  			, 
													  		this.level_se + 1 		, 
													  		this.maxdim				)

						this.code 			+= 		this.elem_se.code
				}					
				else
						this.p('RARE '+ this.type + ' ' + this.se.str + ' Tit ' + this.se.tit + ' PTit ' + this.parent_title)
					
				 }
			 else
			 {
			 	// Es una cadena
					// this.p('SE ' + this.inse )
	
					this.elem_01			= new html_style('p')
					this.elem_01.content	= this.inse
					this.elem_01.pcreate()

					this.code 	+= this.elem_01.code
		 }
		}
		else
		{
		 	// Es una cadena
				// this.p('SE ' + this.se  )

				this.elem_01			= 		new html_style('p')
				this.elem_01.content	= 		this.se
				this.elem_01.pcreate()

				this.code 				+= 		this.elem_01.code

		}

		// this.p('SE_CODE >' + this.code)		

	} // End Function

} // End Class

exports.sec02_process_se2 = sec02_process_se2