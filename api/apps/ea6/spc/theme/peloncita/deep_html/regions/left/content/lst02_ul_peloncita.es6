//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node JS Html UL_content - LMenu Class  [V.0.0.4]  (2017-02-08)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
//Theme UL Structure - Peloncita site
//------------------------------------------------------------------------------------------------
//<ul class="menu">
//<li class="media"> - Multi-type ( texts - icons - itexts)
// UL
//LI - START REPEAT
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Slider UL Peloncita
//------------------------------------------------------------------------------------
//Methods:
//- clean_objects    : Empty bucle properties
//- load_file        : Load dat file from system
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)	


class lst02_ul_peloncita extends html_style {

	constructor(fnode = "", menu_type)  					
	{
		this.tag_type 			= "ul"

		super(this.tag_type)
		this.n 					= "lst02_ul_peloncita::"
		this.zone 				= "l"
		this.num_elements_menu 	= 0
		this.menu_type 			= menu_type
		this.fnode 				= fnode
		this.zone 				= fnode.zone
		this.map 				= this.fnode.map + "content_" + this.zone + this.tag_type + "/"
		this.fnode.map 			= this.map

		switch (this.menu_type) {
			case "texts":
				this.li_01 = new lst01_li_peloncita_texts(this.fnode)
				break

			case "icons":
				this.li_01 = new lst01_li_peloncita_icons(this.fnode)
				break

			case "itexts":
				this.li_01 = new lst01_li_peloncita_itexts(this.fnode)
				break
		}

		super.constructor(this.tag_type)
		this.build_data()
	}

	clean_objects() {
		this.clean()
	}

	build_data() 
	{
		this.code = ""
		this.content = ""
		this.class = "menu"
		var sw_active = 0
		{
			let _tmp_0 = this.fnode.arr.tit

			for (var slide_num in _tmp_0) //Is needed to have an string slide num for comparations
			//Tab text
			{
				var slide_name = _tmp_0[slide_num]
				var current_url = this.fnode.arr.url[slide_num]

				if (!!slide_name) //Empty code for every slide
					//03. Position
					{
						this.li_01.content = ""
						this.li_01.code = ""
						this.li_01.reload_contents(current_url, slide_name, slide_num)
						this.content += this.li_01.code
					}
			}
		}
		this.pcreate()
	}

}

exports.lst02_ul_peloncita = lst02_ul_peloncita
