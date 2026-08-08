// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Fast Node Hiddens Lang Class  [V.0.0.1]  (2018-02-19)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - d-get_child_properties-  				: Get specific child properties
// - d-prepare_specific_child_properties- 	: Prepare properties to save in array
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ fnode } 				= 	require(	path.join(JS_BASE, 'com/objects/drupal/node/fnode.es6'))),
		{ cbool }				= 	require( 	path.join(JS_BASE, 'com/objects/drupal/bool/b01_bool.es6')));


class fn41_hiddens_lang extends fnode {


    constructor (   fnode				=	''				, // 02. U object
					page_position		=	''				, // 07. Position id
					stype				=	'hidden_langs'	) // 08. Node Type
    {

		super()
		this.n 							=	'fn41_hiddens_lang::'

		this.page_position				=	page_position

		this.fnode						=	fnode
		this.u 							=	this.fnode.u

		this.s							=	this.u.s
		this.c 							=	this.u.c

		this.b							= 	new cbool()
		this.b.copy (this.s.b)


    	this.type									=	'hiddens_lang_structure'					 	// Type for structures
		this.short_type								=	'HIDL'


		// String fnode / node / cica_recuerdo
		this.ftype 									=	'fnode'										// Fast node type
		this.stype 									=	stype										// Node subtype
		this.type_name								=	this.stype


		this.b.type_user							=	false										 // Different content if is anonymous
		this.b.type_common							=	true
		this.b.type_human							= 	true 										 // if is dat file never will be erased on disk
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
		this.change							=
						'/' + this.ftype + '/' + this.type + '/'

		// LANG_DEPENDENT - El contenido sera el mismo para cualquier URL - Usuario -pero dentro del mismo idioma

		let uri_to_use		= 	this.u.slash_ideal_uri

		if (this.u.slash_ideal_uri.substr(0,1) == '/' )		uri_to_use = this.u.slash_ideal_uri.substr(1)


		this.suffix					=	this.s.lang + '_' + this.stype
		this.suffix_disk			=	this.suffix
		this.suffix_lang			=	this.suffix


		// Links information url - target - extended TeXt
		let arrays_line = 'txt lines lfill lcokw'

		this.arr['types'] = arrays_line.split (' ')


		// Method for disk load and to generate and save content
		this.generate_load_from_disk_path()

		// efile_lines@flat_details

		// No tiene codigo - Es un tipo humano
		// uri:: - https://node.dbrqx.com/  - L https://node.dbrqx.com/fr/

		// this.p('0L_Lang_Links_LOAD ' + this.load_from_disk_path)
		// this.p('0L_Lang_Links_LANG ' + this.load_from_disk_lang)


		if (this.s.load == 'drupal')
		{
			this.run_from_drupal()
		}
		else
		{
			this.run_from_disk()
		}
		// this.p('RAM_Links ' + this.ram_alias_path			)


    }

