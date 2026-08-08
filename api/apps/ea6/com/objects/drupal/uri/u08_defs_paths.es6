// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Uri Deffinition Paths Class  [V.0.1.7]  (2016-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"						);

var { uri_defs_common } 		= require(path.join(JS_BASE, 'com/objects/drupal/uri/u09_defs_common.es6'))

class uri_defs_paths extends uri_defs_common {

	constructor()
	{
		super()

		this.n 							= 	'uri_defs_paths::'				

		this.site_path				=	''						 // Server path for domain

		this.theme_path				=	''						 // Server path for domain
					
	// SSD - RAM - Paths

		this.common_path			=	''						
		this.anonymous_path			=	''						
		this.authenticated_path		=	''						
	
		this.ssd_path_auth				=	''						 // Path for ssd node
		this.ssd_path_anon				=	''						 // Path for ssd node
		this.ssd_path_nouser				=	''						 // Path for ssd node
	
		this.ram_path_auth				=	''						 // Path for ram node
		this.ram_path_anon				=	''						 // Path for ram node
		this.ram_path_nouser				=	''						 // Path for ram node
		
		this.ssd_alias_path_auth			=	''						 // Alias to ram path
		this.ssd_alias_path_anon			=	''						 // Alias to ram path
		this.ssd_alias_path_nouser			=	''						 // Alias to ram path
	
		this.ram_alias_path_auth			=	''						 // Alias to ram path
		this.ram_alias_path_anon			=	''						 // Alias to ram path
		this.ram_alias_path_nouser			=	''						 // Alias to ram path

	}  
}

exports.uri_defs_paths = uri_defs_paths
