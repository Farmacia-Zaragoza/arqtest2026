//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.1.7]  (2016-11-24)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Image Class - Igual esta ya en desuso
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- build_node       : Load all drupal node details
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { getset } 		= require(	'/brqx/base/rcode/es6/com/objects/html/getset.es6'		)

class img extends getset {
	constructor(site_url = "", relative_path = "") 
	{
		this.n 				= "img::"

		super()
		this.content_html 	= ""
		this.site_url 		= ""
		this.name 			= ""
		this.relative_path 	= ""
		this.path 			= ""
		this.title 			= ""
		this.alt 			= ""
		this.width 			= ""
		this.height 		= ""
		this.relation 		= ""
		this.orientation 	= "vertical"
		this.is_vertical 	= 1
		this.site_url 		= site_url
		this.relative_path 	= relative_path

		if (this.relative_path != "") this.reload_relative_path()
	}

	reload_full_path(full_path = "", name = "", title = "", alt = "") {
		if (full_path != "") {
			this.path = full_path
			if (name != "") this.name = name
			if (name != "") this.title = title
			if (name != "") this.alt = alt
		}

		this.build_dimensions()
	}

	reload_relative_path(relative_path = "", name = "", title = "", alt = "") {
		if (relative_path != "") {
			this.relative_path = relative_path
			this.path = this.site_url + this.relative_path
			if (name != "") this.name = name
			if (name != "") this.title = title
			if (name != "") this.alt = alt
		}

		this.build_dimensions()
	}

	build_dimensions() {
		[this.width, this.height] = getimagesize(this.path)
		this.relation = number_format(this.width / this.height, 2)

		if (this.width > this.height) {
			this.orientation = "horizontal"
			this.is_vertical = 0
		} else {
			this.orientation = "vertical"
			this.is_vertical = 1
		}
	}

}

exports.img = img