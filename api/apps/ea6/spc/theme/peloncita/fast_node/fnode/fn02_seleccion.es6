//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Html Div Class  [V.0.1.7]  (2016-11-24)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- d-get_child_properties-  				: Get specific child properties
//- d-load_child_details-    				: Recover from drupal child properties
//- d-prepare_specific_child_properties- 	: Prepare properties to save in array
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Para poder extender debe haberse incluido antes

class fn02_seleccion extends fnode {

	constructor(nid = "", page_position = "_middle", fnode = "", stype = "cica_seleccion") 
	{
		super()
		this.n = "fn02_seleccion::"

		this.page_position = page_position
		this.u = fnode.u
		this.method_to_load = this.u.method_to_load
		this.site_name = this.u.site_name
		this.site_url = this.u.site_url
		this.node_id = nid
		this.ftype = "fnode"
		this.ntype = "node"
		this.stype = stype
		this.type_name = this.stype
		this.type = "seleccion"
		this.short_type = "SEL"
		this.b.type_common = false
		this.b.type_have_taxonomy = true
		this.b.type_have_code = false
		this.b.type_have_properties = true
		this.b.type_have_specific_properties = true
		this.change = "/" + this.ftype + "/" + this.ntype + "/" + this.stype + "/"
		this.suffix = "sel_" + this.node_id
		this.suffix_disk = this.suffix
		this.suffix_code = this.suffix + "_code" + ".selection"
		this.generate_load_from_disk_path()
		var arrays_tax_line = "tna tid tpa"
		this.arr.tax_types = arrays_tax_line.split(" ")

		if (this.s.load === "drupal") {
			this.run_from_drupal()
		} else {
			this.run_from_disk()
		}
	}

	get_child_properties(prop, value)
	{
		if (prop == "date") this.date = value
		else if (prop == "img_folder") this.img_folder = value
		else if (prop == "img_url_folder") this.img_url_folder = value
		else if (prop == "view_miniper_name") this.view_minivista_personal_name = value
		else if (prop == "view_iliper_name") this.view_ilista_personal_name = value
		else if (prop == "view_minimag_name") this.view_minivista_imagenes_name = value
		else if (prop == "view_sendper_name") this.view_senda_personal_name = value
		else if (prop == "view_miniper_args") this.view_minivista_personal_args = value
		else if (prop == "view_iliper_args") this.view_ilista_personal_args = value
		else if (prop == "view_minimag_args") this.view_minivista_imagenes_args = value
		else if (prop == "view_sendper_args") this.view_senda_personal_args = value
	}

	load_child_details() {
		if (this.s.load == "drupal") 
			{
				this.date = this.details.field_fecha[0].value.substr(2, 8)
				this.img_folder = this.details.field_img_folder[0].value
				this.img_url_folder = this.details.field_img_url_folder[0].value
				this.view_minivista_personal = this.details.field_minivista_personal[0]
				this.view_minivista_personal_name = this.view_minivista_personal.vname
				this.view_minivista_personal_args = this.view_minivista_personal.vargs
				this.view_ilista_personal = this.details.field_ilista_personal[0]
				this.view_ilista_personal_name = this.view_ilista_personal.vname
				this.view_ilista_personal_args = this.view_ilista_personal.vargs
				this.view_minivista_imagenes = this.details.field_minivista_imagenes[0]
				this.view_minivista_imagenes_name = this.view_minivista_imagenes.vname
				this.view_minivista_imagenes_args = this.view_minivista_imagenes.vargs
				this.view_senda_personal = this.details.field_senda_personal_0320[0]
				this.view_senda_personal_name = this.view_senda_personal.vname
				this.view_senda_personal_args = this.view_senda_personal.vargs
				this.encabezado = this.details.title
			}
	}

	prepare_specific_child_properties() //
	{
		this.arr.properties.push("date" + this.sep + this.date)
		this.arr.properties.push("img_folder" + this.sep + this.img_folder)
		this.arr.properties.push("img_url_folder" + this.sep + this.img_url_folder)
		this.arr.properties.push("view_miniper_name" + this.sep + this.view_minivista_personal_name)
		this.arr.properties.push("view_iliper_name" + this.sep + this.view_ilista_personal_name)
		this.arr.properties.push("view_minimag_name" + this.sep + this.view_minivista_imagenes_name)
		this.arr.properties.push("view_sendper_name" + this.sep + this.view_senda_personal_name)
		this.arr.properties.push("view_miniper_args" + this.sep + this.view_minivista_personal_args)
		this.arr.properties.push("view_iliper_args" + this.sep + this.view_ilista_personal_args)
		this.arr.properties.push("view_minimag_args" + this.sep + this.view_minivista_imagenes_args)
		this.arr.properties.push("view_sendper_args" + this.sep + this.view_senda_personal_args)
		this.arr.properties.push("encabezado" + this.sep + this.encabezado)
		this.load_taxonomy()
	}

}
