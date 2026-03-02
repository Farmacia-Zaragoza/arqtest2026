//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Gallery Json Class  [V.0.1.6]  (2016-11-09)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//window.addEventListener('DOMContentLoaded', function() {
//(function($) {
////list view insitialization
//$("#Sendas-pill-middle-tab").tableView({
//url:         "http://cica.dbrqx.com/index2/table_view.json",
//rimg_W_350:  "http://cica.dbrqx.com/index2/structure/rimg_WH/rimg_W_350/",
//rimg_W_450:  "http://cica.dbrqx.com/index2/structure/rimg_WH/rimg_W_450/",
//rimg_W_500:  "http://cica.dbrqx.com/index2/structure/rimg_WH/rimg_W_500/",
//rimg_W_700:  "http://cica.dbrqx.com/index2/structure/rimg_WH/rimg_W_700/",
//rimg_W_900:  "http://cica.dbrqx.com/index2/structure/rimg_WH/rimg_W_900/",
//rimg_W_1000: "http://cica.dbrqx.com/index2/structure/rimg_WH/rimg_W_1000/",
//});
//})(jQuery);
//});
//-------------------------------------------------------------------------------------
//SCRIPT
//JQUERY CODE
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class gal01_script_jquery extends html_style {

		constructor(vnode = "", jnode) 
		{
				this.n = "gal01_mid::";
				this.arr_resolutions = [];
				this.arr_folders = [];

				this.tag_type = "script";
				this.vnode = vnode;
				this.jnode = jnode;
				super.constructor(this.tag_type);
				this.arr_resolutions = vnode.arr.res;
				this.arr_folders = vnode.arr.rfu;
				this.j = new jquery_tag();
				this.build_data();
		}

		clean_objects() {
				this.clean();
		}

		create_code() 
		{
				var url = this.jnode.ram_alias_code_url;
				this.j.add_pair("url", url);

				for (var resolution of Object.values(this.arr_resolutions)) 
				{
						var folder = this.arr_folders[resolution];
						var short_res = resolution.substr(0, 4);
						this.j.add_pair("rimg_W_" + short_res, folder);
				}

				this.j.dolar_almocreate("Imagenes_middle00-pill-tab");
				this.j.content = this.j.code;
				this.j.listener_create("DOMContentLoaded");
				this.content = this.j.code;
				this.pcreate();
		}

		build_data() 
		{
				this.content = "";
				this.create_code();
				this.jnode.jquery_code = this.code;
		}

};

exports.gal01_script_jquery = gal01_script_jquery