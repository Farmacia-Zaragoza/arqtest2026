// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.0.3]  (2016-11-11)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
// Peloncita Structure - Roses
//------------------------------------------------------------------------------------------------
//	<!-- Level 08:DIV 	Revel 06			-.
//  <div class="right rose">
//        <a href="#" class="image-wrapper visible-md visible-lg">
//            <img class="img-responsive b-lazy" data-src="images/rose.png" data-src-small="" src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="">
//       <div class="link-explanation">
//            2005_Esp - Zaragoza - El amor emerge sobre la grandeza del Ebro - España - seleccion
//        <!-- Second rose is repeated two times.this will show on tablet/mobile-.
//        <a href="#" class="image-wrapper hidden-md hidden-lg">
//            <img class="img-responsive b-lazy" data-src="images/rose.png" data-src-small="" src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="">
// ------------------------------------------------------------------------------------
//*DIV
//  A
//	  IMG
//  DIV
//	A
//	  IMG
	// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update value for local attributes
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


class rec01_div_peloncita_right_rose extends html_style  {


    constructor (	fnode			=	''						)
    {
        this.tag_type     			= 	'div'

		this.fnode					=	fnode


    	super.constructor(this.tag_type)

		this.a_01		= 	new html_style('a')

		this.img_01	= 	new html_style('img')
		this.div_01	= 	new html_style('div')


		this.build_data()
    }


    clean_objects()
    {
		this.clean()
	}


// <img class="img-responsive b-lazy" data-src="images/rose.png" data-src-small="" src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="">

	create_img_01()
	{
		this.img_01.class 		=	"img-responsive b-lazy"
		this.img_01.src 			=	"data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="

		rose_img					= 	'resp_images/rose.png'
		this.img_01.data_src		=	this.fnode.u.site_url + rose_img

		this.img_01.title		=	'Titulo rosa'
		this.img_01.alt			=	'Alt Rosa'

		this.img_01.pcreate()

	}



	create_div_01()
	{
		this.div_01.class 		="link-explanation"
		this.div_01.content		="Anupam && Brqx - 2005_Esp - Zaragoza - El amor emerge sobre la grandeza del Ebro - España - seleccion"

		this.div_01.pcreate()

		this.content 				+=	this.div_01.code
	}

//   <a href="#" class="image-wrapper visible-md visible-lg">
	create_a_01()
	{
		this.a_01.class 			+=		'image-wrapper  visible-md visible-lg'
		this.create_img_01()

		this.a_01.content		=		this.img_01.code

		this.a_01.pcreate()

		this.content				+=		this.a_01.code
	}

//        <a href="#" class="image-wrapper hidden-md hidden-lg">
	create_a_02()
	{
		this.a_01.class 			+=		'image-wrapper hidden-md hidden-lg'
		this.a_01.pcreate()

		this.content				+=		this.a_01.code
	}




	build_data()
	{
		this.class 			=	'right rose'

		this.content			= ''

		this.create_a_01()

		this.create_div_01()

		this.create_a_02()

		this.pcreate()

	}

}

exports.rec01_div_peloncita_right_rose = rec01_div_peloncita_right_rose

