// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS - Dog Script Head Minimized Class  [V.0.0.1]  (2018-01-30)
// Brqx Group - Agile Farmacia Zaragoza Methodology [ES6]
//-------------------------------------------------------------------------------------
// Truck Structure Scripts - Version 01 - Js as scripts
//-------------------------------------------------------------------------------------
//S[01] <script defer src="https://use.fontawesome.com/releases/v5.0.1/js/all.js"></script>
// ------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class:c-scr01_js_truck-
// ------------------------------------------------------------------------------------
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 		: Build html final code for object
// - d-create_script_0N-
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ getset } 			= 	require(	path.join(JS_BASE, 'com/objects/html/getset.es6'))),
		{ html_style } 		= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6')));


class scr03_jshead_minimized_dog extends getset  {

    constructor (     thm	              						)
    {

		super()

		this.n							=	'scr01_truck::'
		this.m							=	'constructor'

		this.thm						=	thm

		this.script_font				=	new html_style('script')

		this.create_font()

    }

	//S[01] <script defer src="https://use.fontawesome.com/releases/v5.0.1/js/all.js"></script>
    create_font()
    {
		this.script_font.defer				=  	'defer'


		let js_name							=	'all.js'

		let font_path					=	'fontawesome/releases/v5.0.1/js/' 	+ js_name

		this.script_font.src				=
				this.thm.u.http_domainbar + 'r_fassets/libs/' + font_path

		this.script_font.pcreate()

		this.code							+=	this.script_font.code
	}

}

exports.scr03_jshead_minimized_dog = scr03_jshead_minimized_dog
