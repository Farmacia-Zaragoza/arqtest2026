//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Inode01 Path Class  [V.0.1.8]  (2017-08-23)
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


const	{ inode } 				= 	require(	path.join(JS_BASE, 'com/objects/drupal/node/inode.ea6'),
		const { cbool }				= 	require( 	path.join(JS_BASE, 'com/objects/drupal/bool/b01_bool.es6'));

class in01_path extends inode {

	constructor(	fnode 					= ""							,
					resolutions_to_generate = ""							,
					glob_file_search 		= "noglob"						,
					img_type_save 			= "path"						,
					stype 					= "cica_image"					)
	{
		super()
		this.n 					= "in01_path::"

		this.fnode 				= fnode
		this.u 					= fnode.u
		this.s 					= this.u.s
		this.b 					= new cbool()
		this.b.copy(this.s.b)

		this.c 					= this.s.c


		this.resolutions_to_generate 			= resolutions_to_generate
		this.type 								= "inode_path"
		this.short_type 						= "INP"
		this.glob_method 						= glob_file_search
		this.img_type_save 						= img_type_save

		if (this.resolutions_to_generate == "")
			this.resolutions_to_generate = "2560x1920 1024x0768 1280x0960 0884x0663 0640x0480 0442x0332 0320x0240 0082x0062 0041x0031"

		var arrays_line = resolutions_to_generate + " " + this.s.img_base_resolution
		this.arr['resolutions_to_generate'] = resolutions_to_generate.split(" ")
		this.arr['res'] = arrays_line.split(" ")

		var array_multi_line = "sim sur sko sfu rim rur rfu"
		this.arr['mty'] = array_multi_line.split(" ")

		var array_line = array_multi_line + " " + "res oim mty rko qty img-type"

		// this.p('ARRAY_LINE '+ array_line )

		this.arr['types'] = array_line.split(" ")

		this.type 								= stype
		this.ntype 								= "img"
		this.stype 								= stype
		this.type_name 							= this.stype

		this.b.type_user 						= false
		this.b.type_common 						= true
		this.b.type_human 						= false

		this.b.type_translation 				= false
		this.b.type_translated 					= false
		this.b.type_ssl 						= false
		this.b.type_have_taxonomy 				= false
		this.b.type_have_code 					= false

		this.b.type_have_properties 			= true
		this.b.type_have_specific_properties 	= true
	}

	// ------------------------------- RELOAD CONTENTS -----------------------------------
	reload_contents(original_image_url_path = "")
	{
		for (var pos in this.arr['oim'])  		this.arr['oim'].splice(pos,1)
		for (var pos in this.arr['oic'])  		this.arr['oic'].splice(pos,1)
		for (var pos in this.arr['rko']) 	 	this.arr['rko'].splice(pos,1)
		for (var pos in this.arr['rfu'])  		this.arr['rfu'].splice(pos,1)
		for (var pos in this.arr['sfu']) 		this.arr['sfu'].splice(pos,1)
		for (var pos in this.arr['properties']) this.arr['properties'].splice(pos,1)


		this.original_image_url_path = original_image_url_path

		// 4s
		this.create_image_name()

		// this.p('In01_Image_Name ' + this.image_name)

		this.change = "/" + this.ntype + "/" + this.img_type_save + "/"
		this.suffix = this.image_name + "_" + this.u.ssl_page + "_" + this.stype + ".img"

		this.suffix_disk = this.suffix
		this.suffix_lang = this.suffix
		this.suffix_code = this.suffix_lang + ".code"

		this.generate_load_from_disk_path()

		// /brqx/pers/drupal/v50/fnode/truck/img/path/transportes_lucas_rivera_gondolas_transport_truck_madrid_spain_2017_-_0010_ssl_cica_image.img
		// /brqx/pers/drupal/v50/fnode/truck/img/path/_ssl_cica_image.img
		// this.p('In01_Image_Path ' + this.load_from_disk_path)
		// this.p('In01_Image_Code ' + this.load_from_disk_path_code)


		if (this.s.load == "drupal")
		{
			this.run_from_drupal()
		}
		else
		{
			this.run_from_disk()
			//create_paths - get_current_properties_from_disk
		}
	}

	// ------------------------------- GET_CHILD_PROPERTIES -----------------------------------
	get_child_properties(prop, value)
	{
		if 		(prop == "name") 		this.image_name = value
		else if (prop == "type") 		this.img_type_save = value

		else if (prop == "name_clean") 	this.img_name_clean = value
		else if (prop == "width") 		this.width = value
		else if (prop == "height") 		this.height = value
		else if (prop == "relation") 	this.relation = value
		else if (prop == "orientation") this.orientation = value
		else if (prop == "is_vertical") this.is_vertical = value
		else if (prop == "quality") 	this.quality = value
		else if (prop == "img-type") 	this.img_type = value
	}

	load_child_details()
	//Si no hay cache debe regnerarlos siempre
	{
		if (this.s.load == "drupal" 		||
		   (!this.b.site_cache 				||
		   	this.special_reload_ram("INP") || this.special_reload_disk("INP"))
		   )
			{
				// this.p('ENTER_IN_IMGASSS')
				this.get_current_imgs()
				// call to create_resolution_img_no_glob | glob

			}
	}


	prepare_specific_child_properties() //Generate properties array
	{
		this.arr['properties'].push("name" 			+ 	this.sep + this.image_name)
		this.arr['properties'].push("type" 			+ 	this.sep + this.img_type_save)
		this.arr['properties'].push("name_clean" 	+ this.sep + this.img_name_clean)
		this.arr['properties'].push("width" 		+ this.sep + this.width)
		this.arr['properties'].push("height" 		+ this.sep + this.height)
		this.arr['properties'].push("relation" 		+ this.sep + this.relation)
		this.arr['properties'].push("orientation" 	+ this.sep + this.orientation)
		this.arr['properties'].push("is_vertical" 	+ this.sep + this.is_vertical)
		this.arr['properties'].push("quality" 		+ this.sep + this.quality)
		this.arr['properties'].push("img_type" 		+ this.sep + this.img_type)
	}

}

exports.in01_path = in01_path
