// [DOCHANGED_ES6]
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS - Truck Scripts Minimized Class  [V.0.0.1]  (2017-12-01)
// Brqx Group - Agile Farmacia Zaragoza Methodology [COMMON-EA6]
//-------------------------------------------------------------------------------------
// Truck Structure Scripts - Version 01 - Js as scripts
//-------------------------------------------------------------------------------------
//[S_01] <script src="https://cdn.jsdelivr.net/blazy/1.8.2/blazy.min.js" defer></script>
//[S_02] <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous" defer></script>
																			  
//[S_03] <script> JS CODE </script>
// ------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class:c-scr01_js_truck-
// ------------------------------------------------------------------------------------
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 		: Build html final code for object
// - d-create_script_0N-
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/ea6/com/libs/general/constants.ess"									);

const 	{ getset } 			= 	require(	cons.JS_BASE + 'com/objects/html/getset.es6'										),		
		{ html_style } 		= 	require(	cons.JS_BASE + 'com/objects/html/html_style.es6'									);


class scr06_js_async_truck extends getset  {

    constructor (     thm	              						)
    {   
    // Metodos asincronos

		super()

		this.n							=	'scr01_truck::'						
		this.m							=	'constructor'

		this.thm						=	thm							
	
		this.script_jquery				=	new html_style('script')
		this.script_main				=	new html_style('script')
		this.script_product				=	new html_style('script')
		this.script_flexslider			=	new html_style('script')
		this.script_blazy				=	new html_style('script')

		this.build_data()													

    }

	//[S_01] <script src="https://cdn.jsdelivr.net/blazy/1.8.2/blazy.min.js" defer></script>
    create_blazy()
    {
		this.script_blazy.async				=  	'async'									


		let js_name								=	'blazy.min.js'

		this.script_blazy.src				=  	
				this.thm.u.http_domainbar + 'r_fassets/libs/js/' + js_name 									

		this.script_blazy.pcreate()														
		
		this.code						+=	this.script_blazy.code						
	}		

	//[S_02] <script src="https://code.jquery.com/jquery-2.1.4.min.js" 
	// integrity="sha256-8WqyJLuWKRBVhxXIL1jBDD7SDxU936oZkCnxQbWwJVw=" crossorigin="anonymous" defer></script>
    create_jquery()
    {
		this.script_jquery.async				=  	'async'									

		let js_name								=	'jquery-3.2.1.min.js'

		this.script_jquery.src				=  	
				this.thm.u.http_domainbar + 'r_fassets/libs/js/' + js_name 									

		this.script_jquery.pcreate()														
		
		this.code						+=	this.script_jquery.code						
	}		


	//[S_03] <script src="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.3/jquery.flexslider.min.js" defer></script>
    create_flexslider()
    {
		this.script_flexslider.async				=  	'async'									

		let js_name								=	'jquery.flexslider.min.js'

		this.script_flexslider.src				=  	
				this.thm.u.http_domainbar + 'r_fassets/libs/js/' + js_name 									

		this.script_flexslider.pcreate()														
		
		this.code						+=	this.script_flexslider.code						

	}		


	//[S_09] <script src="assets/js/main.js" defer></script>
	create_main()
    {
		// External Div
		let js_name 								=	'main'									
		
		this.script_main.async						=  	'async'									

		// Live Enviroment

		if ( this.thm.b.site_live ) 		js_name	+=	'_live'

		this.script_main.src				=  	
				this.thm.u.http_domainbar + 'r_assets/js/' + js_name + '_min.js'									
		
		this.script_main.pcreate()														
		
		this.code							+=	this.script_main.code					

	}		

	//[S_09] <script src="assets/js/main.js" defer></script>
	create_product()
    {
		// External Div
		let js_name 								=	'product'									
		
		this.script_main.async						=  	'async'									

		// Live Enviroment

		if ( this.thm.b.site_live ) 		js_name	+=	'_live'

		this.script_main.src				=  	
				this.thm.u.http_domainbar + 'r_assets/js/' + js_name + '_min.js'									
		
		this.script_main.pcreate()														
		
		this.code							+=	this.script_main.code					

	}		

    build_data()
    {
	// To build content is needed to build block

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

		// Pending [17-11-02]
		// this.p('Code : >' + this.code ) 											

    }

}

exports.scr06_js_async_truck = scr06_js_async_truck
