//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Fast node CicaList Class  [V.0.1.7]  (2016-11-24)
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

class fn05_cica_list extends fnode {

	constructor(nid_object = "", u = "", nid_id = "", datcontent_id = "", position_id = "", stype = "cica_list") 
	{
		super()
		this.n = "fn05_cica_list::"

		this.page_position = nid_object.arr.position[position_id]
		this.dat_contents = nid_object.arr.datcontent[datcontent_id]
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
		this.type = "middle_slider"
		this.short_type = "MS"
		var arrays_line = "sta typ id"
		this.arr.types = arrays_line.split(" ")
		this.b.type_common = true
		this.b.type_have_taxonomy = false
		this.b.type_have_code = false
		this.b.type_have_properties = true
		this.b.type_have_specific_properties = true
		this.change = "/" + this.ntype + "/" + this.stype + "/"
		this.suffix = "zone" + this.page_position + "_" + this.node_id
		this.suffix_disk = this.suffix
		this.suffix_code = this.suffix + "_code" + ".list"
		this.generate_load_from_disk_path()

		if (this.s.load == "drupal") {
			this.run_from_drupal()
		} else {
			this.run_from_disk()
		}
	}

	get_child_properties(prop, value) //Tenemos un metodo comun para todos los tipos con title - type - path y los arrays
	//Pendiente de revisar
	{
		if (prop == "ntype") this.node_type = value
		else if (prop == "stype") this.stype = value
		else if (prop == "dtype") this.dtype = value
		else if (prop == "img_folder") this.img_folder = value
		else if (prop == "img_url_folder") this.img_url_folder = value
	}

	load_child_details() //Load from drupal or disk
	{
		if (this.s.load == "drupal") 
			{
				this.load_one_field("field_status_blk_slider_%02d", "sta", "value", 10)
				this.load_one_field("field_id_blk_slider_%02d", "id", "value", 10)

				for (var elem of Object.values(this.arr.id)) {
					var mynode = node_load(elem)
					this.arr.typ.push(mynode.type)
				}

				this.arr.properties.push("img_folder" + this.sep + this.img_folder)
				this.arr.properties.push("img_url_folder" + this.sep + this.img_url_folder)
			}
	}

}