    get_child_properties(prop, value) {

		// Tenemos un metodo comun para todos los tipos con title - type - path y los arrays
		// Pendiente de revisar

		if 		( prop 	== "facebook_popover"				)	this.s.facebook_popover					=	value
		else if ( prop 	== "linkedin_popover"				)	this.s.linkedin_popover					=	value
		else if ( prop 	== "google_popover"					)	this.s.google_popover					=	value
		else if ( prop 	== "twitter_popover"				)	this.s.twitter_popover					=	value
		else if ( prop 	== "brightness_popover"				)	this.s.brightness_popover				=	value
		else if ( prop 	== "cookies_popover"				)	this.s.cookies_popover					=	value

		else if ( prop 	== "facebook_warning"				)	this.s.facebook_warning					=	value
		else if ( prop 	== "follow_word"					)	this.s.follow_word						=	value
		else if ( prop 	== "info_page_description"			)	this.s.info_page_description			=	value
		else if ( prop 	== "close_word"						)	this.s.close_word						=	value
		else if ( prop 	== "back_word"						)	this.s.back_word						=	value

		else if ( prop 	== "first_swuare_button_popover"	)	this.s.first_swuare_button_popover		=	value
		else if ( prop 	== "first_square_button_title"		)	this.s.first_square_button_title		=	value
		else if ( prop 	== "second_swuare_button_popover"	)	this.s.second_swuare_button_popover		=	value
		else if ( prop 	== "second_square_button_title"		)	this.s.second_square_button_title		=	value
		else if ( prop 	== "cookies_warning_text"			)	this.s.cookies_warning_text				=	value
		else if ( prop 	== "marquee_text_text"				)	this.s.marquee_text_text				=	value
		else if ( prop 	== "font_size_text"					)	this.s.font_size_text					=	value
		else if ( prop 	== "font_size_title"				)	this.s.font_size_title					=	value
		else if ( prop 	== "navigation_text"				)	this.s.navigation_text					=	value
		else if ( prop 	== "navigation_title"				)	this.s.navigation_title					=	value
		else if ( prop 	== "scroll_text"					)	this.s.scroll_text						=	value
		else if ( prop 	== "scroll_title"					)	this.s.scroll_title						=	value

    }

	prepare_specific_child_properties()
	{

		this.arr['properties'].push( 				"facebook_popover"				+ 	this.sep  + this.s.facebook_popover					)
		this.arr['properties'].push( 				"linkedin_popover"				+ 	this.sep  + this.s.linkedin_popover					)
		this.arr['properties'].push( 				"google_popover"				+ 	this.sep  + this.s.google_popover					)
		this.arr['properties'].push( 				"twitter_popover"				+ 	this.sep  + this.s.twitter_popover					)
		this.arr['properties'].push( 				"brightness_popover"			+ 	this.sep  + this.s.brightness_popover				)
		this.arr['properties'].push( 				"cookies_popover"				+ 	this.sep  + this.s.cookies_popover					)

		this.arr['properties'].push( 				"facebook_warning"				+ 	this.sep  + this.s.facebook_warning					)
		this.arr['properties'].push( 				"follow_word"					+ 	this.sep  + this.s.follow_word						)
		this.arr['properties'].push( 				"info_page_description"			+ 	this.sep  + this.s.info_page_description			)
		this.arr['properties'].push( 				"close_word"					+ 	this.sep  +	this.s.close_word						)
		this.arr['properties'].push( 				"back_word"						+ 	this.sep  + this.s.back_word						)

		this.arr['properties'].push( 				"first_swuare_button_popover"	+ 	this.sep  + this.s.first_swuare_button_popover		)
		this.arr['properties'].push( 				"first_square_button_title"		+ 	this.sep  + this.s.first_square_button_title		)
		this.arr['properties'].push( 				"second_swuare_button_popover"	+ 	this.sep  + this.s.second_swuare_button_popover		)
		this.arr['properties'].push( 				"second_square_button_title"	+ 	this.sep  + this.s.second_square_button_title		)
		this.arr['properties'].push( 				"cookies_warning_text"			+ 	this.sep  + this.s.cookies_warning_text				)
		this.arr['properties'].push( 				"marquee_text_text"				+ 	this.sep  + this.s.marquee_text_text				)
		this.arr['properties'].push( 				"font_size_text"				+ 	this.sep  + this.s.font_size_text					)
		this.arr['properties'].push( 				"font_size_title"				+ 	this.sep  + this.s.font_size_title					)
		this.arr['properties'].push( 				"navigation_text"				+ 	this.sep  + this.s.navigation_text					)
		this.arr['properties'].push( 				"navigation_title"				+ 	this.sep  + this.s.navigation_title					)
		this.arr['properties'].push( 				"scroll_text"					+ 	this.sep  + this.s.scroll_text						)
		this.arr['properties'].push( 				"scroll_title"					+ 	this.sep  + this.s.scroll_title						)

		this.arr['properties'].push(				"efile" 			 			+ 	this.sep  + this.efile								)

	}

}

exports.fn41_hiddens_lang = fn41_hiddens_lang
