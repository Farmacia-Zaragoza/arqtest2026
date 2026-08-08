// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS - Dog ScriptsTag Class  [V.0.0.1]  (2017-11-30)
// Brqx Group - Agile Farmacia Zaragoza Methodology [ES6]
//-------------------------------------------------------------------------------------
// Truck Structure Scripts
//-------------------------------------------------------------------------------------
//S[01] <script defer src="https://use.fontawesome.com/releases/v5.0.1/js/all.js"></script>
// ------------------------------------------------------------------------------------
//* SCRIPT *
// uglifyjs main_live.js -o main_minimized.js
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class:c-scr01_js_truck-
// ------------------------------------------------------------------------------------
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 		: 	Build html final code for object
// - d-create_blazy-		: 	Create Blazy content
// - d-create_jquery-		: 	Create Jquery content
// - d-create_flexslider-	: 	Create FlexSlider content
// - d-create_main-			: 	Create Main content
// - d-join_scripts-
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ getset } 			= 	require(	path.join(JS_BASE, 'com/objects/html/getset.es6'),
		{ html_style } 		= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'),
		scpf				= 	require( 	path.join(JS_BASE, 'com/libs/file/full_path/level_02/save_code_properties_filename.es6'),
		UglifyES 			= 	require(	'uglify-es'															),
		minify 				= 	require(	'html-minifier'														).minify;


class scr05_jshead_inline_dog extends getset  {

    constructor (     thm	              						)
    {

		let 	tag_name		=		'script'
		super( tag_name )

		this.n					=		'scr01_truck::'
		this.m					=		'constructor'

		this.thm				=		thm

		this.scr01				=		new html_style('script')

 		this.scr01.type			=		"text/javascript"
 		this.scr01.charset		=		"utf-8"

		this.script_code_path	=		''

		this.create_font()

    }

	//[S_01] <script src="https://cdn.jsdelivr.net/blazy/1.8.2/blazy.min.js" defer></script>
    create_font()
    {

		let js_name 			=		'fontawesome_all.js'

		this.script_code_path				=
				this.thm.u.site_path + 'r_fassets/libs/js/' + js_name


		this.scr01.content		=		scpf.file_get_code(this.script_code_path)
		this.scr01.pcreate()

		this.code 				+= 		this.scr01.code

	}


}

exports.scr05_jshead_inline_dog = scr05_jshead_inline_dog
