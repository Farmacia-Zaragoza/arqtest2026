// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS - Dog Scripts Inline Class  [V.0.0.1]  (2018-02-01)
// Brqx Group - Agile Farmacia Zaragoza Methodology [ES6]
//-------------------------------------------------------------------------------------
// Dog Structure Scripts
//-------------------------------------------------------------------------------------
//[S_01] <script src="https://apis.google.com/js/platform.js"></script>
//[S_02] <script src="libs/jquery/jquery-3.2.1.min.js"></script>
//[S_03] <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
//[S_04] <script src="libs/bootstrap4/js/bootstrap.min.js"></script>
//[S_05] <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
//[S_06] <script src="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.4/jquery.flexslider.js"></script>
//[S_07] <script src="libs/googleplus/jquery.kyco.googleplusfeed2.js"></script>
//[S_08] <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
//[S_09] <script src="assets/js/cookies.js"></script>
//[S_10] <script src="assets/js/main.js"></script>

// ------------------------------------------------------------------------------------
//* SCRIPT *
// uglifyjs main_live.js -o main_minimized.js
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class:c-scr05_js_inline_dog-
// ------------------------------------------------------------------------------------
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 		: 	Build html final code for object
// - d-create_objectN-		: 	Create Blazy content
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ getset } 			= 	require(	path.join(JS_BASE, 'com/objects/html/getset.es6'))),
		{ html_style } 		= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'))),
		scpf				= 	require( 	path.join(JS_BASE, 'com/libs/file/full_path/level_02/save_code_properties_filename.es6'))),
		UglifyES 			= 	require(	'uglify-es'															),
		minify 				= 	require(	'html-minifier'														).minify;


class scr05_js_inline_dog extends getset  {

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

