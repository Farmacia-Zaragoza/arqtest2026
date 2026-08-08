// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Section Truck Class  [V.0.1.3]  (2017-07-07)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Theme Truck Section Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//*<section class="flex-slider">
//  <div id="flex-slider-H" class="flexslider"> - External Opcion Front | Product
//  <div id="flex-carousel-H" class="flexslider"> - External
//  <div class="mobile-contacts visible-xxs text-center"> - External
//-------------------------------------------------------------------------------------
// SECTION
//  DIV
//  DIV
//  DIV
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - build_data   	  : Build html final code for object
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


const 	{ html_style } 				= 	require(	path.join(JS_BASE, 'com/objects/html/html_style.es6'));
		const { flx03_div_flex_slider }	= 	require(	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/slider/flx03_div_flex_slider.es6'));
		const { flx03_div_flex_carousel }	= 	require(	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/slider/flx03_div_flex_carousel.es6'));
		const { mob03_div_flex_mobile }	= 	require(	path.join(JS_BASE, 'spc/theme/truck/deep_html/types/mobile_contacts/mob03_div_mobile.es6'));
		const { flx02_ul_flex_middle }	= 	require(	path.join(JS_BASE, 'spc/theme/common/deep_html/slider/flx02_ul_flex.es6'));

class sec02_section_slider_truck extends html_style{

    constructor ( 	thm 														)
   {
        let tag_type                 		=  'section'
		super(	tag_type	)
        this.tag_type                 		=  'section'


        this.n								=	'sec02_section_slider_truck::'

        this.fphone							=	''												 // Fast Node Phone

    // Html Structures

        this.div_01                         =	''

        this.div_02                         =	''

        this.div_03							=	''

		this.class 							=	'flex-slider'

	  	this.thm							=	thm

		this.fnode							=	this.thm.arr['fnode']['image_list']

		this.flinks_lang					=	this.thm.arr['fnode']['link_list_lang']

	   	this.map							=	this.thm.map + 'section/'
	   	this.thm.map						=	this.map


		this.build_data()

    }

	create_flex_slider_home()
	{
		// Flex Slider
		this.div_01							=	new flx03_div_flex_slider(	this.thm 		)

		this.content 						+=	this.div_01.code
	}

	create_flex_slider_product()
	{
		// Flex Slider para un solo producto. Vamos a verlo
		this.div_01							=	new flx03_div_flex_slider(	this.thm 		)

		// this.content 						+=	'PRODUCT_ONLY>'

 		this.content 							+=	this.div_01.code
	}

	create_flex_slider_carousel_home()
	{
		this.div_02							=	new flx03_div_flex_carousel(	this.fnode 	)

		this.content 						+=	this.div_02.code
	}

	create_flex_mobile()
	{
		this.div_03							=	new mob03_div_flex_mobile(	this.thm	)

		this.content 						+=	this.div_03.code
	}


//    <div class="col-sm-3 col-lg-2-point-5 visits-left">
    create_flex()
    {
	  // External div

		this.ul_01							=	new flx02_ul_flex_middle(	this.fnode 		,
																			this.flex_type )


		this.content						=	this.div_row.code
	}


    build_data()
    {

		if (this.thm.b.page_front)
		{
			this.create_flex_slider_home()
			this.create_flex_slider_carousel_home()
		}
		else if (this.thm.b.page_product)
		{
			this.create_flex_slider_product()
			// this.dd('product code >' + this.div_01.code)													;
		}
		else
			this.dd('There is a problem ' + this.thm.u.uri ) 								;

		// Flex carousel sera mostrado solo en home page

	  	this.create_flex_mobile()

		this.pcreate()

		// Ok [17-11-02]
		// this.p('code >' + this.code.length)



	} // End Build Data

}

exports.sec02_section_slider_truck = sec02_section_slider_truck
