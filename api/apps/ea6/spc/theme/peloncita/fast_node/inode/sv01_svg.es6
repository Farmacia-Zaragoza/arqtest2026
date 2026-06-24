//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//SvgNode Class  [V.0.0.2]  (2018-01-05)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//Spc - Cica_d05 - Home - Index_06 - v0_0_1 [EA6]
//-------------------------------------------------------------------------------------
//Fast node load - Replace Mysql connections
//-------------------------------------------------------------------------------------
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- d-get_child_properties-				: Get child properties for inode
//- d-prepare_specific_child_properties- 	: Load child properties for inode
//- d-build_dimensions-                    : Generate dimensions for photo
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"								);

const	{ anode } 			= require(	cons.JS_BASE 	+ 'com/objects/drupal/anode/an0/an01_obj.es6'		),
		{ cbool }			= require(	cons.JS_BASE 	+ 'com/objects/drupal/bool/b01_bool.es6'			),
		svg 				= require( 	cons.JS_BASE 	+ 'com/libs/image/create_svg.es6'					),
		empty 				= require( 	'is-empty'										);


class sv01_svg extends anode {

	constructor(	u = "",
					text = "PhoNe",
					color = "orange",
					font = "om_telolet_om-webfont",
					font_size = "20",
					class_name = "",
					stype = "svg_image")
	{

		super()
		this.n 					= "sv01_svg::"

		this.b 					= new cbool()
		this.u 					= u
		this.s 					= this.u.s
		this.c 					= this.u.c
		this.b.copy(this.s.b)

		this.type 				= "svg_path"
		this.short_type 		= "SVG-IMG"
		this.text 				= "" + text
		this.font 				= font
		this.font_size 			= font_size

		this.color 				= color
		this.class 				= class_name
		this.ntype 				= "svg"
		this.stype 				= stype
		this.type_name 			= this.stype


		this.b.type_user 						= false
		this.b.type_human 						= false
		this.b.type_common 						= true
		this.b.type_url 						= false
		this.b.type_translation 				= false

		// este campo no queda claro
		this.b.type_translated 					= false
		this.b.type_ssl							=	false										 // If have urls

		this.b.type_have_taxonomy 				= false
		this.b.type_have_code 					= true
		this.b.type_have_ascii_code 			= true
		this.b.type_have_properties 			= true
		this.b.type_have_specific_properties 	= true

		var arrfont = font.split(".")
		this.font_name = arrfont[0].toLowerCase()

		this.change = "/" + this.ntype + "/" + this.font_name + "/" + this.color + "/" + this.font_size + "/"

		this.replace( this.text , "@", "_")
		this.inreplace("@", "_")
		this.inreplace("\\.", "_")			// Escapamos el punto
		this.inreplace(" ", "_")

		var text_clean = this.result

		// Debemos oculatar el codigo real del usuario

		// this.p ('CLEAN_TEXT ' + text_clean)

		var text_ofusqued = "x".repeat(text_clean.length)
		this.replace( text_ofusqued , "xxx", "abc")

		var text_ofusqued = this.result

		// this.p ('OFUSQ_TEXT ' + text_clean)

		this.suffix 		= text_ofusqued + "_" +  "svgdata"
		this.suffix_disk 	= this.suffix
		this.suffix_lang 	= this.suffix + "_" + this.s.lang
		this.suffix_code 	= this.suffix_lang + "_code" + ".svg"

		this.generate_load_from_disk_path()

		// /brqx/pers/drupal/v50/fnode/truck/svg/open_sans_new/blue/22/contacto_no_spam_transporteslucasrivera_com_ssl.svgdata
		// this.p('sv01_path ' + this.load_from_disk_path)
		// this.p('sv01_path_code ' + this.load_from_disk_path_code)

		if (this.s.load == "drupal")
		{
				this.run_from_drupal()
				//create_paths - get_current_properties
		}
		else
		{
				this.run_from_disk()
				//create_paths (update_paths_nouser_for_common_types) - get_current_properties_from_disk
		}

		// this.p('SSD_Svg ' + this.ssd_alias_code_path	)

		// this.p('RAM_Svg ' + this.ram_alias_path	)
		// this.p('RAM_Svg_Code ' + this.ram_alias_code_path	)

	}

	get_child_properties(prop, value)
	//$this->p('NEVER_RECOVERING_SVG ' . $this->text )
	{
		if (prop == "color") this.color = value
		else if (prop == "text") this.text = value
		else if (prop == "font") this.font = value
		else if (prop == "font_size") this.font_size = value
	}

	// ---------------------------- LOAD_CHILD_DETAILS ----------------------------
	load_child_details()
	{
		this.m		=	'load_child_details'
		this.n 		= 	"sv01_svg::"

		//this.p('sv01_load_child')

	 	// this.p('Checking_reload_svg_generation '+ true + ' == ' + !this.arr['nfo']['generate'] )

		// PENDIENTE
		if ( this.s.load == "drupal" 					||
		     (!this.b.ready_to_load 				||
			  this.special_reload_ram('SVG-IMG')   	||
			  this.special_reload_disk('SVG-IMG') 	 )	)
		{

			// font open_sans_NEW Text contacto_no_spam@transporteslucasrivera.com</br>

		    // this.p('SV01_SVG_GENERATING ' + this.text )

			this.code = svg.create_svg(	this.text				,
										this.color				,
										this.font				,
										this.font_size			,
										this.class				)

		}

			// if (!empty(this.code))
			// 		this.p('SV01_SVG_GENERATED ' + this.code.length)


		// this.p('sv01_font '  +  this.font + ' Text ' + this.text)

	}

	prepare_specific_child_properties()
	{
		this.arr['properties'].push("color" 		+ this.sep + this.color		)
		this.arr['properties'].push("text" 			+ this.sep + this.text		)
		this.arr['properties'].push("font" 			+ this.sep + this.font		)
		this.arr['properties'].push("font_size" 	+ this.sep + this.font_size	)
	}

}

exports.sv01_svg = sv01_svg
