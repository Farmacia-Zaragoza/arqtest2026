//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.1.7]  (2016-11-24)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Fast image load - Replace Mysql connections
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- build_node       : Load all drupal node details
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const	{ anode } 				= 	require(	cons.JS_BASE + 'com/objects/drupal/anode/an0/an01_obj.es6'	)	
		path					=	require(	'path' 																)	;	


class inode_url extends anode {
		constructor(url_img = "", img_type_save = "path") 
		{
			super()
			this.img_type_save = "path"
			this.type = "img"
			this.img_type_save = img_type_save
			this.url_ssd = url_img
			this.create_urls()
			this.get_current_properties()
		}

		create_urls() 
		{
			var ssd_base_dir = path.resolve("./files")
			var ram_base_dir = path.resolve("./firam")
			var del = "/"
			var foto_name = strrchr(this.url_ssd, del)
			
			// Pendiente de revisar
			var url_relativa 		= parse_url(this.url_ssd, PHP_URL_PATH)
			var ram_url_relativa 	= url_relativa.replace("files/", "", url_relativa)
			var img_name = path.basename(url_relativa)
			this.ssd_path = ssd_base_dir + url_relativa
			this.ram_path = ram_base_dir + ram_url_relativa
			this.file_path = this.ram_path


			this.str.replace(				this.url_ssd	, 		"files/", "firam/")
			var ram_img			=	this.str.result						

			this.str.replace(				ram_img	, 		" ", "_")
			this.img			=	this.str.result						

		}

}

exports.inode_url = inode_url