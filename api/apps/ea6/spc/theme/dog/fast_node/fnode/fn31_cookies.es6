// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Fast Node Links Class  [V.0.1.7]  (2017-12-17)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-get_child_properties-  				: Get specific child properties
// - d-load_child_details-    				: Recover from drupal child properties
// - d-prepare_specific_child_properties- 	: Prepare properties to save in array
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const	{ fnode } 			= 	require(	path.join(JS_BASE, 'com/objects/drupal/node/fnode.es6')),
		{ cbool }			= 	require( 	path.join(JS_BASE, 'com/objects/drupal/bool/b01_bool.es6'));

class fn31_cookies extends fnode {


    constructor (   u					=	''				, // 02. U object
					page_position		=	''				, // 07. Position id
					stype				=	'cookies_info'	) // 08. Node Type
    {

		super()
		this.n 							=	'fn31_cookies::'

		this.page_position				=	page_position

		this.u 							=	u

		this.s							=	this.u.s
		this.c 							=	this.u.c

		this.b							= 	new cbool()
		this.b.copy (this.s.b)

    	this.type						=	'cookies_structure'					 // Type for structures
		this.short_type					=	'COK'


		// String fnode / node / cica_recuerdo
		this.ftype 						=	'fnode'								// Fast node type
		this.stype 						=	stype								// Node subtype
		this.type_name					=	this.stype

		this.b.type_user							=	false										 // Different content if is anonymous
		this.b.type_human							= 	true 										 // if is dat file never will be erased on disk
		this.b.type_common							=	true
		this.b.type_url								= 	false 										 //
		this.b.type_translation						= 	false
		this.b.type_translated						= 	true

		this.b.type_have_taxonomy					=	false
		this.b.type_have_code						=	false
		this.b.type_have_properties					=	true
		this.b.type_have_specific_properties		=	true

		this.b.type_synced							= 	true

		// this.p('Sync_servers ' + this.u.sync_server_to + ' F ' + this.u.sync_server_from)

		// Type path adjustment

		// fnode / file_structure
		this.change									=
						'/' + this.ftype + '/' + this.type + '/'

		// LANG_DEPENDENT - El contenido sera el mismo para cualquier URL - Usuario -pero dentro del mismo idioma

		let uri_to_use		= 	this.u.slash_ideal_uri

		if (this.u.slash_ideal_uri.substr(0,1) == '/' )		uri_to_use = this.u.slash_ideal_uri.substr(1)

		this.suffix									=	this.s.lang + '_' + this.stype
		this.suffix_disk							=	this.suffix
		this.suffix_lang							=	this.suffix

   		this.suffix_code 							= 	this.suffix + '.' + this.u.ssl_page + '_cok'


		// Links information url - title - target - extended TeXt
		// let arrays_line = ''
		// this.arr['types'] = arrays_line.split(' ')


		// Method for disk load and to generate and save content
		this.generate_load_from_disk_path()


		// this.p('0C_COOKIES_LOAD ' + this.load_from_disk_path)

		if (this.s.load == 'drupal')
		{
			this.run_from_drupal()
		}
		else
		{
			this.run_from_disk()
		}
		// this.p('DIS ' + this.load_from_disk_path 	)
		// this.p('RAM ' + this.ram_alias_path			)
    }

    get_child_properties(prop, value) {

		// Tenemos un metodo comun para todos los tipos con title - type - path y los arrays
		// Pendiente de revisar

			// this.p('checking ' + prop + ' value ' + value )
			if ( prop 		== "cookies_text"				)
			{
				this.cookies_text					=	value
				this.header_msg						=	value

			}
			else if ( prop 	== "cookies_description"	)
			{
				this.cookies_description			=	value
				this.extended_msg					=	value
			}

    }

	prepare_specific_child_properties()
	{
		this.arr['properties'].push(				"cookies_text" 		 	+ this.sep  + this.cookies_text			)
		this.arr['properties'].push(				"cookies_description" 	+ this.sep  + this.cookies_description	)

	}

}

exports.fn31_cookies = fn31_cookies
