//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Delete Node Class  [V.0.1.7]  (2016-12-27)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Fast Delete Page load - Replace Mysql connections
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods: Pendiente de revisar
//-------------------------------------------------------------------------------------
//- delete_files_from_ssd_and_ram_anon | auth : Delete | Unlink files
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

class dnode {
	constructor() //2. Invoca al hijo para eliminar los ficheros
	{
		this.type = "dnode"
		this.sep = "@"
		this.delete_current_properties()
	}

	delete_files_from_ssd_and_ram_anon() 
	//5. Actulizamos en RAM
	//Esto ha cambiado. Ya no se usa U para eso. Faltara actualizar tambien a multi idioma
	{
		this.current_file_to_use = this.load_from_disk_path_code
		if (this.b.site_lang) this.current_file_to_use = this.load_from_disk_lang_code
		delete_if_exist_full_filename(this.u.ssd_path_anon)
		delete_if_exist_full_filename(this.u.ssd_code_path_anon)
		delete_if_exist_full_filename(this.u.ram_alias_path_anon)
		delete_if_exist_full_filename(this.u.ram_alias_code_path_anon)
		delete_if_exist_full_filename(this.u.ram_path_anon)
		delete_if_exist_full_filename(this.u.ram_code_path_anon)
	}

	delete_files_from_ssd_and_ram_auth() //5. Actulizamos en RAM
	{
		delete_if_exist_full_filename(this.u.ssd_path_auth)
		delete_if_exist_full_filename(this.u.ssd_code_path_auth)
		delete_if_exist_full_filename(this.u.ram_alias_path_auth)
		delete_if_exist_full_filename(this.u.ram_alias_code_path_auth)
		delete_if_exist_full_filename(this.u.ram_path_auth)
		delete_if_exist_full_filename(this.u.ram_code_path_auth)
	}

}

exports.dnode = dnode
