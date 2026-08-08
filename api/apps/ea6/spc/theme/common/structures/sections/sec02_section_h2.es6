//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Sections P Structure  [V.0.1.1]  (2017-03-16)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//<section>
//<p>
//In DBRQX_FLAT we use cookies
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

var 	cons	 				= 	require(	"/brqx/base/rcode/ea6/com/libs/general/constants.ess"					);

const 	{ sec01_section_p } 		= 	require(	path.join(JS_BASE, 'spc/theme/common/structures/sections/sec01_section_p.es6'))),
		{ html_style } 				= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6')));


class sec02_section_h2 extends sec01_section_p {

	constructor() 
	{
		let tag_type				=	'section'
		super(tag_type)

		this.n 						= "sec02_section_h2::"
		this.line_separator 		= ""

		this.tag_type 				= "section"

		this.h3_01 					= new html_style("h3")
	}

	create_normal_section_h2(elem = "", passed_title = "") 
	{
		if (elem == "_") 
			this.content 				+= 	this.line_separator
		else 
		{
			this.h2_01.content 			= 	passed_title
			this.h2_01.pcreate()
			this.content 				+= 	this.h2_01.code
			this.p_01.content 			= 	elem
			this.p_01.pcreate()
			this.content 				+= 	this.p_01.code
		}
	}

	create_normal_section_h3(elem = "", passed_title = "") 
	{
		if (elem == "_") 
			this.content += this.line_separator
		else 
		{
			this.p_01.content 			= elem
			this.p_01.pcreate()
			this.content 				+= this.p_01.code
		}
	}

	// Son Sorted Arrays
	create_simple_section_h2(arr_elem = "", passed_title = "") 
	{
		this.h3_01.content 				= 	passed_title
		this.h3_01.pcreate()
		this.content 					+= 	this.h3_01.code

		for (var i = 0 ; i < arr_elem.num ; i++) 
		{
			var elem = arr_elem[i].str
			var tit  = arr_elem[i].tit

			if ( typeof elem === 'object')
			{	
				this.p("NOT_IMPLEMENTED_THREE LEVELS DIMENSION")
				this.create_simple_section_h3(elem, tit)
			} 
			else
				this.create_normal_section_h3(elem, tit)
		}

	}

	create_simple_section_h3(arr_elem = "", passed_title = "") 
	{}

	create_double_section() //Pending to implemment
	{
		this.h2_01.content = this.passed_title
		this.h2_01.pcreate()
		this.content += this.h2_01.code
		

		var arr_elem = this.element

		for (var i = 0 ; i < arr_elem.num ; i++) 
		{
			var elem = arr_elem[i].str
			var tit  = arr_elem[i].tit

			if ( typeof elem === 'object')
			{	
				this.create_simple_section_h2(elem, tit)
			} 
			else
				this.create_normal_section_h2(elem, tit)
		}


		
		this.pcreate()
	}

	build_data() 
	{
		this.content = ""

		// this.p('Yaml Dimension ' + this.dim)

		switch (this.dim) 
		{
			case 0:
				this.create_normal_section()
				break

			case 1:
				this.create_direct_simple_section()
				break

			case 2:
				this.create_double_section()
				break
		}
	}

}

exports.sec02_section_h2	= sec02_section_h2