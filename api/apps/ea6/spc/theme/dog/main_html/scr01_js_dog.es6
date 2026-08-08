// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node JS - Dog Scripts Class  [V.0.0.1]  (2018-02-01)
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
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Class:c-scr01_js_dog-
// ------------------------------------------------------------------------------------
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 		: Build html final code for object
// - d-create_marquee-		: Create marquee script
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ getset } 						= 	require(	path.join(JS_BASE, 'com/objects/html/getset.es6'));
		const { html_style } 					= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'));
		const { scr02_js_scripts_dog }		= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/scripts/scr02_js_scripts_dog.es6'));
		const { scr03_js_minimized_dog }		= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/scripts/scr03_js_minimized_dog.es6'));
		const { scr05_js_inline_dog }			= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/scripts/scr05_js_inline_dog.es6'));
		const { scr06_js_async_dog }			= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/scripts/scr06_js_async_dog.es6'));
		const { cn03_scripts } 				= 	require(	path.join(JS_BASE, 'spc/theme/common/fast_node/cnode/cn03_scripts.es6'));


class scr01_js_dog extends getset  {

    constructor (     thm	              						)
    {
		super()

		this.n							=	'scr01_dog::'
		this.m							=	'constructor'

		this.thm						=	thm

		// External object
		this.script_to_load				=	''
		this.script_to_load2				=	''

		// Composition object
	 	this.compo_scripts				=	''

		this.build_data()
    }


	check_loaded_scripts()
	{
		this.head_code = ''

		this.compo_scripts	= new cn03_scripts(this.thm.u , 'scripts')

		if ( this.compo_scripts.is_correct_to_reload_type() )
		{

			if ( !this.thm.b.site_live )
			{
				this.script_to_load 	= 	new scr02_js_scripts_dog(this.thm)

				// DEV - requiere primero los otro scripts

				// MAIN - PRODUCT
				this.code					+=	this.script_to_load.code

			}
			else
			{
				// LIVE
				// Esta parte puede generarse de muchas formas
				// 1.como script
				// 2.como script minimizado
				// 3.inline
				if 			( this.thm.s.live_opt === 'script')
					this.script_to_load 	= 	new scr02_js_scripts_dog(this.thm)
				else if 	( this.thm.s.live_opt === 'minimized')
					this.script_to_load 	= 	new scr03_js_minimized_dog(this.thm)
				else if 	( this.thm.s.live_opt === 'inline')
					this.script_to_load 	= 	new scr05_js_inline_dog(this.thm)
				else if 	( this.thm.s.live_opt === 'inline_and_save')
				{
					this.script_to_load 	= 	new scr05_js_inline_dog(this.thm)
					// this.script_to_load2 	= 	new scr06_js_async_dog(this.thm)
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
		// this.p('js_Code : >' + this.code )

    }

}

exports.scr01_js_dog = scr01_js_dog
