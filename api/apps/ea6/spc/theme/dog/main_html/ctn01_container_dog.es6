// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Dog Container Class  [V.0.0.3]  (2017-12-17)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Peloncita Structure Header
//-------------------------------------------------------------------------------------
// <div id="container-fluid" class="container-fluid">
// 		<header class="text-center mobile_style">	(external)
//		<section class="lang-grand clearfix">		(external)
// 	  	<section class="flex-slider">				(external)  <div class="policy_content"> (external)
//		<footer class="clearfix">					(external)
//		<div class="captcha-chat">					(external)
// ------------------------------------------------------------------------------------
//* DIV
//	  SOCIAL_LINKS
//    DOG_LINKS
//    BACKGROUND
//    TOP_IMAGES
//	  LANGUAGE_SLIDER
//    SLIDER (row)
//	  LINKS - BUTTONS
//    BOTTOM_ROW
//    BOTTOM_HIDDEN_SLIDER
//    BOTTOM_DOG_BEGIN (happy_dog)
//    BOTTOM_SLIDER
//    COOKIES
//    HELPER_PAGE
//    SOCIAL_LINKS
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 					= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'))),

		{ div21_div_nxm_divs }			= 	require(	path.join(JS_BASE, 'spc/theme/common/structures/divs/div21_div_nxm_divs.es6'))),

		{ div01_slider_row_dog }		= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/row/div01_slider_row_dog.es6'))),

		{ div03_buttons_dog }			= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/buttons/div03_buttons_dog.es6'))),
		// Bottom Menu
		{ div03_menu_dog }				= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/menu/div03_menu_dog.es6'))),

		{ zne04_helper_dog }			= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/helpers/zne04_helper_dog.es6'))),

		{ zne02_hiddens_dog }			= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/hiddens/zne02_hiddens_dog.es6'))),

		{ div03_mobile_langs_dog }		= 	require(	path.join(JS_BASE, 'spc/theme/dog/deep_html/flags/div03_mobile_langs_dog.es6')));


class ctn01_container_dog extends html_style  {

    constructor (     thm						)
    {
        let tag_type     				= 	'div'

       	super(				tag_type	)
        this.tag_type   	  			= 	'div'

		this.n							=	'ctn01_dog::'

		// Html Objects

		this.a_01						=	new html_style('a')

		this.img_01						=	new html_style('img')

		this.div_01						=	new html_style('div')
		this.div_02						=	new html_style('div')
		this.div_03						=	new html_style('div')
		this.div_04						=	new html_style('div')

	    this.miv_01			         	=	''

		this.thm						=	thm

		this.class	 					=	'container-fluid'
		this.id		 					=	'container-fluid'

		this.fnode						=	this.thm.arr['fnode']['image_list']

		// Tenemos que tener como un mapa del site
		this.thm.map					= 	'body/container'


		this.build_data()

    }
	// <div id="truck_links" srcs="faceboook.com google.com"></div>
	create_button_feeds_links()
	{
		// Examples : http://www.elcorteingles.es/electronica/A18147994-monitor-pc-samsung-u28e590d-28-negro-plata-4k-ultra-hd/
		// https://www.facebook.com/sharer.php?src=bm&v=4&i=1517348244120&u=http%3A%2F%2Fwww.elcorteingles.es%2Felectronica%2FA18147994-monitor-pc-samsung-u28e590d-28-negro-plata-4k-ultra-hd%2F&t=Monitor%20PC%20%2071%2C12%20cm%20(28%20%27%27)%20Samsung%20U28E590D%20UHD%204K
		// https://twitter.com/intent/tweet?original_referer=&text=Monitor%20PC%20%2071%2C12%20cm%20(28%20%27%27)%20Samsung%20U28E590D%20UHD%204K&url=http%3A%2F%2Fwww.elcorteingles.es%2Felectronica%2FA18147994-monitor-pc-samsung-u28e590d-28-negro-plata-4k-ultra-hd%2F
		// https://plus.google.com/share?url=http%3A%2F%2Fwww.elcorteingles.es%2Felectronica%2FA18147994-monitor-pc-samsung-u28e590d-28-negro-plata-4k-ultra-hd%2F
		// https://www.pinterest.com/pin/create/button/?url=http%3A%2F%2Fwww.elcorteingles.es%2Felectronica%2FA18147994-monitor-pc-samsung-u28e590d-28-negro-plata-4k-ultra-hd%2F&media=//sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/201602/18/00115216113959____1__440x440.jpg&description=Monitor%20PC%20%2071%2C12%20cm%20(28%20%27%27)%20Samsung%20U28E590D%20UHD%204K

		this.div_01.srcs				= 	"https://faceboook.com/uri_test https://google.com/uri_test"

		this.div_01.id					=	'dog_links'

		this.div_01.pcreate()

		this.content					=	this.div_01.code

	}

	// <div class="row background-container">		(external)
  	create_dog_links()
    {
		let		class_01	= 	'row background-container'
		let  	class_02	=	'row background-row background-row-dark justify-content-center'
		let  	class_03	=	'row background-row background-row-light justify-content-center'

   	 	this.miv_01		=
   					new div21_div_nxm_divs(
						class_01, class_02 , class_03, 10 )


		// Ok
		// this.p('ctnr_miv:cod >' + this.code)

  		this.content			+=	this.miv_01.code

	}

