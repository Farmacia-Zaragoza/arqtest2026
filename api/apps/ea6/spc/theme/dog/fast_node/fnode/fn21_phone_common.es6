// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS - Fast Node Phone Common Class  [V.0.1.7]  (2016-11-24)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class: c-fn21_phone_common-
//-------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - d-get_child_properties-  				: Get specific child properties
// - d-load_child_details-    				: Recover from drupal child properties
// - d-prepare_specific_child_properties- 	: Prepare properties to save in array
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ fnode } 			= 	require(path.join(JS_BASE, 'com/objects/drupal/node/fnode.es6'))
		const { cbool } = require(path.join(JS_BASE, 'com/objects/drupal/bool/b01_bool.es6'))
		const empty = require(	'is_empty'															);
		const pngjs = require(  	'pngjs'																);
		const { sv01_svg } = require(path.join(JS_BASE, 'spc/theme/peloncita/fast_node/inode/sv01_svg.es6'))
		const creff = require(path.join(JS_BASE, 'com/libs/file/full_path/level_02/create_full_filename.es6'))
		const scpf = require(path.join(JS_BASE, 'com/libs/file/full_path/level_02/save_code_properties_filename.es6'))

class fn21_phone_common extends fnode {

    constructor (   				u					=	''				, // 02 + U object
									page_position		=	''				, // 07 + Position id
									text_img_type		=	'svg'			, // 03 + Text image type (svg | png)
									stype				=	'phone_email_common'	) // 08 + Node Type
    {

		super()
		this.n 							=	'fn21_phone_common::'
		this.page_position				=	page_position

		this.u 							=	u

		this.s							=	this.u.s
		this.c 							=	this.u.c

		this.b							= 	new cbool()
		this.b.copy (this.s.b)

		this.text_img_type				=	text_img_type

    	this.type						=	'phone_structure'									 // Type for structures
    	this.short_type					=	'PHSC'

		// String fnode / node / cica_recuerdo
		this.ftype 			=	'fnode'															// Fast node type
		this.stype 			=	stype															// Node subtype
		this.type_name		=	this.stype

		this.b.type_user							=	false										 // Different content if is anonymous
		this.b.type_human							= 	true 										 // if is dat file never will be erased on disk
		this.b.type_common							=	true
		this.b.type_url								= 	false 										 //
		this.b.type_translation						= 	false
		this.b.type_translated						= 	false

		// Es un tipo humano + Se cachea + Nunca se regenera
		this.b.type_cache							=	true										 // Different content if is anonymous

		this.b.type_have_taxonomy					=	false
		this.b.type_have_code						=	false
		this.b.type_have_properties					=	true
		this.b.type_have_specific_properties		=	true
		this.b.type_synced							=	true

		// Type path adjustment

		// fnode / file_structure
		this.change							=
						'/' + this.ftype + '/' + this.type + '/'

		// NOLANG_DEPENDENT - El contenido sera el mismo para cualquier URL - Usuario -pero dentro del mismo idioma

		let uri_to_use		= 	this.u.slash_ideal_uri

		if (this.u.slash_ideal_uri.substr(0,1) == '/' )		uri_to_use = this.u.slash_ideal_uri.substr(1)

		this.suffix				=	this.stype
		this.suffix_disk			=	this.suffix
		this.suffix_lang			=	this.suffix

		// Method for disk load && to generate && save content
		this.generate_load_from_disk_path()

		// Es un tipo humano - No tiene codigo
		// this.p('DIS_PhoneCom ' + this.load_from_disk_path)
		// this.p('DIS_LhoneCom ' + this.load_from_disk_lang)

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

			if ( 	 prop 	== "ntype"					)		this.node_type					=	value
			else if ( prop 	== "stype"					)		this.stype						=	value
			else if ( prop 	== "phone_num"				)		this.phone_num					=	value
			else if ( prop 	== "email_num"				)		this.email_num					=	value

			// PNG Zone
			else if ( prop 	== "phone_img_path"			)		this.phone_img_relative_path		=	value
			else if ( prop 	== "email_img_path"			)		this.email_img_relative_path		=	value

			else if ( prop 	== "original_phone_icon"	)		this.phone_icon_original_relative_path		=	value
			else if ( prop 	== "original_email_icon"	)		this.email_icon_original_relative_path		=	value

			else if ( prop 	== "target_phone_icon"		)			this.phone_icon_target_relative_path		=	value
			else if ( prop 	== "target_email_icon"		)			this.email_icon_target_relative_path		=	value

			// SVG Zone

			else if ( prop 	== "phone_svg_path"			)		this.phone_svg_absolute_path		=	value

			else if ( prop 	== "color"					)		this.color						=	value
			else if ( prop 	== "font"					)		this.font							=	value
			else if ( prop 	== "font_size"				)		this.font_size					=	value

			else if ( prop 	== "original_color"			)		this.original_color				=	value
			else if ( prop 	== "target_color"			)		this.target_color					=	value
    }

