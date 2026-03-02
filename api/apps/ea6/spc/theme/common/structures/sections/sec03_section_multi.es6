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

class sec02_section_h2 extends html_style {

	constructor() 
	{
		let tag_type 	=	'section'
		super(tag_type)
		this.n = "sec02_section_p::"
		this.dim = 0

		this.tag_type = "section"
		this.p_01 = new html_style("p")
		this.h2_01 = new html_style("h2")
		this.h3_01 = new html_style("h3")
	}

	reload_data(title = "", element = "") {
		this.element = element
		this.passed_title = title
		if (Array.isArray(this.element)) 
			this.dim = countdim(this.element)
		else 
			this.dim = 0

		this.build_data()
	}

	create_normal_section(elem = "", passed_title = "", container_in = "") {
		if (elem == "") elem = this.element
		var container_out = ""
		if (this.element == "_") container_out = "</br>"
		else 
			{
				this.p_01.content = this.element
				this.p_01.pcreate()
				container_out = this.p_01.code
			}
	}

	create_simple_section(arr_elem = "", passed_title = "", container_in = "") 
	{
		if (arr_elem == "") arr_elem = this.element
		if (passed_title == "") var title_passed = this.passed_title
		if (container_in == "") container_in = this.h2_01
		container_in.content = passed_title
		container_in.pcreate()
		var container_out = container_in.code

		for (var pos in arr_elem) //$this->p('A01 '  . $elem)
		{
			var elem = arr_elem[pos]
			if (elem == "_") 
				container_out += "</br>"
			else 
			{
				this.p_01.content = elem
				this.p_01.pcreate()
				container_out.content += this.p_01.code
			}
		}

		return container_out
	}

	create_direct_simple_section(arr_elem = "") {
		this.create_simple_section(arr_elem)
		this.pcreate()
	}

	create_double_section() //Pending to implemment
	{
		{
			let _tmp_0 = this.element

			for (var title in _tmp_0) {
				var elem = _tmp_0[title]

				if (Array.isArray(elem)) {
					this.create_simple_section(elem, title, this.h3_01)
				} else this.create_normal_section(elem, title, this.h2_01)
			}
		}
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
				this.create_double_section()
				break
		}
	}

}
