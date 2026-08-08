// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Fast Node Phone Lang Class  [V.0.1.8]  (2018-02-02)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: c-fn23_site_lang-
//-------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - d-get_child_properties-  				: Get specific child properties
// - d-prepare_specific_child_properties- 	: Prepare properties to save in array
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const	{ fnode } 			= 	require(	path.join(JS_BASE, 'com/objects/drupal/node/fnode.es6'),
		{ cbool }			= 	require( 	path.join(JS_BASE, 'com/objects/drupal/bool/b01_bool.es6'));

class fn23_site_lang extends fnode {

    constructor (   u								=	''				, // 01. Fnode
					stype							=	'site_lang'		) // 03. Node Type
    {
		super()
		this.n 										=	'fn23_site_lang::'
		this.u 										=	u

		this.s										=	this.u.s
		this.c 										=	this.u.c

		this.b										= 	new cbool()
		this.b.copy (this.s.b)


    	this.type									=	'site_lang_structure'									 // Type for structures
    	this.short_type								=	'SITE'


		// String fnode / node / cica_recuerdo
		this.ftype 									=	'fnode'															// Fast node type
		this.stype 									=	stype															// Node subtype
		this.type_name								=	this.stype

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
		this.b.type_synced							=	true


		// Type path adjustment

		// fnode / file_structure
		this.change							=
						'/' + this.ftype + '/' + this.type + '/'

		// LANG_DEPENDENT - El contenido sera el mismo para cualquier URL - Usuario -pero dentro del mismo idioma

		this.suffix					=	this.s.lang + '_' + this.stype
		this.suffix_disk			=	this.suffix
		this.suffix_lang			=	this.suffix


		// Method for disk load and to generate and save content
		this.generate_load_from_disk_path()

		// Es un tipo humano - No tiene codigo

		// this.p('SITE_PAT ' + this.type + '  ' 	 + this.load_from_disk_path)
		// this.p('SITE_LAN ' + this.type + '  ' 	 + this.load_from_disk_lang)

		let arrays_line = 'btn mnu lnk'

		this.arr['types'] = arrays_line.split(' ')


		if (this.s.load == 'drupal')
		{
			this.run_from_drupal()
		}
		else
		{
			this.run_from_disk()
		}
		// this.p('RAM_Site ' + this.ram_alias_path	)

    }

    get_child_properties(prop, value) {

		// Tenemos un metodo comun para todos los tipos con title - type - path y los arrays
		// Pendiente de revisar

			if 		( prop 	== "site_title"					)		this.site_title						=	value
			else if ( prop 	== "firm_name"					)		this.firm_name						=	value
			else if ( prop 	== "logo_alt"					)		this.logo_alt						=	value
			else if ( prop 	== "title_hover"				)		this.title_hover					=	value

			// Metas

			else if ( prop 	== "meta_author"				)		this.s.meta_author					=	value
			else if ( prop 	== "meta_desc"					)		this.s.meta_desc					=	value


			// Bottom Menu
			else if ( prop 	== "mnu_hide"						)	this.s.mnu_hide						=	value

			// Information Section

			else if ( prop 	== "nfo_in"							)	this.s.nfo_in						=	value
			else if ( prop 	== "nfo_out"						)	this.s.nfo_out						=	value
			else if ( prop 	== "nfo_font_size"					)	this.s.nfo_font_size				=	value
			else if ( prop 	== "nfo_font_resize"				)	this.s.nfo_font_resize				=	value

			// -Titles
			else if ( prop 	== "nfo_text_dev_live"				)	this.s.nfo_text_dev_live			=	value
			else if ( prop 	== "nfo_text_html_php"				)	this.s.nfo_text_html_php			=	value
			else if ( prop 	== "nfo_text_http_https"			)	this.s.nfo_text_http_https			=	value
			else if ( prop 	== "nfo_text_anon_auth"				)	this.s.nfo_text_anon_auth			=	value
			else if ( prop 	== "nfo_text_robot_user"			)	this.s.nfo_text_robot_user			=	value

			// -Descriptions
			else if ( prop 	== "nfo_desc_dev_live"				)	this.s.nfo_desc_dev_live			=	value
			else if ( prop 	== "nfo_desc_html_php"				)	this.s.nfo_desc_html_php			=	value
			else if ( prop 	== "nfo_desc_http_https"			)	this.s.nfo_desc_http_https			=	value
			else if ( prop 	== "nfo_desc_anon_auth"				)	this.s.nfo_desc_anon_auth			=	value
			else if ( prop 	== "nfo_desc_robot_user"			)	this.s.nfo_desc_robot_user			=	value

			// -Page Action
			else if ( prop 	== "nfo_desc_font_size"				)	this.s.nfo_desc_font_size			=	value
			else if ( prop 	== "nfo_desc_keyboard"				)	this.s.nfo_desc_keyboard			=	value
			else if ( prop 	== "nfo_desc_scrolling"				)	this.s.nfo_desc_scrolling			=	value

			//- Text
			else if ( prop 	== "nfo_text_general_title"			)	this.s.nfo_text_general_title		=	value
			else if ( prop 	== "nfo_text_general_information"	)	this.s.nfo_text_general_information	=	value

			// OG Properties

			else if ( prop 	== "meta_og_title"				)		this.s.meta_og_title				=	value
			else if ( prop 	== "meta_og_description"		)		this.s.meta_og_description			=	value
			else if ( prop 	== "meta_og_image"				)		this.s.meta_og_image				=	value

    }

	prepare_specific_child_properties()
	{
		// Generate new file
		// 交通卢卡斯·里弗拉

		this.arr['properties'].push(				"site_title" 		 + this.sep  + this.site_title									)
		this.arr['properties'].push(				"firm_name" 		 + this.sep  + this.firm_name									)
		this.arr['properties'].push(				"logo_alt" 			 + this.sep  + this.logo_alt									)
		this.arr['properties'].push(				"title_hover"		 + this.sep  + this.title_hover									)

		// Metas

		this.arr['properties'].push(				"meta_author"		 + this.sep  + this.s.meta_author								)
		this.arr['properties'].push(				"meta_desc"			 + this.sep  + this.s.meta_desc									)

		// Bottom Menu

		this.arr['properties'].push( 				"mnu_hide" 			+ this.sep  + this.s.mnu_hide									)


		// Information Section

		this.arr['properties'].push( 				"nfo_in"			  			+ this.sep  + this.s.nfo_in							)
		this.arr['properties'].push( 				"nfo_out"			  			+ this.sep  + this.s.nfo_out						)
		this.arr['properties'].push( 				"nfo_font_size"		  			+ this.sep  + this.s.nfo_font_size					)
		this.arr['properties'].push( 				"nfo_font_resize"	  			+ this.sep  + this.s.nfo_font_resize				)

		// -Titles
		this.arr['properties'].push( 				"nfo_text_dev_live"			  	+ this.sep  + this.s.nfo_text_dev_live				)
		this.arr['properties'].push( 				"nfo_text_html_php"			  	+ this.sep  + this.s.nfo_text_html_php				)
		this.arr['properties'].push( 				"nfo_text_http_https"			+ this.sep  + this.s.nfo_text_http_https			)
		this.arr['properties'].push( 				"nfo_text_anon_auth"			+ this.sep  + this.s.nfo_text_anon_auth				)
		this.arr['properties'].push( 				"nfo_text_robot_user"			+ this.sep  + this.s.nfo_text_robot_user			)

		// -Descriptions
		this.arr['properties'].push( 				"nfo_desc_dev_live"			  	+ this.sep  + this.s.nfo_desc_dev_live				)
		this.arr['properties'].push( 				"nfo_desc_html_php"			  	+ this.sep  + this.s.nfo_desc_html_php				)
		this.arr['properties'].push( 				"nfo_desc_http_https"			+ this.sep  + this.s.nfo_desc_http_https			)
		this.arr['properties'].push( 				"nfo_desc_anon_auth"			+ this.sep  + this.s.nfo_desc_anon_auth				)
		this.arr['properties'].push( 				"nfo_desc_robot_user"			+ this.sep  + this.s.nfo_desc_robot_user			)

		// -Page Action
		this.arr['properties'].push( 				"nfo_desc_font_size"			+ this.sep  + this.s.nfo_desc_font_size				)
		this.arr['properties'].push( 				"nfo_desc_keyboard"			  	+ this.sep  + this.s.nfo_desc_keyboard				)
		this.arr['properties'].push( 				"nfo_desc_scrolling"			+ this.sep  + this.s.nfo_desc_scrolling				)

		// -Text
		this.arr['properties'].push( 				"nfo_text_general_title"		+ this.sep  + this.s.nfo_text_general_title			)
		this.arr['properties'].push( 				"nfo_text_general_information"	+ this.sep  + this.s.nfo_text_general_information	)

		// Meta OG
		this.arr['properties'].push( 				"meta_og_title"					+ this.sep  + this.s.meta_og_title					)
		this.arr['properties'].push( 				"meta_og_description"			+ this.sep  + this.s.meta_og_description			)
		this.arr['properties'].push( 				"meta_og_image"					+ this.sep  + this.s.meta_og_image					)

	}

}

exports.fn23_site_lang = fn23_site_lang
