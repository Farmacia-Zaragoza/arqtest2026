//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.2.2]  (2017-01-16)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
// <div class="col-sm-3 col-lg-2-point-5 visits-left" tame="section_div_div_03">
//DIV_PHOTO
//<div class="image-wrapper back_img">
//<img class="b-lazy" data-src="../images/Brqx_Lions_Pelona_320_01.gif"
//DIV_PANEL
//
//Aqui tenemos tres variantes
//<div class="tab_start icons" role="tabpanel"> External
//-------------------------------------------------------------------------------------
// DIV
//DIV
//IMG
//DIV	- External
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)


class sld04_div_peloncita_left extends html_style {

	constructor(thm = "", menu_type_selector = "icons", menu_type_content = "icons") 
	{
		this.n 							= "sld04_div_left::";
		this.num_elements_menu 			= "";
		this.zone 						= "l";

		this.tag_type 					= "div";
		this.menu_type_selector 		= menu_type_selector;
		this.menu_type_content 			= menu_type_content;
		this.thm 						= thm;
		super.constructor(this.tag_type);
		this.fnode 						= this.thm.nid.arr.fnode.region_left;
		this.fnode_01 					= this.thm.nid.arr.fnode.types_lm_left_01;
		this.map 						= this.thm.map + "main_" + this.zone + "iv/";
		this.fnode.map 					= this.map;
		this.fnode_01.map 				= this.map;
		this.fnode.zone = this.zone;
		this.fnode_01.zone = this.zone;
		this.div_d01_p01 = new html_style("div");
		this.div_gotas = new html_style("div");
		this.img_01 = new html_style("img");
		this.div_d01_p02 = new sld03_div_peloncita(this.fnode, this.fnode_01, this.menu_type_selector, this.menu_type_content);
		this.build_data();
	}

	create_div_gotas() {
		this.div_gotas.data_src = this.thm.u.site_url + "resp_images/Brqx_FondoGotas_rosa_100x100.gif";
		this.div_gotas.pcreate();
		this.content += this.div_gotas.code;
	}

	create_div_01() 
	{
		this.img_01.data_src = this.thm.u.site_url + "resp_images/Brqx_Lions_Pelona_320_01.gif";
		this.img_01.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAFCAQAAADMUVVtAAAADklEQVR42mNkQAKMZHAAAQQABuy1MbgAAAAASUVORK5CYII=";
		this.img_01.class = "b-lazy";
		this.img_01.pcreate();
		this.div_d01_p01.content = this.img_01.code;
		this.div_d01_p01.class = "image-wrapper back_img";
		this.div_d01_p01.pcreate();
		this.content += this.div_d01_p01.code;
	}

	create_div_02() /// DIV PANEL
	//$this->content				.=	'DIV_PANEL>'; // $this->div_d01_p02->code			;
	{
		this.content += this.div_d01_p02.code;
	}

	create_div_03() /// DIV TWITTER
	{
		this.div_03 = new soc01_twitter_div_peloncita();
		this.content += this.div_03.code;
	}

	check_loaded_left() {
		this.compo_left = new cn01_base(this.thm.u, "left", this.thm.method_to_load);

		if (
			(this.compo_left.loaded 	== "no_generated"	) || 
			(this.thm.u.search_method 	== "reload"			) || 
			(this.thm.u.search_method 	== "reload_compo"	)
			) 
			{
				this.class = "col-md-3 col-lg-2-point-5 visits-left col-md-pull-6 col-lg-pull-7";
				this.create_div_01();
				this.create_div_02();
				this.create_div_03();
				this.pcreate();
				this.compo_left.load_type_details(this.code);
			}

		this.code = this.compo_left.code;
	}

	build_data() 
	{
		this.check_loaded_left();
	}

};

exports.sld04_div_peloncita_left = sld04_div_peloncita_left