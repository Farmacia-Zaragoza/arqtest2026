//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Page Node Simiple Class  [V.0.1.7]  (2016-11-24)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- build_node       : Load all drupal node details
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Para poder extender debe haberse incluido antes

class pn01_simple extends psimple {
	constructor() {
		super(...arguments);
		this.n = "pn01_simple::";
	}

	constructor(u = "", drupal_content = "", supermnu_dats = "", stype = "page") //Page type human bots
	//Normal Page
	//Page type human bots
	//Subtype
	//Las paginas no tienen sufijo pues van a tener ya la uri
	//$this->method_to_load 	=	'disk' 														;
	//Method for disk load && to generate && save content
	//$this->p('PSimple_DIS ' . $this->load_from_disk_path)									;
	///brqx/pers/drupal/v50/fnode/peloncita/pages/page/front.dat
	//$this->p('DIS ' . $this->load_from_disk_path   )										;
	//$this->p('RAM ' . $this->ram_alias_path	)												;
	//$this->p('COD ' . $this->ram_alias_code_path	)												;
	{
		this.b = new bool();
		this.u = u;
		this.s = this.u.s;
		this.c = this.u.c;
		this.b.copy(this.s.b);
		this.drupal_content = drupal_content;
		this.supermnu_dats = supermnu_dats;
		this.type = "normal_page";
		this.short_type = "NP";
		this.ptype = "human";
		this.stype = stype;
		this.type_name = this.stype;
		this.b.type_common = false;
		this.b.type_have_taxonomy = false;
		this.b.type_have_code = true;
		this.b.type_have_properties = true;
		this.b.type_have_specific_properties = true;
		this.change = "/" + this.stype + "/";
		this.change_disk = "/" + this.stype + "/" + this.ptype + "/";
		this.suffix = this.u.dash_ideal_uri;
		this.suffix_disk = this.u.dash_ideal_uri;
		this.suffix_code = this.suffix + "_code" + ".page";
		this.generate_load_from_disk_path();

		if (this.s.load == "drupal") //create_paths - get_current_properties
			{
				this.run_from_drupal();
			} else //create_paths - get_current_properties_from_disk
			{
				this.run_from_disk();
			}

		this.status = true;
	}

	load_child_details() //RECUERDA - AQUI SOLO ENTRA SI HAY QUE VOLVER A ACTUALIZAR LOS DATOS DE BD | File System
	//$this->p("05 - generando page")																	;
	//Top pelona imagen
	//title - url
	//$this->p('Url ' . $this->thm->u->site_url ) 																;
	//Drupal theme structure
	//$this->code 	= 	'NOCODE';
	{
		var site_title = "Anupam && Ricardo make cica fully responsive posible V04";
		var background_image = "images/Brqx_FondoVariado_300x200_Image11_i.png";
		var top_image = "images/brqx_hozdepriegotajoosa_0512x0192.png";
		var logo_image = "images/brqx_tour_eiffel_logo_04_180_garland.gif";
		var icon_image = "images/brqx_tour_eiffel_logo_04_180_garland.gif";
		this.pg = new page_structure();
		this.thm = new theme_peloncita(this.pg, this.u, this.supermnu_dats, background_image, top_image, logo_image, icon_image, this.drupal_content);
		this.htm = new htm01_html_peloncita(this.thm);
		this.code = this.htm.code;
	}

};

