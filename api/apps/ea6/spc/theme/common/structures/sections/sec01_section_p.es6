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
//P
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- reload_data   	  : Build section based on yaml file
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons	 				= 	require(	"/brqx/base/rcode/ea6/com/libs/general/constants.ess"					);

const 	{ html_style } 		= 	require(path.join(JS_BASE, 'com/objects/html/html_style.es6'))
		  const dim = require(path.join(JS_BASE, 'com/libs/arrays/countdim.es6'))

class sec01_section_p extends html_style {

	constructor() 
	{
		let tag_type = "section"

		super(tag_type)
		this.n 					= "sec01_section_p::"
		this.dim 				= 0

		this.tag_type 			= "section"

		this.p_01 				= new html_style("p")
		this.h2_01 				= new html_style("h2")
	}

	// Ojo que ahora son objetos

	reload_data(title = "", element = "") 
	{
		this.element = element
		this.passed_title = title

		if ( typeof this.element === 'object')
		{ 
			this.dim = this.element.num
			// this.p('Arr ' + title + ' ' + this.dim)
		}
		else 
		{
			// this.p('Dim ' + title )
			this.dim = 0
		}

		this.build_data()
	}

	create_normal_section() {
		if (this.element == "_") 
			this.code = this.line_separator
		else
		{
			this.p_01.content = this.element
			this.p_01.pcreate()
			this.content = this.p_01.code
			this.pcreate()
		}
	}

	create_simple_section(arr_elem = "") 
	{
		if (arr_elem == "") 		arr_elem = this.element

		this.h2_01.content = this.passed_title
		this.h2_01.pcreate()
		this.content = this.h2_01.code
		
		for (var i = 0 ; i < arr_elem.num ; i++) 
		{
			var elem = arr_elem[i].str
			var tit  = arr_elem[i].tit

			if (elem == "_") 
				this.content += this.line_separator
			else 
			{
				this.p_01.content = elem
				this.p_01.pcreate()
				this.content += this.p_01.code
			}
		}

	}

	create_direct_simple_section(arr_elem = "") 
	{
		this.create_simple_section(arr_elem)
		this.pcreate()
	}

	build_data() {
		switch (this.dim) {
			case 0:
				this.create_normal_section()
				break

			case 1:
				this.create_direct_simple_section()
				break

			case 2:
				this.p("MULTI_DIMENSION_NOT_IMPLEMENTED_YET")
				break
		}
	}

}

exports.sec01_section_p = sec01_section_p
