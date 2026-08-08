//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Search Node Class  [V.0.2.1]  (2017-01-05)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [PHP_COMMON]
//-------------------------------------------------------------------------------------
//Fast page search - Replace Mysql connections
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- linking_to_ram     		: Update file && linking to ram
//- prepare_properties			: Update common properties
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const	{ anode } 				= 	require(path.join(JS_BASE, 'com/objects/drupal/anode/an0/an01_obj.es6'))

class snode extends anode {
	constructor() {
		super()
		this.n = "snode::"
	}

	linking_to_ram_anon() 
	//5. Actulizamos en RAM - Hay que revisarlo
	//6. Generate Alias - No conoce ram_path o ssh_path puesto que drupal no se ha cargado
	{
		this.current_file_to_use = this.ram_alias_path
		this.current_file_to_use_source = this.ssd_alias_path

		if (this.b.site_lang) {
			this.current_file_to_use = this.ram_alias_lang
			this.current_file_to_use_source = this.ssd_alias_lang
		}

		create_folder_filename(this.current_file_to_use)
		copy_full_filename(this.current_file_to_use_source, this.current_file_to_use)
		this.current_file_to_use = this.ram_alias_code_path
		this.current_file_to_use_source = this.ssd_alias_code_path

		if (this.b.site_lang) {
			this.current_file_to_use = this.ram_alias_code_lang
			this.current_file_to_use_source = this.ssd_alias_code_lang
		}

		copy_full_filename(this.current_file_to_use_source, this.current_file_to_use)
	}

	linking_to_ram_auth() 
	{
		this.current_file_to_use = this.ram_path
		this.current_file_to_use_source = this.ssd_path

		if (this.b.site_lang) {
			this.current_file_to_use = this.ram_lang
			this.current_file_to_use_source = this.ssd_lang
		}

		copy_full_filename(this.current_file_to_use_source, this.current_file_to_use)
		this.current_file_to_use = this.ram_code_path
		this.current_file_to_use_source = this.ssd_code_path

		if (this.b.site_lang) {
			this.current_file_to_use = this.ram_code_lang
			this.current_file_to_use_source = this.ssd_code_lang
		}

		copy_full_filename(this.current_file_to_use_source, this.current_file_to_use)
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

	prepare_properties() 
	{
		this.arr['properties'].num_results = "s_num_results" + this.sep + this.num
	}

}

exports.snode = snode
