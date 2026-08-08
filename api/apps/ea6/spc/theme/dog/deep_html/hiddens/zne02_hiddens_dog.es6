//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Hiddens Zone Dog Class  [V.0.0.1]  (2018-02-01)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
// <div class="hiddendata text-for-facebook-popover" text-data="Click to show Facebook feed."></div>
// <div class="hiddendata text-for-linkedin-popover" text-data="Click to show LinkedIn feed." ></div>
// <div class="hiddendata text-for-google-popover" text-data="Click to show Google feed." ></div>
// <div class="hiddendata text-for-twitter-popover" text-data="Click to show Twitter feed." ></div>
// <div class="hiddendata text-for-brightness-popover" text-data="Click to adjust brightness of the page." ></div>
// <div class="hiddendata text-for-cookies-popover" text-data="Click to show cookies page." ></div>
// <div class="hiddendata text-for-facebook-warning" text-data="Please log in to Facebook to see facebook feed!" ></div>
// <div class="hiddendata follow-word" text-data="Follow"></div>
// <div class="hiddendata info-page-description" text-data="Click to proceed to the information page."></div>
// <div class="hiddendata close-word" text-data="Close"></div>
// <div class="hiddendata back-word" text-data="Close"></div>
// <div class="hiddendata text-for-first-swuare-button-popover" text-data="Click to go to the ... page" ></div>
// <div class="hiddendata text-for-first-square-button-title" text-data="Page name" ></div>
// <div class="hiddendata text-for-second-swuare-button-popover" text-data="Click to go to the ... page" ></div>
// <div class="hiddendata text-for-second-square-button-title" text-data="Page name" ></div>
//-------------------------------------------------------------------------------------
//* DIV * N
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 						= 	require(	"/brqx/base/rcode/es6/com/libs/general/constants.es6"						)

const 	{ html_style } 				= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'),
		{ div01_hiddens_dog }		= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/hiddens/div01_hiddens_dog.es6'),
		{ getset } 					= 	require(	path.join(JS_BASE, 'com/objects/html/getset.es6'));

class zne02_hiddens_dog extends getset {

	constructor(thm) 
	{
		super()
		this.n 						= 	"zne02_hiddens_dog::"

		this.thm 					= 	thm

		this.flang 					= 	this.thm.arr['fnode']['flag_list']

		this.fhidd 					= 	this.thm.arr['fnode']['site_hiddens_lang']

		this.fcomm 					= 	this.thm.arr['fnode']['site_info_common']

		this.div_01					=	new html_style('div')

		this.miv_01					=	new div01_hiddens_dog()

		// Variable to manage multiple content
		this.zone_01				=	''
		
		// this.miv_01 				= 	new div02_helper_dog (this.thm)

		this.build_data()
	}




	// <div class="hiddendata text-for-sandbox" text-data="
	create_sandbox()
	{
		this.div_01.class 			= 	'hiddendata text-for-sandbox'
		// Sandbos is in efill
		this.p('Num_elems Fill ' + this.fhidd.arr['lfill'].length )

		var	lines					=	''

		for (var pos in this.fhidd.arr['lfill'])
		{
			lines					+=	this.fhidd.arr['lfill'][pos]
		}

		this.div_01.text_data			= 	lines
		this.div_01.pcreate()
		
		this.code 					+=	this.div_01.code
	}

