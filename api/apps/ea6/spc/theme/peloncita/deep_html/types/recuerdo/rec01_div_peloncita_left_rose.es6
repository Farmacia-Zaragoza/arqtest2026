// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.0.3]  (2016-11-11)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
// Peloncita Structure - Roses
//------------------------------------------------------------------------------------------------
//	<!-- Level 08:DIV 	Revel 06			-.
//  <div class="left rose">
//    <!-- Left side rose.This div is repeaed two times with left/right class.-.
//        <a href="#" class="image-wrapper">
//            <img class="img-responsive b-lazy" data-src="images/rose.png" data-src-small="" src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="">
//        <div class="link-explanation">
//            Imágenes VivasImágenes PersonalesEnlace Selección2005-08-24T00:00:00
// ------------------------------------------------------------------------------------
//*DIV
//  A
//	  IMG
//  DIV
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update value for local attributes
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--


class rec01_div_peloncita_left_rose extends html_style  {


    constructor (fnode)

    {
        this.tag_type     			= 	'div'

		this.n						=	'left_rose::'

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


//  <img class="img-responsive b-lazy" data-src="images/rose.png" data-src-small="" src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="">

	create_img_01()
	{
		this.img_01.class 		=	"img-responsive b-lazy"
		this.img_01.src 			=	"data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="

		rose_img					= 	'resp_images/rose.png'
		this.img_01.data_src		=	this.fnode.u.site_url + rose_img

		this.img_01.title		=	'Titulo rosa'
		this.img_01.alt			=	'Alt Rosa'

		this.img_01.pcreate()

		this.a_01.content		 = this.img_01.code

	}

//  <img class="b-lazy focus-icon"
//	src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="Focus placeholder icon" data-src="images/focus.svg" alt="">


//        <div class="link-explanation">
//            Imágenes VivasImágenes PersonalesEnlace Selección2005-08-24T00:00:00
	create_div_01()
	{
		this.div_01.class 		="link-explanation"
		this.div_01.content		="Anupam && Brqx - Imágenes VivasImágenes PersonalesEnlace Selección 2005-08-24"

		this.div_01.pcreate()

		this.content 				+=	this.div_01.code
	}


//        <a href="#" class="image-wrapper">
//            <img class="img-responsive b-lazy" data-src="images/rose.png" data-src-small="" src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="">
	create_a_01()
	{
		this.a_01.class 			+=		'image-wrapper'

		this.create_img_01()

		this.a_01.pcreate()

		this.content				+=		this.a_01.code
	}




	//  <div class="single-image">
	build_data()
	{
		this.class 			=	'left rose'

		this.content			= ''

		this.create_a_01()

		this.create_div_01()


		this.pcreate()

//        puting_contents=this.n + 'Code:>' + this.code.'>'
//        GLOBALS['putcont']+=puting_contents


	}

}

exports.rec01_div_peloncita_left_rose = rec01_div_peloncita_left_rose

