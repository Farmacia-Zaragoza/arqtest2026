// [DOCHANGED_NODE]
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Node Js - Site Class  [V.0.1.4]  (2018-01-06)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [COMMON-EA6]
//-------------------------------------------------------------------------------------
//Fast node load - Replace Mysql connections - Taxonomy Class
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- d-pending-   	  : Set urls to be cacheable for anonymous user
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"				);

const 	{ site_defs } 		= 	require(	cons.JS_BASE + 'com/objects/drupal/site/s02_site_defs.es6'		);

class site extends site_defs {
	constructor(c = "", 
				load 				= "disk", 
				lang 				= "es", 
				allowed_langs 		= "es en de it fr pt ja zh hi sp in ca ru uk bn"	, 
				allowed_commands 	= "list gal page product cookies hola"				, 
				folder_dat 			= ""												) 
	{
		// Ojo que esta pillando los comandos de aqui no del site. Hay que revisarlo

		super()
		
		this.n 							= "site::"
		this.c 							= c
		this.b 							= this.c.b
		this.u 							= this.c.u

		this.load 						= load
		this.default_lang 				= lang
		this.folder_dat 				= folder_dat
		
		this.allowed_langs 				= allowed_langs
		this.allowed_commands 			= allowed_commands
		
		this.arr['allowed_langs'] 		= this.allowed_langs.split(" ")
		this.arr['allowed_commands'] 	= this.allowed_commands.split(" ")
		
	}

	f_theme(name = "truck", theme = "truck") 
	{
		this.name 		= 	name
		this.theme 		= 	theme
	}

	f_sync(sync_to = "", sync_from = "") 
	{
		this.sync_to 	= 	sync_to
		this.sync_from 	= 	sync_from
	}

	manage_params()
	{
		// Manage string parameters

		this.name 		= 	this.pmt.site_name
		this.theme 		= 	this.pmt.theme_name
		
		this.base_path	=	this.pmt.base_path

		this.slan		=	this.pmt.slan
		this.robot		=	this.pmt.robot

		// Environment - Entorno [DEV - LIVE]
		this.env 		= 	this.pmt.env

		// Live Options - Script - Minimized - Inline
		this.live_opt	= 	this.pmt.live_opt

		if ( this.b.site_live )
		{		
			if 			( this.live_opt === 'script')
				this.b.site_inline = false 
			else if 	( this.live_opt === 'minimized')
				this.b.site_inline = false 
			else if 	( this.live_opt === 'inline')
				this.b.site_inline = true 
			else if 	( this.live_opt === 'inline_and_save')
				this.b.site_inline = true 
		
		}
		
	}

}

exports.site = site