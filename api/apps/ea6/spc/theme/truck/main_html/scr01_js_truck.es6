// [DOCHANGED_PHP52_ES6]
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS - Truck Scripts Class  [V.0.0.5]  (2017-12-06)
// Brqx Group - Agile Farmacia Zaragoza Methodology [EA6]
//-------------------------------------------------------------------------------------
// Truck Structure Scripts
//-------------------------------------------------------------------------------------
//[S_01] <script src="https://cdn.jsdelivr.net/blazy/1.8.2/blazy.min.js" defer></script>
//[S_02] <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous" defer></script>

//[S_03] <script src="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.3/jquery.flexslider.min.js" defer></script>
//[S_04] <script src="cassets/js/marqueedirection.js" defer></script>
//[S_05] <script src="cassets/js/client_captcha.js" defer></script>
//[S_06] <script src="cassets/js/driftInit.js" defer></script>
//[S_07] <script src="fassets/js/full_common.js" defer></script>
//[S_08] <script src="assets/js/common.js" defer></script>
//[S_09] <script src="assets/js/main.js" defer></script>
//[S_10] <script src="assets/js/cookies.js" defer></script>

// ------------------------------------------------------------------------------------
//* SCRIPT *
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class:c-scr01_js_truck-
// ------------------------------------------------------------------------------------
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 		: Build html final code for object
// - d-create_script_0N-
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ getset } 						= 	require(path.join(JS_BASE, 'com/objects/html/getset.es6'))
		const { html_style } = require(path.join(JS_BASE, 'com/objects/html/html_style.es6'))
		const { scr02_js_as_scripts_truck } = require(path.join(JS_BASE, 'spc/theme/truck/deep_html/types/scripts/scr02_js_as_scripts_truck.es6'))
		const { scr03_js_minimized_truck } = require(path.join(JS_BASE, 'spc/theme/truck/deep_html/types/scripts/scr03_js_minimized_truck.es6'))
		const { scr04_js_inline_truck } = require(path.join(JS_BASE, 'spc/theme/truck/deep_html/types/scripts/scr04_js_inline_truck.es6'))
		const { scr05_js_inline_truck } = require(path.join(JS_BASE, 'spc/theme/truck/deep_html/types/scripts/scr05_js_inline_multiple_truck.es6'))
		const { scr06_js_async_truck } = require(path.join(JS_BASE, 'spc/theme/truck/deep_html/types/scripts/scr06_js_async_truck.es6'))
		const { cn03_scripts } = require(path.join(JS_BASE, 'spc/theme/common/fast_node/cnode/cn03_scripts.es6'))

class scr01_js_truck extends getset  {

    constructor (     thm	              						)
    {
		super()

		this.n							=	'scr01_truck::'
		this.m							=	'constructor'

		this.thm						=	thm

		// External object
		this.script_to_load				=	''
		this.script_to_load2				=	''

		// Composition object
	 	this.compo_scripts				=	''

		this.script_cookies				=	new html_style('script')
		this.script_marquee				=	new html_style('script')
		this.script_drift				=	new html_style('script')
		this.script_captcha				=	new html_style('script')
		this.script_common				=	new html_style('script')
		this.script_full_common			=	new html_style('script')

		this.build_data()

    }

	//[S_04] <script src="cassets/js/marqueedirection.js" defer></script>
	create_marquee()
    {
		// External Div

		this.script_marquee.defer				=  	'defer'

		this.script_marquee.src				=
				this.thm.u.http_domainbar + 'r_cassets/js/marqueedirection.js'
		this.script_marquee.pcreate()

		this.code							+=	this.script_marquee.code

	}

	//[S_04] <script src="cassets/js/client_captcha.js" defer></script>
	create_captcha()
    {
		// External Div

		this.script_captcha.defer				=  	'defer'

		this.script_captcha.src				=
				this.thm.u.http_domainbar + 'r_cassets/js/client_captcha.js'

		this.script_captcha.pcreate()

		this.code							+=	this.script_captcha.code

	}

