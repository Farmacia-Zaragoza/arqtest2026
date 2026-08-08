// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Dog Header Class  [V.0.0.5]  (2017-08-10)
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Dog Structure Header
//-------------------------------------------------------------------------------------
//  <header class="text-center mobile_style">
//      <a class="logo" href="index.html">
//			<img src="img/brqx_logo_transporteslucasrivera_2017_transparent.svg" alt="">  OR svg
//		<div class="pop-container"> - External
//      <a class="logo rightLogo" href="index.html">
//			<img src="img/brqx_logo_transporteslucasrivera_2017_transparent_rotated.svg" alt=""> OR svg

//-------------------------------------------------------------------------------------
//* HEADER
//	  A
//		IMG
//    DIV
//	  A
//		IMG

// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ html_style } 				= 	require(path.join(JS_BASE, 'com/objects/html/html_style.es6'))
		const { svg_style } = require(path.join(JS_BASE, 'com/objects/html/svg_style.es6'))
		const { cn01_base } = require(path.join(JS_BASE, 'spc/theme/common/fast_node/cnode/cn01_base.es6'))
		const { hdr02_div_header_dog } = require(path.join(JS_BASE, 'spc/theme/dog/deep_html/header/hdr02_div.es6'))

class hdr01_header_dog extends html_style  {

    constructor (     thm														)
	{

        let tag_type     		= 	'header'

    	super(				tag_type	)

        this.tag_type     		= 	'header'

		this.n 					= 	'hdr01_header_dog::'

	 	this.compo_header		=	''

	// Html strings

	 	this.logo_alt			=	''

		this.class 				=	'text-center mobile_style'

		this.thm				=	thm

		this.fnode_site 		=	this.thm.arr['fnode']['site_info_lang']

		this.map				=	this.thm.map + 'header/'

		this.div_01				=	new hdr02_div_header_dog(	this.thm					)

		this.a_01				=	new svg_style('a')
		this.a_01.fnode			=	this.fnode_site

		this.build_data()

    }

	create_a_left(file_name 	= 'brqx_logo_transporteslucasrivera_2017_transparent.svg'	)
	{
		this.a_01.content					=	''

		// MULTILANG ADAPT
		this.a_01.href 						= 	this.fnode_site.u.lang_url
		this.a_01.title						=	this.fnode_site.site_title
		this.a_01.target					=	'_blank'
		this.a_01.class 					=	'logo'

		this.a_01.svg_path					= 	'r_img/logos/'
		this.a_01.svg_name 					= 	file_name

		this.a_01.svg_alt					=	''	 // Pending to compose

		this.a_01.create_svg_base()

		this.a_01.pcreate()

		this.content						+=	this.a_01.code
	}

	create_a_right(file_name 	= 'brqx_logo_transporteslucasrivera_2017_transparent_rotated.svg'	)
	{

		this.a_01.content					=		''

		this.a_01.href 						= 	this.fnode_site.u.http_domainbar
		this.a_01.title						=	this.fnode_site.site_title
		this.a_01.target					=	'_blank'
		this.a_01.class 					=	'logo rightLogo'

		this.a_01.svg_path					= 	'r_img/logos/'
		this.a_01.svg_name 					= 	file_name

		this.a_01.svg_alt					=	''

		this.a_01.create_svg_base()

		this.a_01.pcreate()

		this.content						+=		this.a_01.code

	}

    create_div()
    {
		this.content		+=  this.div_01.code
	}

	 check_loaded_header()
	{

		this.compo_header	= new cn01_base(this.thm.u , 'header')

		if ( this.compo_header.is_correct_to_reload_type() )

		{
			this.content			=	''

			this.create_a_left()

			this.create_div()

			// Este esta invertido por eso tiene parametro
			this.create_a_right()

			this.pcreate()

			// Actualizamos el codigo del objeto
			this.compo_header.load_type_details(this.code)
		}

		this.code	=	this.compo_header.code
	}

    build_data()
    {
		this.check_loaded_header()

		// Ok [18-01-09]
		// this.p('Code > ' + this.code )
    }

}

exports.hdr01_header_dog = hdr01_header_dog
