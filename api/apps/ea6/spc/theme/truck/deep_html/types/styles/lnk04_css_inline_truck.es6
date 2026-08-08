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
// - d-create_normalize-	: 	Create Normalize content
// - d-create_flexslider-	: 	Create FlexSlider content
// - d-create_main-			: 	Create Main content
// - d-join_link-
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"									);

const 	{ getset } 			= 	require(	path.join(JS_BASE, 'com/objects/html/getset.es6'),
		{ html_style } 		= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'),
		scpf				= 	require( 	path.join(JS_BASE, 'com/libs/file/full_path/level_02/save_code_properties_filename.es6'),
		{ cn01_base } 		= 	require(	path.join(JS_BASE, 'spc/theme/common/fast_node/cnode/cn01_base.es6'),
		CleanCSS 			= 	require(	'clean-css'															);


class lnk04_css_inline_truck extends html_style  {

    constructor (     thm	              						)
    {
    // De momento este metodo de poner todo en un script falla

		let 	tag_name	=	'style'
		super( tag_name )

		this.n							=	'scr01_truck::'
		this.m							=	'constructor'

		this.thm						=	thm

		this.link_code_path			=	''

		this.build_data()

    }


    create_normalize()
    {

		let css_name 								=	'normalize.min.css'

		this.link_code_path				=
				this.thm.u.site_path + 'r_fassets/libs/css/' + css_name


		this.content		+=		scpf.file_get_code(this.link_code_path)  + " "

	}


	//[S_03] <script src="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.3/jquery.flexslider.min.js" defer></script>
    create_flexslider()
    {

		let css_name 								=	'flexslider.min.css'

		this.link_code_path				=
				this.thm.u.site_path + 'r_fassets/libs/css/' + css_name


		this.content		+=		scpf.file_get_code(this.link_code_path) + " "

	}


	//[S_09] <link src="assets/css/main.css" defer></link>
	create_main()
    {
		// External Div
		let css_name 								=	'main'

		// Live Enviroment

		if ( this.thm.b.site_live ) 		css_name	+=	'_live'

		this.link_code_path				=
				this.thm.u.site_path + 'r_cassets/css/' + css_name + '_min.css'

		this.p('File_To_Load_Sty ' + this.link_code_path)

		this.content		+=		scpf.file_get_code(this.link_code_path)


		// this.p('CONTENT_LENGT ' + this.content.length)

	}

	//[S_09] <link src="assets/css/product.css" defer></link>
	create_product()
    {
		// External Div
		let css_name 								=	'product'

		// Live Enviroment

		if ( this.thm.b.site_live ) 		css_name	+=	'_live'

		this.link_code_path				=
				this.thm.u.site_path + 'r_cassets/css/' + css_name + '_min.css'

		this.p('File_To_Load_Sty ' + this.link_code_path)

		this.content		+=		scpf.file_get_code(this.link_code_path)


		// this.p('CONTENT_LENGT ' + this.content.length)

	}

	join_link()
	{

	  // as command : cleancss main.css -o main_min2.css
		var cleancss	= new CleanCSS({
		  inline: ['all'] ,
	      cleanupCharsets: true, // controls `@charset` moving to the front of a stylesheet; defaults to `true`
	      normalizeUrls: true, // controls URL normalization; defaults to `true`
	      optimizeBackground: true, // controls `background` property optimizations; defaults to `true`
	      optimizeBorderRadius: true, // controls `border-radius` property optimizations; defaults to `true`
	      optimizeFilter: true, // controls `filter` property optimizations; defaults to `true`
	      optimizeFont: true, // controls `font` property optimizations; defaults to `true`
	      optimizeFontWeight: true, // controls `font-weight` property optimizations; defaults to `true`
	      optimizeOutline: true, // controls `outline` property optimizations; defaults to `true`
	      removeEmpty: true, // controls removing empty rules and nested blocks; defaults to `true`
	      removeNegativePaddings: true, // controls removing negative paddings; defaults to `true`
	      removeQuotes: true, // controls removing quotes when unnecessary; defaults to `true`
	      removeWhitespace: true, // controls removing unused whitespace; defaults to `true`
	      replaceMultipleZeros: true, // contols removing redundant zeros; defaults to `true`
	      replaceTimeUnits: true, // controls replacing time units with shorter values; defaults to `true`
	      replaceZeroUnits: true, // controls replacing zero values with units; defaults to `true`
	      roundingPrecision: false, // rounds pixel values to `N` decimal places; `false` disables rounding; defaults to `false`
	      selectorsSortingMethod: 'standard', // denotes selector sorting method; can be `'natural'` or `'standard'`, `'none'`, or false (the last two since 4.1.0); defaults to `'standard'`
	      specialComments: 'all', // denotes a number of /*! ... */ comments preserved; defaults to `all`
	      tidyAtRules: true, // controls at-rules (e.g. `@charset`, `@import`) optimizing; defaults to `true`
	      tidyBlockScopes: true, // controls block scopes (e.g. `@media`) optimizing; defaults to `true`
	      tidySelectors: true, // controls selectors optimizing; defaults to `true`,
	      transform: function () {} // defines a callback for fine-grained property optimization; defaults to no-op
  		})


		// var result_ugli	= UglifyCSS.minify(this.final_link.content , { compress: false, mangle: true } )

		var result = cleancss.minify(this.content);

		// var result_clean = cleancss

		this.content = result.styles


	}


    build_data()
    {
	// To build content is needed to build block


 		this.charset			=	"utf-8"

 		this.title				=	"css_style"
 		this.type				=	"text/css"

		this.create_normalize()
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

		// this.join_link()

		this.pcreate()

		// Ok [17-11-02]
		// this.p('Code : >' + this.code )

    }

}

exports.lnk04_css_inline_truck = lnk04_css_inline_truck
