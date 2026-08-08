//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js - Compression Classs  [V.0.2.0]  (2016-12-11)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
//Fast view load - Replace Mysql connections -- PENDIENTE DE IMPLEMENTAR
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data   	  : Build html final code for object
//- build_node       : Load all drupal node details
//- create_div_NN    : Create div_NN   dhtml object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

class pcompress_pending {
	constructor(user_uid = 0) 
	{
		this.type = "page";
		this.ptype = "human";
		this.dash_alias_url = "";
		this.dash_real_url = "";
		this.user_is_logged = "0";
		this.sep = "@";
		this.ptype = "page";
		this.ptype = "human";
		this.user_is_logged = user_uid;
		this.create_paths();
		this.get_current_properties();
	}

	create_paths() 
	{
		var base_dir = realpath(".");
		var site_url_sin_barra = !!_SERVER.HTTPS ? "https://" + _SERVER.SERVER_NAME : "http://" + _SERVER.SERVER_NAME;
		var del = "/";
		var string_from_bar = strrchr(site_url_sin_barra, del);
		var normal_url = string_from_bar;

		// PENDIENTE - Es una funcion Php
		this.str.replace(				_GET.q	, 		"/", "_")
		this.dash_real_url			=	this.str.result						


		// PENDIENTE

		this.str.replace(				SERVER.REQUEST_URI	, 		"/", "_")
		var dasurl				=	this.str.result						


		if (dasurl == "_") this.dash_alias_url = "front";
		else 
			{
				var puting_contents = "Pnode:noeshome:" + this.dash_alias_url + ":>";
				GLOBALS.putcont += puting_contents;
				setlocale(LC_ALL, "en_US.utf8");
				var dasclean = iconv("utf-8", "ascii//TRANSLIT", dasurl);
				dasurl = dasclean.toLowerCase();
				this.dash_alias_url = dasurl.substr(1, dasurl.length);
			}
		this.ssd_path = base_dir + "/" + "cache" + normal_url + "/" + this.type + "/" + this.ptype + "/u_" + this.dash_real_url;
		this.ssd_alias_path = base_dir + "/" + "cache" + normal_url + "/" + this.type + "/" + this.ptype + "/a_" + this.dash_alias_url;
		
		this.str.replace(				this.ssd_path	, 		"ssd", "ram")
		this.ram_path			=	this.str.result						

		// Pending to review
		this.ram_path = replace("ssd", "ram", this.ssd_path);
		this.ram_alias_path = replace("ssd", "ram", this.ssd_alias_path);

		this.ssd_code_path = this.ssd_path + "_code";
		this.ram_code_path = this.ram_path + "_code";

		this.ram_real_path_compress = this.ram_path + ".zip";
		this.ram_alias_path_compress = this.ram_alias_path + ".zip";
		this.ram_real_code_path_compress = this.ram_code_path + ".zip";
		this.ram_alias_code_path_compress = this.ram_alias_path + ".zip";
		this.ram_code_path_extracted = this.ram_alias_path + "_extract";

		puting_contents = "Pnode:compress_path " + this.ram_real_code_path_compress + ">";
		GLOBALS.putcont += puting_contents;
	}

	save_node() 
	{
		if (file_exists(this.ssd_path)) //7. Generate Alias
			{
				zip(this.ram_real_path_compress, this.ssd_path);
				zip(this.ram_real_code_path_compress, this.ssd_code_path);
				symlink(this.ram_real_path_compress, this.ram_alias_path_compress);
				symlink(this.ram_real_code_path_compress, this.ram_alias_code_path_compress);
			} else //b. Segundo caso. No existe en SSD. Se copia a RAM y repetimos carga
			{
				this.force_save_node();
			}
	}

	force_save_node() 
	{
		this.load_type_details();
		create_folder_filename(this.ssd_path);
		this.save_properties_to_file(this.ssd_path);
		zip(this.ram_real_path_compress, this.ssd_path);
		zip(this.ram_real_code_path_compress, this.ssd_code_path);
		symlink(this.ram_real_path_compress, this.ram_alias_path_compress);
		symlink(this.ram_real_code_path_compress, this.ram_alias_code_path_compress);
	}

	load_details() //Load only in new files
	{}

	prepare_properties(fich = "") {
		this.arr['properties'].push("u_real" + this.sep + this.dash_real_url);
		this.arr['properties'].push("u_alias" + this.sep + this.dash_alias_url);
		this.arr['properties'].push("u_user" + this.sep + this.user_is_logged);
	}

	save_properties_to_file(fich = "") //Saving block code
	{
		if (fich != "") this.ssd_path = fich;
		update_full_filename_with_array(this.ssd_path, this.arr.properties);
		create_update_full_filename(this.ssd_code_path, this.code);
	}

};

