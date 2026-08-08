// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// [ 01 - 0n - 0n ] Node Js - Anode Generate Load from Disk Class  [V.0.0.2]  (2018-01-21)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [EA6_COMMON]
//-------------------------------------------------------------------------------------
// Drupal Details Filesystem Type - independent of drupal
//-------------------------------------------------------------------------------------
// Inheritance Line [Inner Level 21]
// *anode_generate_load_from_disk > Anodes > Definitions 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: c-anode_generate_load_from_disk-
//-------------------------------------------------------------------------------------
// Defined methods
//-------------------------------------------------------------------------------------
// d-generate_load_from_disk_path-	: Save node or drupal or disk
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 								= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

const 	{ anode_get_element_properties } 	= require(	path.join(JS_BASE, 'com/objects/drupal/anode/an8/an81_get_element_properties.es6')))

class anode_generate_load_from_disk  extends anode_get_element_properties {

	constructor()
	{
		super()
		this.n						= 	'an80_generate_load_from_disk::'				    		
		
	}
            


	// -------------------------- GENERATE_LOAD_FROM_DISK_PATH -------------------------- 
	generate_load_from_disk_path()
	{
		this.m 						=	'generate_load_from_disk_path'							
		this.n						= 	'an80_generate_load_from_disk::'				    		

		let base_path				=	this.s.base_path
		
		if (this.suffix_code == '' ) 	this.suffix_code = '_code'												

		if ( this.node_id < 100000 )	this.nid_divs = '0' + this.node_id.substr(0,2) + this.sp + this.node_id.substr(2,3)  
		else  						    this.nid_divs = this.node_id.substr(0,3) + this.sp + this.node_id.substr(3,3) 

		// Base path allways finish in bar
		if (base_path.substr(-1) != '/' )   base_path += this.sp					

		// /brqx/pers/drupal/v50/fnode/
		// this.p('BasePath ' + base_path)

		if (this.b.type_common)
		{

			// /brqx/pers/drupal/v50/fnode/  - flat/pages/page/front.dat
			
			this.load_from_disk_path		=	base_path		+ this.s.name +  this.change +  this.suffix_disk							
			this.load_from_disk_path_code	=	base_path		+ this.s.name +  this.change +  this.suffix_code							
			this.load_from_disk_lang		=	base_path		+ this.s.name +  this.change +  this.suffix_lang							
			this.load_from_disk_lang_code	=	base_path		+ this.s.name +  this.change +  this.suffix_code							

			// /brqx/pers/drupal/v50/fnode/truck/fnode/site_structure/site_common
			// this.p('an80_Com_Path : ' + this.s.name + ' ' + this.change + ' ' + this.load_from_disk_path)
			// this.p('an80_Com_Lang : ' + this.type_name + ' ' + this.load_from_disk_lang)
			// this.p('an80_Com_Code : ' + this.type_name + ' ' + this.load_from_disk_path_code)


		}
		else
		{
			// this.p('LOAD_TYPE_NO_COMMON ' + this.type_name)																			
			if  ((this.type_name != 'page' 			) && 
				 (this.type_name != 'nonid_page' 	) && 
				 (this.type_name != 'disk_page' 	)  )  
			{
				com_load_from_disk_path	=	base_path		+ this.s.name + '/nids/n' + this.nid_divs + this.sp	

				this.load_from_disk_path  	 	= 	com_load_from_disk_path + this.type_name + this.suffix_disk			
				this.load_from_disk_path_code  	= 	com_load_from_disk_path + this.type_name + this.suffix_code			

				this.load_from_disk_lang  		 = 	com_load_from_disk_path + this.type_name + this.suffix_lang			
				this.load_from_disk_lang_code  = 	com_load_from_disk_path + this.type_name + this.suffix_code			

			}
			else
			{
				// this.p ('Base_Path_Aa ' + base_path)	
				// ACTIVADA GESTION DE URLS MULTIPLE SOLO EN LAS PAGINAS
				
				this.load_from_disk_path		=	base_path		+ this.s.name + '/pages' +  this.change +  this.u.url_parameter_type + '_' + this.suffix_disk		
				this.load_from_disk_path_code	=	base_path		+ this.s.name + '/pages' +  this.change +  this.u.url_parameter_type + '_' + this.suffix_code		

				this.load_from_disk_lang		=	base_path		+ this.s.name + '/pages' +  this.change +  this.u.url_parameter_type + '_' + this.suffix_lang		

				this.load_from_disk_lang_code	=	base_path		+ this.s.name + '/pages' +  this.change +  this.u.url_parameter_type + '_' + this.suffix_code		

				// this.p('an80_SPc_Path : ' + this.type_name + ' ' + this.load_from_disk_path)
				// this.p('an80_SPc_Lang : ' + this.type_name + ' ' + this.load_from_disk_lang)
				// this.p('an80_SPc_Code : ' + this.type_name + ' ' + this.load_from_disk_path_code)

			}

		}
	}

  
}


exports.anode_generate_load_from_disk = anode_generate_load_from_disk