	//[S_07] <script src="cassets/js/driftInit.js" defer></script>

	create_drift()
    {
		// External Div

		this.script_drift.defer				=  	'defer'

		this.script_drift.src				=
				this.thm.u.http_domainbar + 'r_cassets/js/driftInit.js'

		this.script_drift.pcreate()

		this.code							+=	this.script_drift.code

	}

	//[S_07] <script src="assets/js/full_common.js" defer></script>
	create_full_common()
    {
		// External Div
		let js_name 								=	'full_common'

		this.script_full_common.defer				=  	'defer'

		// Live Enviroment

		this.script_full_common.src				=
			this.thm.u.http_domainbar + 'r_fassets/js/' + js_name + '.js'

		this.script_full_common.pcreate()

		this.code							+=	this.script_full_common.code

	}

	//[S_08] <script src="assets/js/common.js" defer></script>
	create_common()
    {
		// External Div
		let js_name 								=	'common'

		this.script_common.defer						=	'defer'

		// Live Enviroment

		this.script_common.src				=
			this.thm.u.http_domainbar + 'r_assets/js/' + js_name + '.js'

		this.script_common.pcreate()

		this.code							+=	this.script_common.code

	}

	//[S_10] <script src="assets/js/cookies.js" defer></script>
	create_cookies(num = 9)
    {
		// External Div
		let js_name 								=	'cookies'

		this.script_cookies.defer						=  	'defer'

		// Live Enviroment

		this.script_cookies.src				=
			this.thm.u.http_domainbar + 'r_assets/js/' + js_name + '.js'

		this.script_cookies.pcreate()

		this.code							+=	this.script_cookies.code

	}

	check_loaded_scripts()
	{
		this.head_code = ''

		this.compo_scripts	= new cn03_scripts(this.thm.u , 'scripts')

		if ( this.compo_scripts.is_correct_to_reload_type() )
		{

			if ( !this.thm.b.site_live )
			{
				this.script_to_load 	= 	new scr02_js_as_scripts_truck(this.thm)

				// DEV - requiere primero los otro scripts
				this.code 					+= 	this.script_to_load.script_blazy.code
				this.code 					+= 	this.script_to_load.script_jquery.code
				this.code 					+= 	this.script_to_load.script_flexslider.code

				this.create_marquee()			// Marqueedirection
				this.create_captcha()			// Captcha
				this.create_drift()				// Drift
				this.create_full_common()		// Full_common
				this.create_common()			// Common

				// MAIN - PRODUCT
				this.code					+=	this.script_to_load.productcode

				this.create_cookies()			// Cookies
			}
			else
			{
				// LIVE
				// Esta parte puede generarse de muchas formas
				// 1.como script
				// 2.como script minimizado
				// 3.inline
				if 			( this.thm.s.live_opt === 'script')
					this.script_to_load 	= 	new scr02_js_as_scripts_truck(this.thm)
				else if 	( this.thm.s.live_opt === 'minimized')
					this.script_to_load 	= 	new scr03_js_minimized_truck(this.thm)
				else if 	( this.thm.s.live_opt === 'inline')
					this.script_to_load 	= 	new scr05_js_inline_truck(this.thm)
				else if 	( this.thm.s.live_opt === 'inline_and_save')
				{
					this.script_to_load 	= 	new scr05_js_inline_truck(this.thm)
					this.script_to_load2 	= 	new scr06_js_async_truck(this.thm)
				}

				else
					this.p('wrong_parameter ' + this.thm.s.live_opt )

				this.code					+=	this.script_to_load.code

				if 	( this.thm.s.live_opt === 'inline_and_save')
					this.code				+=	this.script_to_load2.code
			}

			// Actualizamos el codigo del objeto
			this.compo_scripts.load_type_details(this.code)
		}

		this.code	=	this.compo_scripts.code

	}

    build_data()
    {

		this.check_loaded_scripts()

		// Ok [18-01-12]
		// this.p('Code : >' + this.code )

    }

}

exports.scr01_js_truck = scr01_js_truck