		this.build_data()

    }

	// [S_01] <script src="https://apis.google.com/js/platform.js">
    create_google()
    {
		// It is already minimized
		let js_name							=	'platform.js'

		let js_path							= 	'js/' + js_name

		this.script_code_path				=
				this.thm.u.site_path + 'r_fassets/ilibs/' + js_path


		this.scr01.content		=		scpf.file_get_code(this.script_code_path)
		this.scr01.pcreate()

		this.code 				+= 		this.scr01.code
	}

	//[S_02] libs/jquery/jquery-3.2.1.min.js
    create_jquery()
    {

		let js_name							=	'jquery-3.2.1.min.js'

		let js_path							= 	'jquery/' + js_name

		this.script_code_path				=
				this.thm.u.site_path + 'r_fassets/libs/' + js_path

		this.scr01.content		=		scpf.file_get_code(this.script_code_path)
		this.scr01.pcreate()

		this.code 				+= 		this.scr01.code
	}

	//[S_03] <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous">
    create_popper()
    {

		let js_name							=	'popper.min.js'

		let js_path							= 	'js/' + js_name

		this.script_code_path				=
				this.thm.u.site_path + 'r_fassets/ilibs/' + js_path

		this.scr01.content		=		scpf.file_get_code(this.script_code_path)
		this.scr01.pcreate()

		this.code 				+= 		this.scr01.code
	}

	// [S_04] src="libs/bootstrap4/js/bootstrap.min.js"
    create_bootstrap()
    {
		let js_name							=	'bootstrap.min.js'

		let js_path							= 	'bootstrap4/js/' + js_name

		this.script_code_path				=
				this.thm.u.site_path + 'r_fassets/libs/' + js_path

		this.scr01.content		=		scpf.file_get_code(this.script_code_path)
		this.scr01.pcreate()

		this.code 				+= 		this.scr01.code
	}

	//[S_05] <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
    create_jquery_ui()
    {

		let js_name							=	'jquery-ui.min.js'

		let js_path							= 	'js/' + js_name

		this.script_code_path				=
				this.thm.u.site_path + 'r_fassets/ilibs/' + js_path

		this.scr01.content		=		scpf.file_get_code(this.script_code_path)
		this.scr01.pcreate()

		this.code 				+= 		this.scr01.code
	}

	// [S_06] <script src="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.4/jquery.flexslider.js">
    create_flex()
    {
		let js_name							=	'jquery.flexslider_min.js'

		let js_path							= 	'js/' + js_name

		this.script_code_path				=
				this.thm.u.site_path + 'r_fassets/ilibs/' + js_path

		this.scr01.content		=		scpf.file_get_code(this.script_code_path)
		this.scr01.pcreate()

		this.code 				+= 		this.scr01.code
	}

	// [S_07] <script src="libs/googleplus/jquery.kyco.googleplusfeed2.min.js">
    create_googleplusfeed()
    {
		let js_name							=	'jquery.kyco.googleplusfeed2.min.js'

		let js_path							= 	'googleplus/' + js_name

		this.script_code_path				=
				this.thm.u.site_path + 'r_fassets/libs/' + js_path

		this.scr01.content		=		scpf.file_get_code(this.script_code_path)
		this.scr01.pcreate()

		this.code 				+= 		this.scr01.code
	}

	// [S_08] <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
    create_js_cookie()
    {
		let js_name							=	'js.cookie.min.js'

		let js_path							= 	'js/' + js_name

		this.script_code_path				=
				this.thm.u.site_path + 'r_fassets/libs/' + js_path

		this.scr01.content		=		scpf.file_get_code(this.script_code_path)
		this.scr01.pcreate()

		this.code 				+= 		this.scr01.code
	}

	//[S_09] <script src="assets/js/cookies_min.js"></script>
    create_cookies()
    {

		let js_name							=	'cookies'

		if ( this.thm.b.site_live ) 			js_name += '_live'

		let js_path							= 	'js/' + js_name	+ '.js'

		this.script_code_path				=
				this.thm.u.site_path + 'r_assets/' + js_path

		this.scr01.content		=		scpf.file_get_code(this.script_code_path)
		this.scr01.pcreate()

		this.code 				+= 		this.scr01.code
	}


	//[S_09] <script src="assets/js/main.js" defer></script>
	create_main()
    {
		// External Div
		let js_name 			=		'main'

		// Live Enviroment

		if ( this.thm.b.site_live ) 		js_name	+=	'_live'

		this.script_code_path				=
				this.thm.u.site_path + 'r_assets/js/' +js_name + '_min.js'


		this.scr01.content		=		scpf.file_get_code(this.script_code_path)
		this.scr01.pcreate()

		this.code 				+= 		this.scr01.code

	}

	//[S_09] <script src="assets/js/main.js" defer></script>
	create_product()
    {
		// External Div
		let js_name 			=		'product'

		// Live Enviroment

		if ( this.thm.b.site_live ) 		js_name	+=	'_live'

		this.script_code_path				=
				this.thm.u.site_path + 'r_assets/js/' +js_name + '_min.js'

		this.p('File_To_Load_Scr ' + this.script_code_path)

		this.scr01.content		=		scpf.file_get_code(this.script_code_path)
		this.scr01.pcreate()

		this.code 				+= 		this.scr01.code

	}

	join_scripts()
	{

		var result	= UglifyES.minify(this.content , { compress: false, mangle: true } )

		// console.log(result.error);    // runtime error, `undefined` in this case
		// console.log(result.warnings); // [ 'Dropping unused variable u [0:1,18]' ]
		// console.log(result.code);     // function f(){return 5}

		// this.code = minify(this.final_script.code, this.minimize_options)
		// this.p('MINIMIZED ' + this.final_script.content.length + '  to  ' + result.code.length )

		this.content 			= 		result.code

	}


    build_data()
    {

		this.create_google()
		this.create_jquery()
		this.create_popper()
		this.create_bootstrap()
		this.create_jquery_ui()
		this.create_flex()
		this.create_googleplusfeed()
		this.create_js_cookie()
		this.create_cookies()

		// PRODUCT SIDE IS PENDING
		if ( this.thm.b.site_live )
			if (this.thm.b.page_product)
				this.create_product()													;
			else
				this.create_main()
		else
		{
			if (this.thm.b.page_product)
				this.create_product()													;
			else
				this.create_main()
		}

		// this.join_scripts()

		// Ok [17-11-02]
		// this.p('Code : >' + this.code )

    }

}

exports.scr05_js_inline_dog = scr05_js_inline_dog