	// <div class="row justify-content-center" id="top-row-images"
	create_top_row_images()
	{
		this.div_02.class		=	'row justify-content-center'
		this.div_02.id			=	"top-row-images"

		//Number of Top Images for
		//LargeDesktop - ImageDesktop - Tablet - LandscapePhone - PortraitPhone

		this.div_02.resnumbers	=	"8,6,5,4,3"

		this.div_02.pcreate()
  		this.content			+=	this.div_02.code
	}

	//<div class="row align-items-center " id="language-slider"></div>
	create_language_slider()
	{
		this.div_03.class		=	'row align-items-center'
		this.div_03.id			=	"language-slider"

		this.div_03.pcreate()
  		this.content			+=	this.div_03.code
	}

	// <div class="row">... resnumbers="6,6,4,4,4"
	create_row_slider()
	{
  		this.miv_02		=
  				new div01_slider_row_dog(	this.thm	)

		// Ok
		//this.p('ctnr_miv:cod >' + this.miv_02.code)

		this.content			+=	this.miv_02.code
	}

	// <div class="row links align-items-center">
	create_links()
	{
  		this.miv_03		=
  				new div03_buttons_dog(	this.thm	)

		// this.p('ctnr_miv:cod >' + this.miv_03.code)

		this.content			+=	this.miv_03.code
	}


	// <div class="row justify-content-center" id="top-row-images"
	create_bottom_row_images()
	{
		this.div_02.class		=	'row justify-content-center tablet'
		this.div_02.id			=	"bottom-row-images"

		this.div_02.style		=	'margin-bottom: 35px;'

		//Number of Top Images for
		//LargeDesktop - ImageDesktop - Tablet - LandscapePhone - PortraitPhone

		// Same numbers
		//this.div_02.resnumbers	=	"8,6,5,4,3"

		this.div_02.pcreate()
  		this.content			+=	this.div_02.code

		// this.p('btnr_div:cod >' + this.div_02.code)

	}

	// <div class="row">
	create_row_slider_bottom()
	{
		// BOTTOM MENU
  		this.miv_02		=
  				new div03_menu_dog(	this.thm	)

		this.content			+=	this.miv_02.code

		// this.p('sldr_miv:cod >' + this.miv_02.code)

	}


	// <div class="row justify-content-center" id="top-row-images"
	create_happy_dog()
	{
		this.img_01.class		=	'black-happy-dog desktop'

		this.img_01.percents	=	'20,10,70'

		this.img_01.pcreate()
  		this.content			+=	this.img_01.code
	}

	// <div class="row justify-content-center cookie-div">
	create_cookies()
	{
		this.div_04.class		= 	'row justify-content-center cookie-div'
		this.div_01.pcreate()
  		this.content			+=	this.div_04.code
	}

	// <div class="mini-edu desktop">
	create_helper_page()
	{
  		this.zone_01		=
  				new zne04_helper_dog(	this.thm	)

		this.content			+=	this.zone_01.code
	}

	create_mobile_langs()
	{
  		this.miv_01		=
  				new div03_mobile_langs_dog(	this.thm	)

		this.content			+=	this.miv_01.code
	}

	create_hidden_elems()
	{

		this.zone_02			=	new zne02_hiddens_dog(this.thm)

		this.content			+=	this.zone_02.code

	}

	// <a id="facebook-link" 	href="https://www.facebook.com/edubuscanovia/"></a>
	create_social_links()
	{
		this.a_01.id			=	'facebook-link'
		this.a_01.href			=	this.thm.s.facebook
		this.a_01.pcreate()

		this.content			+=	this.a_01.code

		this.a_01.id			=	'twitter-link'
		this.a_01.href			=	this.thm.s.twitter
		this.a_01.pcreate()

		this.content			+=	this.a_01.code

		this.a_01.id			=	'google-link'
		this.a_01.href			=	this.thm.s.googleplus
		this.a_01.pcreate()

		this.content			+=	this.a_01.code

		this.a_01.id			=	'linkedin-link'
		this.a_01.href			=	this.thm.s.linkedin
		this.a_01.pcreate()

		this.content			+=	this.a_01.code

	}

    build_data()
    {
	// Structure Container
	// [DOG_LINKS] [SECTION] [SECTION] [FOOTER] [CAPTCHA]

		this.content			=	''

		this.create_button_feeds_links()

		this.create_dog_links()

		this.create_top_row_images()

		this.create_language_slider()

		this.create_row_slider()

		this.create_links()

		this.create_bottom_row_images()

		this.create_row_slider_bottom()

		this.create_happy_dog()

		this.create_cookies()

		this.create_helper_page()

		this.create_mobile_langs()

		this.create_hidden_elems()

		this.create_social_links()

		this.pcreate()

		// Ok [18-01-03]
		// this.p('ctnr:codl >' + this.code.length)
		// this.p('ctnr:cod >' + this.code)

    }

}

exports.ctn01_container_dog = ctn01_container_dog
