//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Helper Dog Div Class  [V.0.0.1]  (2018-02-01)
//Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
//Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------
// PENDING FOR FINAL DESIGN
//* <div class="info-cloud">
//	  div (external)
//       <img src="img/box/brqx_2017_dev_live_green_050.svg" data-content="Some text about dev/live" data-header="Dev/live" alt="" class="info-cloud-top-row-button cloud-live-button">
//	  div (external)
//	  	<img src="img/box/brqx_2017_html_php_green_050.svg" data-content="Some text about html/php" data-header="Html/Php" alt="" class="info-cloud-top-row-button cloud-html-php-button">
//	  div (external)
//	  	<img src="img/box/brqx_2017_http_https_green_050.svg" data-content="Some text about http/https" data-header="Https/Http" alt="" class="info-cloud-top-row-button cloud-http-https-button">
//	  div (external)
//	  	<img src="img/box/brqx_2017_anon_auth_green_050.svg" data-content="Some text about anon/auth" data-header="Anon/Auth" alt="" class="info-cloud-top-row-button cloud-anon-auth-button">
//	  div (external)
//	  	<img src="img/box/brqx_2017_user_human_red_050.svg" data-content="Some text about human/robot" data-header="Human/Robot" alt="" class="info-cloud-top-row-button cloud-user-human-button">
//	  <div data-toggle="popover" data-trigger="focus" (external)
//     div
//	  div (external)
//	  	<img data-toggle="popover" data-trigger="focus" title="Navigation" data-content="Click to enable|disable navigation with keyboard." src="img/box/brqx_2017_keyboard_enabled_green_100.svg" alt="" class="info-cloud-bot-row-button keyboard-button" >
//	  div (external)
//	  	<img data-toggle="popover" data-trigger="focus" title="Scroll" data-content="Click to enable|disable auto scrolling of text." src="img/box/brqx_2017_auto_scroll_enabled_green_100.svg" alt="" class="info-cloud-bot-row-button auto-scroll-button" >
//-------------------------------------------------------------------------------------
//* DIV
//   DIV 	* 5
//	   IMG
//   DIV (external
//	 DIV    * 2
//     IMG
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
//Methods:
//-------------------------------------------------------------------------------------
//- build_data       : Build html final code for object
//==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

const 	{ html_style } 						= 	require(path.join(JS_BASE, 'com/objects/html/html_style.es6'))
		const empty = require(	'is_empty'															);
		const { div01_helper_button_dog } = require(path.join(JS_BASE, 'spc/theme/dog/deep_html/helpers/div01_helper_button_dog.es6'))
		const { div01_helper_arrow_sizer_dog } = require(path.join(JS_BASE, 'spc/theme/dog/deep_html/helpers/div01_helper_arrow_sizer_dog.es6'))

class div02_helper_dog extends html_style {

	constructor(thm)
	{
		let tag_type 				= 	"div"

		super(tag_type)
		this.n 						= 	"flg02_div::"
		this.num_elements_menu 		= 	""

		this.tag_type 				= 	"div"
		this.class 					= 	"info-cloud"
		this.thm 					= 	thm
		this.fnode 					= 	this.thm.arr['fnode']['flag_list']

		// We will use reload method
		this.miv_01 				= 	new div01_helper_button_dog (this.thm)

		this.miv_02 				= 	new div01_helper_arrow_sizer_dog (this.thm)

		this.build_data()
	}

	// img src="img/box/brqx_2017_dev_live_green_050.svg"
	create_div_01()
	{
		let class			=	'info-cloud-top-row-button cloud-live-button'
		let svg_file		=	'brqx_2017_dev_live_green_050.svg'

		this.miv_01.reload(	'r_img/box/'					, // path
							svg_file						, // svg
							class							, // class
							this.thm.s.nfo_text_dev_live	, // header - text
							this.thm.s.nfo_desc_dev_live	) // content

		this.content				+=	this.miv_01.code
	}

