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

class fn07_linea_menu extends fnode {

	constructor(nid_object = "", u = "", nid_id = "", position_id = "", stype = "linea_menu") 
	{
		super()
		this.n = "fn07_linea_menu::"

		this.page_position = nid_object.arr.position[position_id]
		this.b = new bool()
		this.u = u
		this.s = this.u.s
		this.c = this.u.c
		this.b.copy(this.s.b)
		this.node_id = nid_object.arr.nid[nid_id]
		this.ftype = "fnode"
		this.ntype = "node"
		this.stype = stype
		this.type_name = this.stype
		this.type = "linea_menu"
		this.short_type = "LMN"
		var arrays_line = "tit url"
		this.arr.types = arrays_line.split(" ")
		this.b.type_common = true
		this.b.type_have_taxonomy = false
		this.b.type_have_code = false
		this.b.type_have_properties = true
		this.b.type_have_specific_properties = true
		this.change = "/" + this.ntype + "/" + this.stype + "/"
		this.suffix = "zone" + this.page_position + "_" + this.node_id
		this.suffix_disk = this.suffix
		this.suffix_code = this.suffix + "_code" + ".lmenu"
		this.generate_load_from_disk_path()

		if (this.s.load == "drupal") {
			this.run_from_drupal()
		} else {
			this.run_from_disk()
		}
	}

	get_child_properties(prop, value) //Tenemos un metodo comun para todos los tipos con title - type - path y los arrays
	//Luego cada tipo tendra un ajuste como este
	{
		if (prop == "encabezado") this.encabezado = value
		else if (prop == "nom_parraf") this.nombre_parrafada = value
	}

	load_child_details() {
		if (this.s.load == "drupal") {
			this.load_multi_fields("field_lista_enlace_%02d", "tit_url", "title_url", 10)
		}
	}

	prepare_specific_child_properties() {
		this.arr.properties.push("encabezado" + this.sep + this.encabezado)
		this.arr.properties.push("nom_parraf" + this.sep + this.nombre_parrafada)
	}

}