	// ----------------------------- RUN_CHILD_ACTION -----------------------------
    run_child_action()
    {
		// this.p('CHILDING_PHONE')
		// T E X T   Z O N E

		if (this.text_img_type == 'svg')
		{

			// Before_SVG NUM E contacto_no_spam#ventapisoguadarrama.com F font/arial.ttf
			// this.pt('Before_SVG ' + this.phone_num  + ' F ' + this.font + ' C ' + this.color )
			// Generamos el svg font

			let class_name = 'phone-no'
			this.svg 	=	new sv01_svg(	this.u 			,
											this.phone_num	,
											this.color		,
											this.font 		,
											this.font_size	,
											class_name 				)

			this.current_file_to_use		=	this.svg.ram_alias_code_path
			this.current_url_to_use			=	this.svg.ram_alias_code_url

			if (this.b.site_lang)
			{
				this.current_file_to_use 	= 	this.svg.ram_alias_code_lang
				this.current_url_to_use		=	this.svg.ram_alias_code_urlang
			}
			// this.p('PHONE_U RLANG ' + this.u.ssd_alias_code_url_nouser)
			// this.p('PHONE_URLLANG ' + this.svg.ram_alias_code_urlang)

			this.phone_svg_absolute_path	= 	this.current_file_to_use
			this.phone_svg_absolute_url		= 	this.current_url_to_use

		}

		// I M A G E    Z O N E   -   Vamos con los cambios de color
		// --==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==

		// this.p('SITE_PATH ' + this.u.site_path)

		if (this.u.site_path.substr(-1) !== '/' )		this.u.site_path +=    '/'

		this.phone_icon_target_absolute_path 		= this.u.site_path + this.phone_icon_target_relative_path
		this.phone_icon_original_absolute_path 		= this.u.site_path + this.phone_icon_original_relative_path

		this.email_icon_target_absolute_path 		= this.u.site_path + this.email_icon_target_relative_path
		this.email_icon_original_absolute_path 		= this.u.site_path + this.email_icon_original_relative_path

		this.email_icon_target_absolute_path 	    = this.u.site_path + this.email_icon_target_relative_path

		// Colorize images
		if ('A' == 'A')
		{

		if ( !empty(this.phone_icon_target_relative_path)  )
		{
			if ( (!creff.is_file(this.phone_icon_target_absolute_path))	||
			(0 != creff.filesize( this.phone_icon_target_absolute_path) ) 		)
			{
				// this.p ( ' A_colorear ' + this.color)
				// var PNG  = pngjs.PNG

				// var data = fs.readFileSync(this.phone_icon_original_absolute_path);
				// var png = PNG.sync.read(data);
				// PNG.adjustGamma(png);

				// var buffer = PNG.sync.write(png);

				// this.p('created_png '+ this.phone_icon_target_absolute_path )

				// scpf.save_binary_code_to_file(this.phone_icon_target_absolute_path, buffer);

				// colorize(this.phone_icon_original_absolute_path , this.phone_icon_target_absolute_path , this.color )

			}
		}

		if (!empty(this.email_icon_target_relative_path) )
		{
			if ( (!creff.is_file(this.email_icon_target_absolute_path)		 )  ||
			     (0 == creff.filesize( this.email_icon_target_absolute_path) )  )
			{
				// this.p ( 'fn21A_colorear ' + this.color)

				// var PNG  = pngjs.PNG

				// var data = fs.readFileSync(this.email_icon_original_absolute_path);
				// var png = PNG.sync.read(data);
				// PNG.adjustGamma(png);

				// var buffer = PNG.sync.write(png);

				// scpf.save_binary_code_to_file(this.email_icon_target_absolute_path, buffer);

				// this.p('created_png_email '+ this.email_icon_target_absolute_path )

				// colorize(this.email_icon_original_absolute_path , this.email_icon_target_absolute_path , this.color )
					// change_color_png(this.phone_icon_target_absolute_path , this.phone_icon_original_absolute_path , this.original_color , this.target_color )
			}
		}

		}
	}

	prepare_specific_child_properties()
	{
		// Generate new file

		this.arr['properties'].push(				"phone_num" 		 + this.sep  + this.phone_num								)

		// # lo usamos para comentarios
		this.replace( 								this.email_num 			, '@', '%'												)
		this.arr['properties'].push(				"email_num" 		 + this.sep  + this.result									)

		// PNG Zone
		this.arr['properties'].push(				"phone_img_path" 	 + this.sep  + this.phone_img_relative_path					)
		this.arr['properties'].push(				"email_img_path" 	 + this.sep  + this.email_img_relative_path					)

		this.arr['properties'].push(				"original_phone_icon"  + this.sep  + this.phone_icon_original_relative_path		)
		this.arr['properties'].push(				"original_email_icon"  + this.sep  + this.email_icon_original_relative_path		)

		this.arr['properties'].push(				"target_phone_icon"  + this.sep  + this.phone_icon_target_relative_path			)
		this.arr['properties'].push(				"target_email_icon"  + this.sep  + this.email_icon_target_relative_path			)

		// SVG Zone

		this.arr['properties'].push(				"phone_svg_path" 	 + this.sep  + this.phone_svg_absolute_path					)
		this.arr['properties'].push(				"phone_svg_url" 	 + this.sep  + this.phone_svg_absolute_url					)

		this.arr['properties'].push(				"color" 			 + this.sep  + this.color									)
		this.arr['properties'].push(				"font" 				 + this.sep  + this.font									)
		this.arr['properties'].push(				"font_size" 		 + this.sep  + this.font_size								)

		this.arr['properties'].push(				"original_color" 	 + this.sep  + this.original_color							)
		this.arr['properties'].push(				"target_color" 		 + this.sep  + this.target_color							)

	}

}

exports.fn21_phone_common = fn21_phone_common