	// img src="img/box/brqx_2017_html_php_green_050.svg"
	create_div_02()
	{
		// Ojo que puede ser green or red depending of load
		// Debe gestionarse en conjunto

		let class			=	'info-cloud-top-row-button cloud-html-php-button'
		let svg_file		=	'brqx_2017_html_php_green_050.svg'

		this.miv_01.reload(	'r_img/box/'					, // path
							svg_file						, // svg
							class							, // class
							this.thm.s.nfo_text_html_php	, // header
							this.thm.s.nfo_desc_html_php	) // content

		this.content				+=	this.miv_01.code
	}

	// img src="img/box/brqx_2017_http_https_green_050.svg"
	create_div_03()
	{
		let class			=	'info-cloud-top-row-button cloud-http-https-button'
		let svg_file		=	'brqx_2017_http_https_green_050.svg'

		this.miv_01.reload(	'r_img/box/'					, // path
							svg_file						, // svg
							class							, // class
							this.thm.s.nfo_text_http_https	, // header
							this.thm.s.nfo_desc_http_https	) // content

		this.content				+=	this.miv_01.code
	}

	// img src="img/box/brqx_2017_anon_auth_green_050.svg"
	create_div_04()
	{
		let class			=	'info-cloud-top-row-button cloud-anon-auth-button'
		let svg_file		=	'brqx_2017_anon_auth_green_050.svg'

		this.miv_01.reload(	'r_img/box/'					, // path
							svg_file						, // svg
							class							, // class
							this.thm.s.nfo_text_anon_auth	, // header
							this.thm.s.nfo_desc_anon_auth	) // content

		this.content				+=	this.miv_01.code
	}

	// img src="img/box/brqx_2017_user_human_red_050.svg"
	create_div_05()
	{

		let class			=	'info-cloud-top-row-button cloud-user-human-button'
		let svg_file		=	'brqx_2017_user_human_red_050.svg'

		this.miv_01.reload(	'r_img/box/'					, // path
							svg_file						, // svg
							class							, // class
							this.thm.s.nfo_text_user_human	, // header
							this.thm.s.nfo_desc_user_human	) // content

		this.content				+=	this.miv_01.code
	}
	// <div data-toggle="popover" (external arrow sizer)
	create_div_06()
	{
		this.content				+=	this.miv_02.code
	}

	// src="img/box/brqx_2017_keyboard_enabled_green_100.svg"
	create_div_07()
	{
		let class			=	'info-cloud-bot-row-button keyboard-button'
		let svg_file		=	'brqx_2017_keyboard_enabled_green_100.svg'

		this.miv_01.reload(	'r_img/box/'					, // path
							svg_file						, // svg
							class							, // class
							''								, // header - text
							this.thm.s.nfo_desc_navigation	, // content
							this.thm.s.nfo_tit_navigation	, // title
							'popover'						, // toggle
							'focus'							) // trigger

		this.content		+=	this.miv_01.code
	}

	create_div_08()
	{

		let class			=	'info-cloud-bot-row-button auto-scroll-button'
		let svg_file		=	'brqx_2017_auto_scroll_enabled_green_100.svg'

		this.miv_01.reload(	'r_img/box/'					, // path
							svg_file						, // svg
							class							, // class
							''								, // header - text
							this.thm.s.nfo_desc_scrolling	, // content
							this.thm.s.nfo_tit_scrolling	, // title
							'popover'						, // toggle
							'focus'							) // trigger

		this.content		+=	this.miv_01.code
	}

	build_data()
	{
		this.content = ""

		this.create_div_01()
		this.create_div_02()
		this.create_div_03()
		this.create_div_04()
		this.create_div_05()
		this.create_div_06()
		this.create_div_07()
		this.create_div_08()

		this.pcreate()

		//Ok [17-06-24]
		this.p('flg_Code > ' +  this.code)

	}

}

exports.div03_helper_dog = div03_helper_dog

