// [DOCHANGED_NODE]
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS - Truck ScriptsTag Class  [V.0.0.5]  (2017-11-30)
// Brqx Group - Agile Farmacia Zaragoza Methodology [COMMON-EA6]
//-------------------------------------------------------------------------------------
// Truck Structure Scripts
//-------------------------------------------------------------------------------------
//[S_01] <script src="https://cdn.jsdelivr.net/blazy/1.8.2/blazy.min.js" defer></script>
//[S_02] <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous" defer></script>
																			  
//[S_03] <script> JS CODE </script>

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

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"									);

const 	{ getset } 			= 	require(	cons.JS_BASE + 'com/objects/html/getset.es6'										),		
		{ html_style } 		= 	require(	cons.JS_BASE + 'com/objects/html/html_style.es6'									),
		scpf				= 	require( 	cons.JS_BASE + 'com/libs/file/full_path/level_02/save_code_properties_filename.es6'	),
		{ cn01_base } 		= 	require(	cons.JS_BASE + 'spc/theme/common/fast_node/cnode/cn01_base.es6'						),
		UglifyES 			= 	require(	cons.NODE_MOD +	'uglify-es'															),		
		minify 				= 	require(	cons.NODE_MOD +	'html-minifier'														).minify;


class scr04_js_inline_truck extends html_style  {

    constructor (     thm	              						)
    {   
    // El constructor debe cargar las propiedades del archivo

		let 	tag_name	=	'script'
		super( tag_name )

		this.n							=	'scr01_truck::'						
		this.m							=	'constructor'

		this.thm						=	thm							
		
		this.script_code_path			=	''
		

		this.build_data()													

    }

	//[S_01] <script src="https://cdn.jsdelivr.net/blazy/1.8.2/blazy.min.js" defer></script>
    create_blazy()
    {

		let js_name 								=	'blazy.min.js'									

		this.script_code_path				=  	
				this.thm.u.site_path + 'r_fassets/libs/js/' + js_name						

		this.content		+=		scpf.file_get_code(this.script_code_path) + " "

	}		

    create_jquery()
    {

		let js_name 								=	'jquery-3.2.1.min.js'									

		this.script_code_path				=  	
				this.thm.u.site_path + 'r_fassets/libs/js/' + js_name						

		this.content		+=		scpf.file_get_code(this.script_code_path) + " "

	}		


	//[S_03] <script src="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.3/jquery.flexslider.min.js" defer></script>
    create_flexslider()
    {

		let js_name 								=	'jquery.flexslider.min.js'									

		this.script_code_path				=  	
				this.thm.u.site_path + 'r_fassets/libs/js/' + js_name						

		this.p('File_To_Load_Scr ' + this.script_code_path)

		this.content		+=		scpf.file_get_code(this.script_code_path) + " "

	}		


	//[S_09] <script src="assets/js/main.js" defer></script>
	create_main()
    {
		// External Div
		let js_name 								=	'main'									
		
		// Live Enviroment

		if ( this.thm.b.site_live ) 		js_name	+=	'_live'

		this.script_code_path				=  	
				this.thm.u.site_path + 'r_assets/js/' +js_name + '_min.js'						

		this.p('File_To_Load_Scr ' + this.script_code_path)

		this.content		+=		scpf.file_get_code(this.script_code_path) 

		// this.p('CONTENT_LENGT_JS ' + this.content.length)


	}		

	//[S_09] <script src="assets/js/main.js" defer></script>
	create_product()
    {
		// External Div
		let js_name 								=	'product'									
		
		// Live Enviroment

		if ( this.thm.b.site_live ) 		js_name	+=	'_live'

		this.script_code_path				=  	
				this.thm.u.site_path + 'r_assets/js/' +js_name + '_min.js'						

		this.p('File_To_Load_Scr ' + this.script_code_path)

		this.content		+=		scpf.file_get_code(this.script_code_path) 

		// this.p('CONTENT_LENGT_JS ' + this.content.length)


	}		

	join_scripts()
	{
	
		var result	= UglifyES.minify(this.content , { compress: false, mangle: true } )

		// console.log(result.error);    // runtime error, `undefined` in this case
		// console.log(result.warnings); // [ 'Dropping unused variable u [0:1,18]' ]
		// console.log(result.code);     // function f(){return 5}			
					
		// this.code = minify(this.final_script.code, this.minimize_options)
		// this.p('MINIMIZED ' + this.final_script.content.length + '  to  ' + result.code.length )

		this.content = result.code

	
	}


    build_data()
    {
	// To build content is needed to build block

 		this.type			=	"text/javascript" 
 		this.charset		=	"utf-8"

		this.create_blazy()
		this.create_jquery()
		this.create_flexslider()

		if ( this.thm.b.site_live )		
			if (this.thm.b.page_product) 	
				this.create_product()													;
			else
				this.create_main()
		else
		{
			if (this.thm.b.page_product) 	
				this.create_product()													;
			this.create_main()
		}				

		// this.join_scripts()													

		this.pcreate()									

		// Ok [17-11-02]
		// this.p('Code : >' + this.code ) 											

    }

}

exports.scr04_js_inline_truck = scr04_js_inline_truck
