//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Composition Fast Node Class  [V.0.1.7]  (2016-12-27)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
//Fast Composite Page load - Replace Mysql connections
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- linking_to_ram     		: Update file and linking to ram
//- save_node    				: Save new node checking
//- force_save_node    		: Save node
//- prepare_properties			: Update common properties
//- save_properties_to_file 	: Save properties to file
//- save_code_to_file		 	: Save code to file
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const	{ anode } 				= 	require(	path.join(JS_BASE, 'com/objects/drupal/anode/an0/an01_obj.es6'))	

class pcomp extends anode {
	constructor() {
		super()
		this.n = "pcomp::"
	}

	linking_to_ram() //6. Generate Alias
	//print "pcomp - link_ram " . $this->ram_code_path . ' to ' . $this->ram_alias_code_path . '<br>'
	//print "pcomp - linking_ram " . '<br>'
	//a
	//b
	{
		this.current_file_to_use = this.ram_alias_path
		this.current_file_to_use_source = this.ram_path

		if (this.b.site_lang) {
			this.current_file_to_use = this.ram_alias_lang
			this.current_file_to_use_source = this.ram_lang
		}

		link_full_filename(this.current_file_to_use_source, this.current_file_to_use)
		this.current_file_to_use = this.ram_alias_code_path
		this.current_file_to_use_source = this.ram_code_path

		if (this.b.site_lang) {
			this.current_file_to_use = this.ram_alias_code_lang
			this.current_file_to_use_source = this.ram_code_lang
		}

		link_full_filename(this.current_file_to_use_source, this.current_file_to_use)
	}

	delete_files_from_ssd_and_ram_anon() 
	{
		this.current_file_to_use = this.ssd_path
		this.current_file_to_use_source = this.ssd_code_path

		if (this.b.site_lang) {
			this.current_file_to_use = this.ssd_lang
			this.current_file_to_use_source = this.ssd_code_lang
		}

		delete_if_exist_full_filename(this.current_file_to_use)
		delete_if_exist_full_filename(this.current_file_to_use_source)
		this.current_file_to_use = this.ram_alias_path
		this.current_file_to_use_source = this.ram_alias_code_path

		if (this.b.site_lang) {
			this.current_file_to_use = this.ram_alias_lang
			this.current_file_to_use_source = this.ram_alias_code_lang
		}

		delete_if_exist_full_filename(this.current_file_to_use)
		delete_if_exist_full_filename(this.current_file_to_use_source)
		this.current_file_to_use = this.ram_path
		this.current_file_to_use_source = this.ram_code_path

		if (this.b.site_lang) {
			this.current_file_to_use = this.ram_alias_lang
			this.current_file_to_use_source = this.ram_lang
		}

		delete_if_exist_full_filename(this.current_file_to_use)
		delete_if_exist_full_filename(this.current_file_to_use_source)
	}

	delete_files_from_ssd_and_ram_auth() 
	{
		this.current_file_to_use = this.ssd_path
		this.current_file_to_use_source = this.ssd_code_path

		if (this.b.site_lang) {
			this.current_file_to_use = this.ssd_lang
			this.current_file_to_use_source = this.ssd_code_lang
		}

		delete_if_exist_full_filename(this.current_file_to_use)
		delete_if_exist_full_filename(this.current_file_to_use_source)
		this.current_file_to_use = this.ram_alias_path
		this.current_file_to_use_source = this.ram_alias_code_path

		if (this.b.site_lang) {
			this.current_file_to_use = this.ram_alias_lang
			this.current_file_to_use_source = this.ram_alias_code_lang
		}

		delete_if_exist_full_filename(this.current_file_to_use)
		delete_if_exist_full_filename(this.current_file_to_use_source)
		this.current_file_to_use = this.ram_path
		this.current_file_to_use_source = this.ram_code_path

		if (this.b.site_lang) {
			this.current_file_to_use = this.ram_lang
			this.current_file_to_use_source = this.ram_code_lang
		}

		delete_if_exist_full_filename(this.current_file_to_use)
		delete_if_exist_full_filename(this.current_file_to_use_source)
	}

	prepare_properties(fich = "") //Pending to check
	{
		this.arr['properties'].push("c_gen" + this.sep + this.code_generated)
	}

}

exports.pcomp = pcomp
