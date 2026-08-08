//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Sld04 Right Div Class  [V.0.2.2]  (2017-01-16)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
// <div class="col-md-3 col-lg-2-point-5 social-right" tame="section_div_div_03">
//DIV_PANEL
//DIV SOCIAL
//Aqui tenemos tres variantes
//<div class="tab_start icons" role="tabpanel"> External
//-------------------------------------------------------------------------------------
// DIV
//DIV	- External
//DIV	- External
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class sld04_div_peloncita_right extends html_style {

	constructor(thm = "", menu_type_selector = "icons", menu_type_content = "icons", map) 
	{
		this.tag_type = "div"

		this.n = "sld04_div_right::"
		this.num_elements_menu = ""
		this.zone = "r"

		this.menu_type_selector = menu_type_selector
		this.menu_type_content = menu_type_content
		this.thm = thm
		super.constructor(this.tag_type)
		this.fnode = this.thm.nid.arr.fnode.region_right
		this.fnode.zone = this.zone
		this.map = this.fnode.map + "main_" + this.zone + "iv/"
		this.div_d01_p01 = new html_style("div")
		this.div_gotas = new html_style("div")
		this.div_01 = new sld03_div_peloncita(this.fnode, this.fnode_01, this.menu_type_selector, this.menu_type_content)
		this.build_data()
	}

	create_div_gotas() {
		this.div_gotas.data_src = this.thm.u.site_url + "resp_images/Brqx_FondoGotas_rosa_100x100.gif"
		this.div_gotas.pcreate()
		this.content += this.div_gotas.code
	}

	create_div_01() 
	{
		this.content += this.div_01.code
	}

	create_div_02()
	{
		this.div_02 = new soc01_twitter_div_peloncita()
		this.content += this.div_02.code
	}

	create_div_03() /// DIV FACEBOOK
	{
		this.div_03 = new soc02_facebook_div_peloncita()
		this.content += this.div_03.code
	}

	check_loaded_right() {
		this.compo_right = new cn01_base(this.thm.u, "right", this.thm.method_to_load)

		if ((this.compo_right.loaded == "no_generated" ) || 
			(this.thm.u.search_method == "reload")		) 
			{
				this.class = "col-md-3 col-lg-2-point-5 social-right"
				this.create_div_01()
				this.create_div_03()
				this.pcreate()
				this.compo_right.load_type_details(this.code)
			}

		this.code = this.compo_right.code
	}

	build_data() 
	{
		this.check_loaded_right()
	}

}

