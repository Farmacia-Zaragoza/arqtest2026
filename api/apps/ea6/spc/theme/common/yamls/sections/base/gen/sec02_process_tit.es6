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

var 	cons 					= 	require(	"/brqx/base/rcode/ea6/com/libs/general/constants.es6"	);

const 	{ html_style } 			= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6')),
		{ getset } 				= 	require(	path.join(JS_BASE, 'com/objects/html/getset.es6')),
		empty 					= 	require(	path.join(NODE_MOD, 'is_empty'));


class sec02_process_tit extends getset {

	constructor(passed_title = '' , level = 0  , maxdim = 0) 
	{
		// passed_tittle es el titulo del padre

		super()
		this.n 					= "sec02_process_tit::"

		// this.p('Passed_title : ' + passed_title)

		// Sorted array passed
		this.parent_title		=	passed_title
		this.maxdim				=	maxdim
		this.level				=	level + 1
		
		// Object to manage dimension sa

		this.elem_title			=	''

		// know_children_number()
		if (!empty(this.parent_title))  
			this.level_title()
	}

	level_title()
	{
		this.m					=	'level_title'
		
		// 0 - h3
		// this.p('Max dim ' + this.maxdim + ' - Lev ' + this.level )
		if 		(this.maxdim === 3)
		{
			//			 0    1
			// section - h2 - h3 - p 
			if 		(this.level === 0 )			this.elem_title 			= new html_style('h1')
			else if (this.level === 1 )			this.elem_title 			= new html_style('h2')
			else if (this.level === 2 )			this.elem_title 			= new html_style('h3')
			else
				this.p('WRONG_CASE ' + this.level + this.parent_title)

			this.elem_title.content  	= this.parent_title
			this.elem_title.pcreate()
			this.code 	+= 	this.elem_title.code				
			
		}
		else if (this.maxdim === 2)
		{
			if 		(this.level === 0 )			this.elem_title 			= new html_style('h2')
			if 		(this.level === 1 )			this.elem_title 			= new html_style('h3')

			this.elem_title.content  	= this.parent_title
			this.elem_title.pcreate()
			this.code 	+= 	this.elem_title.code				

			// section - h3 - p 

		}
		else if (this.maxdim === 1)
		{
			// section - p - pendiente - igual no tiene sentido en los titulos 
		}
	}		


}

exports.sec02_process_tit = sec02_process_tit