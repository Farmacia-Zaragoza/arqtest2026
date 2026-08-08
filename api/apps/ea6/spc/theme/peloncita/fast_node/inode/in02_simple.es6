//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Inode01 Path Class  [V.0.1.7]  (2016-11-24)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- d-get_child_properties-				: Get child properties for inode
//- d-prepare_specific_child_properties- 	: Load child properties for inode
//- d-build_dimensions-                    : Generate dimensions for photo
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


var	{ inode } 				= 	require(path.join(JS_BASE, 'com/objects/drupal/node/inode.ea6'))

class in02_simple extends inode {

	constructor(original_image_url_path = "", fnode = "", img_type_save = "path", stype = "cica_image")
	{
		super()
		this.n = "in02_simple::"

		this.fnode = fnode
		this.u = fnode.u
		this.b = new bool()
		this.s = this.u.s
		this.c = this.u.c
		this.b.copy(this.s.b)
		this.original_image_url_path = original_image_url_path
		this.img_folder = fnode.img_folder
		this.img_url_folder = fnode.img_url_folder
		this.type = "inode_simple"
		this.short_type = "INS"
		this.img_type_save = img_type_save
		this.ntype = "img"
		this.stype = stype
		this.type_name = this.stype
		this.b.type_common = true
		this.b.type_have_taxonomy = false
		this.b.type_have_code = false
		this.b.type_have_properties = true
		this.b.type_have_specific_properties = true
		this.create_image_name()
		this.change = "/" + this.ntype + "/" + this.img_type_save + "/"
		this.suffix = this.image_name
		this.suffix_disk = this.suffix
		this.suffix_code = this.suffix + "_code" + ".isimple"
		this.generate_load_from_disk_path()

		if (this.s.load == "drupal")
		{
			this.run_from_drupal()
		}
		else
		{
			this.run_from_disk()
		}
	}

	get_child_properties(prop, value)
	{
		if (prop == "name") this.image_name = value
		else if (prop == "type") this.img_type_save = value
		else if (prop == "img_path") this.img_path = value
		else if (prop == "orig_img") this.original_image_url_path = value
		else if (prop == "width") this.width = value
		else if (prop == "height") this.height = value
		else if (prop == "relation") this.relation = value
		else if (prop == "orientation") this.orientation = value
		else if (prop == "is_vertical") this.is_vertical = value
	}

	prepare_specific_child_properties() {
		if (this.s.load == "drupal") {
			this.arr['properties'].push("name" + this.sep + this.image_name)
			this.arr['properties'].push("type" + this.sep + this.img_type_save)
			this.arr['properties'].push("img_path" + this.sep + this.img_path)
			this.arr['properties'].push("orig_img" + this.sep + this.original_image_url_path)
			this.arr['properties'].push("width" + this.sep + this.width)
			this.arr['properties'].push("height" + this.sep + this.height)
			this.arr['properties'].push("relation" + this.sep + this.relation)
			this.arr['properties'].push("orientation" + this.sep + this.orientation)
			this.arr['properties'].push("is_vertical" + this.sep + this.is_vertical)
		}
	}

	load_child_details()
	{
		if (this.s.load == "drupal")
		{
			var arr_url = parse_url(this.original_image_url_path)
			this.img_path = this.u.site_path + arr_url.path
			this.build_dimensions()
		}
	}

}

exports.in02_simple = in02_simple
