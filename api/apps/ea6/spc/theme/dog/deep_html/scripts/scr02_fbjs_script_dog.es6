// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS - FB Script Dog Class  [V.0.0.1]  (2018-01-30)
// Brqx Group - Agile Farmacia Zaragoza Methodology [ES6]
//-------------------------------------------------------------------------------------
// Truck Structure Scripts - Version 01 - Js as scripts
//-------------------------------------------------------------------------------------
// <script src="assets/js/fb.js" async></script>
// ------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class:c-scr01_js_truck-
// ------------------------------------------------------------------------------------
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 		: Build html final code for object
// - d-create_fb-
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ getset } 			= 	require(	path.join(JS_BASE, 'com/objects/html/getset.es6'),
		{ html_style } 		= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'));


class scr02_fbjs_script_dog extends getset  {

    constructor (     thm	              						)
    {

		super()

		this.n							=	'scr02_fbjs_script_dog::'
		this.m							=	'constructor'

		this.thm						=	thm

		this.script_fb					=	new html_style('script')

		this.create_fb()

    }

	// <script src="assets/js/fb.js"></script>
    create_fb()
    {

		let js_name 					=	'fb'

		// this.script_fb.defer			=  	'defer'
		this.script_fb.defer			=  	''

		this.script_fb.async			=  	'async'

		this.script_fb.src				=
			this.thm.u.http_domainbar + 'r_assets/js/' + js_name + '.js'

		this.script_fb.pcreate()

		this.code						+=	this.script_fb.code
	}

}

exports.scr02_fbjs_script_dog  = scr02_fbjs_script_dog
