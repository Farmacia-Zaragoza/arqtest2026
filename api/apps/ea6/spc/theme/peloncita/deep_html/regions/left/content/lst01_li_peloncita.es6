//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node JS Html LI Class  [V.0.0.3]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Peloncita Structure
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Slider LI Peloncita  Class
//------------------------------------------------------------------------------------
//Methods:
//- load file       : Load dat file attributes
//- clean_objects   : Empty bucle properties
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)	

class lst01_li_peloncita_icons extends html_style {

	constructor(fnode = "") 
	{
		this.tag_type 				= "li"
		super(this.tag_type)

		this.n 						= "lst01_li_icons::"
		this.map_print = ""

		this.fnode = fnode
		this.zone = fnode.zone
		this.map = this.fnode.map + "content_" + this.zone + this.tag_type + "/"
		this.fnode.map = this.map
		this.a_01 = new html_style("a")
		super.constructor(this.tag_type)
		this.com_01 = new com01_li_peloncita_left(this.fnode)
		this.com_02 = new com02_li_peloncita_left(this.fnode)
	}

	reload_contents(url = "", text = "", position = "") 
	{
		this.map_print = this.map + position
		var url_img = this.fnode.u.site_url
		url_img += this.fnode.u.cot.process_contents(this.map_print, "png")
		this.d(" Map " + this.map_print + " Img " + url_img)
		this.com_02.reload_contents(url, text, url_img, position)
		this.class = "media"
		this.content = this.com_02.code
		this.build_data()
	}

	build_data() 
	{
		this.pcreate()
	}

}

exports.lst01_li_peloncita_icons = lst01_li_peloncita_icons