	create_hiddens()
	{
		// <div class="" text-data="Click to show Facebook feed."></div>
		this.div_01.class 			=	'hiddendata text-for-facebook-popover'
		this.div_01.text_data		=	this.fhidd.s.facebook_popover
		this.div_01.pcreate()
		this.code					+=	this.div_01.code
	
		// <div class="" text-data="Click to show LinkedIn feed." ></div>
		this.div_01.class 			=	'hiddendata text-for-linkedin-popover'
		this.div_01.text_data		=	this.fhidd.s.linkedin_popover
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Click to show Google feed." ></div>
		this.div_01.class 			=	'hiddendata text-for-google-popover'
		this.div_01.text_data		=	this.fhidd.s.google_popover
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Click to show Twitter feed." ></div>
		this.div_01.class 			=	'hiddendata text-for-twitter-popover'
		this.div_01.text_data		=	this.fhidd.s.twitter_popover
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Click to adjust brightness of the page." ></div>
		this.div_01.class 			=	'hiddendata text-for-brightness-popover'
		this.div_01.text_data		=	this.fhidd.s.brightness_popover
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Click to show cookies page." ></div>
		this.div_01.class 			=	'hiddendata text-for-cookies-popover'
		this.div_01.text_data		=	this.fhidd.s.cookies_popover
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Please log in to Facebook to see facebook feed!" ></div>
		this.div_01.class 			=	'hiddendata text-for-facebook-warning"'
		this.div_01.text_data		=	this.fhidd.s.facebook_warning
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Follow"></div>
		this.div_01.class 			=	'hiddendata follow-word'
		this.div_01.text_data		=	this.fhidd.s.follow_word
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Click to proceed to the information page."></div>
		this.div_01.class 			=	'hiddendata info-page-description'
		this.div_01.text_data		=	this.fhidd.s.info_page_description
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Close"></div>
		this.div_01.class 			=	'hiddendata close-word'
		this.div_01.text_data		=	this.fhidd.s.close_word
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Close"></div>
		this.div_01.class 			=	'hiddendata back-word'
		this.div_01.text_data		=	this.fhidd.s.back_word
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Click to go to the ... page" ></div>
		this.div_01.class 			=	'hiddendata text-for-first-swuare-button-popover'
		this.div_01.text_data		=	this.fhidd.s.first_swuare_button_popover
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Page name" ></div>
		this.div_01.class 			=	'hiddendata text-for-first-square-button-title'
		this.div_01.text_data		=	this.fhidd.s.first_square_button_title
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Click to go to the ... page" ></div>
		this.div_01.class 			=	'hiddendata text-for-second-swuare-button-popover'
		this.div_01.text_data		=	this.fhidd.s.second_swuare_button_popover
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Page name" ></div>
		this.div_01.class 			=	'hiddendata text-for-second-square-button-title'
		this.div_01.text_data		=	this.fhidd.s.second_square_button_title
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Click to increase|decrease text's font size."></div>
		this.div_01.class 			=	'hiddendata font-size-text'
		this.div_01.text_data		=	this.fhidd.s.font_size_text
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="hiddendata font-size-title" text-data="Font size."></div>
		this.div_01.class 			=	'hiddendata font-size-title'
		this.div_01.text_data		=	this.fhidd.s.font_size_title
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Click to enable|disable navigation with keyboard."></div>
		this.div_01.class 			=	'hiddendata navigation-text'
		this.div_01.text_data		=	this.fhidd.s.navigation_text
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Navigation"></div>
		this.div_01.class 			=	'hiddendata navigation-title'
		this.div_01.text_data		=	this.fhidd.s.navigation_title
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Click to enable|disable auto scrolling of text."></div>
		this.div_01.class 			=	'hiddendata scroll-text'
		this.div_01.text_data		=	this.fhidd.s.scroll_text
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		// <div class="" text-data="Scroll"></div>
		this.div_01.class 			=	'hiddendata scroll-title'
		this.div_01.text_data		=	this.fhidd.s.scroll_title
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

		
	}

	// <div class="hiddendata text-for-sandbox" text-data="
	create_cookies_warning()
	{
		this.div_01.class 			= 	'hiddendata cookies-warning-text'
		// Sandbos is in efill
		this.p('Num_elems Cook ' + this.fhidd.arr['lcokw'].length )

		var	lines					=	''

		for (var pos in this.fhidd.arr['lcokw'])
		{
			lines					+=	this.fhidd.arr['lcokw'][pos]
		}

		this.div_01.text_data			= 	lines
		this.div_01.pcreate()
		
		this.code 					+=	this.div_01.code
	}

	// <div class="hiddendata font-size" font-data="14px" ></div>
	create_font()
	{
		this.div_01.class 			=	'hiddendata font-size'
		
		// this.p('FontSize ' + this.fcomm.s.font_size)
		this.div_01.font_data		=	this.fcomm.s.font_size
		this.div_01.pcreate()
		this.code					+=	this.div_01.code

	}

	create_site_content()
	{
		this.div_01.class 			= 	'hiddendata marquee-text-text'
		// Sandbos is in efill
		this.p('Num_elems Content ' + this.fhidd.arr['lines'].length )

		var	lines					=	''

		for (var pos in this.fhidd.arr['lines'])
		{
			lines					+=	this.fhidd.arr['lines'][pos]
		}

		this.div_01.text_data			= 	lines
		this.div_01.pcreate()
		
		this.code 					+=	this.div_01.code
	}

	create_lang()
	{
		for (var slide_num in this.flang.arr['lan']) 
		{
			var current_lan 		= 	this.flang.arr['lan'][slide_num]
			var current_title 		= 	this.flang.arr['tit'][slide_num]

			var uri_lan				=	this.thm.u.http_domainbar +  current_lan	
			var class_lan			=	'hiddendata ' + current_lan + '-link'


			if (!empty(current_lan)) 
			{
				// Every Lang will have different order
				// then is not needed active parameter in dog
		
				this.miv_01.reload_contents( 	class_lan		, 
												uri_lan			)

				this.code 			+= 	this.miv_01.code
			}
		}
		
	}


	build_data() 
	{
		// Is a zone. Only have code
		
		this.create_sandbox()
		this.create_hiddens()
		this.create_cookies_warning()
	
		// dog text
		this.create_site_content()
		
		this.create_font()
		
		// Create Hidden for langs
		this.create_lang()


		// Ck [18-02-06]
		// this.p('zne_Code > ' +  this.code)												

	}

}

exports.zne02_hiddens_dog = zne02_hiddens_dog