// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS - Dog ScriptsTag Class  [V.0.0.5]  (2017-11-30)
// Brqx Group - Agile Farmacia Zaragoza Methodology [ES6]
//-------------------------------------------------------------------------------------
// Dog Structure Scripts
//-------------------------------------------------------------------------------------
//[S_01] <script src="https://cdn.jsdelivr.net/blazy/1.8.2/blazy.min.js" defer></script>
//[S_02] <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous" defer></script>

//[S_03] <script> JS CODE </script>

// ------------------------------------------------------------------------------------
//* SCRIPT *
// uglifyjs main_live.js -o main_minimized.js
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class:c-scr01_js_dog-
// ------------------------------------------------------------------------------------
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 		: 	Build html final code for object
// - d-create_normalize-	: 	Create Normalize content
// - d-create_flexslider-	: 	Create FlexSlider content
// - d-create_main-			: 	Create Main content
// - d-join_link-
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ getset } 			= 	require(path.join(JS_BASE, 'com/objects/html/getset.es6'))
		const { html_style } = require(path.join(JS_BASE, 'com/objects/html/html_style.es6'))
		const scpf = require(path.join(JS_BASE, 'com/libs/file/full_path/level_02/save_code_properties_filename.es6'))
		const { cn01_base } = require(path.join(JS_BASE, 'spc/theme/common/fast_node/cnode/cn01_base.es6'))
		const CleanCSS = require(	'clean-css'															);

class lnk05_css_inline_dog extends getset  {

    constructor (     thm	              						)
    {

		let 	tag_name				=	'style'
		super( tag_name )

		this.n							=	'scr01_dog::'
		this.m							=	'constructor'

		this.thm						=	thm

		this.link_code_path				=	''

		this.lnk01						=	new html_style('style')

 		this.lnk01.charset				=	"utf-8"
 		this.lnk01.type					=	"text/css"

		this.build_data()

    }

	//L[04]  <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
    create_jquery()
    {

		let css_name 					=	'jquery-ui_min.css'

		this.link_code_path				=
				this.thm.u.site_path + 'r_fassets/ilibs/css/' + css_name

		this.p('SITE_PATH ' + this.link_code_path )

		this.lnk01.content				=	scpf.file_get_code(this.link_code_path)
		this.lnk01.pcreate()

		// this.p ('CHECK_STYLE_01 ' + this.lnk01.code)

		this.code						+=	this.lnk01.code

	}

    create_bootstrap()
    {

		let css_name 					=	'bootstrap.min.css'

		let bootstrap_path				= 	'bootstrap4/js/' 	+ css_name

		this.link_code_path				=
				this.thm.u.site_path + 'r_fassets/libs/' + bootstrap_path

		this.lnk01.content				=	scpf.file_get_code(this.link_code_path)
		this.lnk01.pcreate()

		// this.p ('CHECK_STYLE_01 ' + this.lnk01.code)

		this.code						+=	this.lnk01.code

	}

	//[S_03] <script src="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.3/jquery.flexslider.min.js" defer></script>
    create_flex()
    {

		let css_name 					=	'flexslider.min.css'

		this.link_code_path				=
				this.thm.u.site_path + 'r_fassets/ilibs/css/' + css_name

		this.lnk01.content				=	scpf.file_get_code(this.link_code_path)
		this.lnk01.pcreate()

		this.code						+=	this.lnk01.code

	}

	//L[08]  <link rel="stylesheet" href="libs/googleplus/jquery.kyco.googleplusfeed2.css">
    create_googleplus()
    {

		let css_name 					=	'jquery.kyco.googleplusfeed2_min.css'

		let googleplus_path				= 	'googleplus/' 	+ css_name

		this.link_code_path				=
				this.thm.u.site_path + 'r_fassets/libs/' + googleplus_path

		this.lnk01.content				=	scpf.file_get_code(this.link_code_path)
		this.lnk01.pcreate()

		// this.p ('CHECK_STYLE_01 ' + this.lnk01.code)

		this.code						+=	this.lnk01.code

	}

	//[S_09] <script src="assets/js/main.js" defer></script>
	create_main()
    {
		// External Div
		let css_name 					=	'main'

		// Live Enviroment

		if ( this.thm.b.site_live ) 		css_name	+=	'_live'

		this.link_code_path				=
				this.thm.u.site_path + 'r_cassets/css/' + css_name + '_min.css'

		this.p('File_To_Load_Sty ' + this.link_code_path)

		this.lnk01.content				=	scpf.file_get_code(this.link_code_path)
		this.lnk01.pcreate()

		// this.p ('CHECK_STYLE_03 ' + this.lnk01.code)

		this.code						+=	this.lnk01.code

	}

	//[S_09] <script src="assets/js/product.js" defer></script>
	create_product()
    {
		// External Div
		let css_name 					=	'product'

		// Live Enviroment

		if ( this.thm.b.site_live )
			css_name					+=	'_live'

		this.link_code_path				=
				this.thm.u.site_path + 'r_cassets/css/' + css_name + '_min.css'

		this.lnk01.content				=	scpf.file_get_code(this.link_code_path)
		this.lnk01.pcreate()

		// this.p ('CHECK_STYLE_03 ' + this.lnk01.code)

		this.code						+=	this.lnk01.code

	}

    build_data()
    {

		this.create_jquery()
		this.create_bootstrap()
		this.create_main()
		this.create_flex()
		this.create_googleplus()

		// Ok [17-11-02]
		// this.p('Code : >' + this.code )

    }

}

exports.lnk05_css_inline_dog = lnk05_css_inline_dog

