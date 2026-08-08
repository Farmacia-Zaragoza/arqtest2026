// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Fast Node Phone Lang Class  [V.0.1.7]  (2016-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1 [COMMON_ES6]
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: c-fn22_phone_lang-
//-------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - d-get_child_properties-  				: Get specific child properties
// - d-load_child_details-    				: Recover from drupal child properties
// - d-prepare_specific_child_properties- 	: Prepare properties to save in array
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const	{ fnode } 			= 	require(	path.join(JS_BASE, 'com/objects/drupal/node/fnode.es6'));
		empty 				= 	require(	 'is_empty'										),
		pngjs 				= 	require(  	 'pngjs'											),
		const { sv01_svg }		= 	require(	path.join(JS_BASE, 'spc/theme/peloncita/fast_node/inode/sv01_svg.es6'));
		const { cbool }			= 	require( 	path.join(JS_BASE, 'com/objects/drupal/bool/b01_bool.es6'));

class fn22_phone_lang extends fnode {

    constructor (   fnode_common		=	''				, // 02. U object
					page_position		=	''				, // 07. Position id
					stype				=	'phone_email_lang'	) // 08. Node Type
    {
		super()

		this.n 										=	'fn22_phone_lang::'

		this.page_position							=	page_position

		this.fnode									=	fnode_common

		this.u 										=	this.fnode.u
		this.c 										=	this.u.c

		this.s										=	this.u.s

		this.b										= 	new cbool()
		this.b.copy (this.s.b)

		this.text_img_type							=	this.fnode.text_img_type

    	this.type									=	'phone_structure'									 // Type for structures
    	this.short_type								=	'PHSL'


		// String fnode / node / cica_recuerdo
		this.ftype 									=	'fnode'															// Fast node type
		this.stype 									=	stype															// Node subtype
		this.type_name								=	this.stype


		this.b.type_user							=	false										 // Different content if is anonymous
		this.b.type_human							= 	true 										 // if is dat file never will be erased on disk
		this.b.type_common							=	true
		this.b.type_url								= 	false 										 //
		this.b.type_translation						= 	false
		this.b.type_translated						= 	false


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


		this.suffix							=	this.s.lang + '_' + this.stype
		this.suffix_disk					=	this.suffix
		this.suffix_lang					=	this.suffix


		// Method for disk load and to generate and save content
		this.generate_load_from_disk_path()

		// Es un tipo humano - No tiene codigo
		// this.p('DIS_PhonePath ' + this.load_from_disk_path)
		// this.p('DIS_LhoneLang ' + this.load_from_disk_lang)



		if (this.s.load == 'drupal')
		{
			this.run_from_drupal()
		}
		else
		{
			this.run_from_disk()
		}
		// this.p('RAM_Phone ' + this.ram_alias_path	)


    }

    get_child_properties(prop, value) {

		// Tenemos un metodo comun para todos los tipos con title - type - path y los arrays
		// Pendiente de revisar

			if ( 	 prop 	== "ntype"					)		this.node_type						=	value
			else if ( prop 	== "stype"					)		this.stype							=	value

			// is contact | contacto
			else if ( prop 	== "email_contact"			)		this.email_contact					=	value


    }

    run_child_action()
    {
		// T E X T   Z O N E
		// this.p('CHILDING_PHONE_2 ' +  this.text_img_type)

		if (this.text_img_type == 'svg')
		{
			this.replace(this.fnode.email_num , '%', '@')	//    + 'cóñoº '  // + 'Сегодня ' +  'þ ÿ ù ‑ Ø'  // @ 很好的乞讨'
			let email_num	= this.email_contact + this.result

			// email_Numm_pjpme contacto_no_spam@transporteslucasrivera.com
			// this.p('email_Numm:  ' + email_num  )

			this.svg 	=	new sv01_svg(	this.u 					,
											email_num				,
											this.fnode.color		,
											this.fnode.font 		,
											this.fnode.font_size 	)

			/// this.p('After_SVG ' + this.svg.ram_alias_code_path )

			this.current_file_to_use		=	this.svg.ram_alias_code_path
			this.current_url_to_use			=	this.svg.ram_alias_code_url

			if (this.b.site_lang)
			{
				this.current_file_to_use 	= 	this.svg.ram_alias_code_lang
				this.current_url_to_use		=	this.svg.ram_alias_code_urlang
			}

			this.email_svg_absolute_path	= 	this.current_file_to_use
			this.email_svg_absolute_url		= 	this.current_url_to_use
		}
	}

	prepare_specific_child_properties()
	{
		// Generate new file

		this.arr['properties'].push(				"email_contact" 	 + this.sep  + this.email_contact				)

		// SVG Zone

		this.arr['properties'].push(				"email_svg_path" 	 + this.sep  + this.email_svg_absolute_path		)
		this.arr['properties'].push(				"phone_svg_path" 	 + this.sep  + this.phone_svg_absolute_path		)
		this.arr['properties'].push(				"email_svg_url" 	 + this.sep  + this.email_svg_absolute_url		)
		this.arr['properties'].push(				"phone_svg_url" 	 + this.sep  + this.phone_svg_absolute_url		)

	}

}

exports.fn22_phone_lang = fn22_phone_lang
