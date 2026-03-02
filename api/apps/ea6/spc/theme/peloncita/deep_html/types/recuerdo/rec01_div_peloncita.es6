// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.0.3]  (2016-11-11)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
// Peloncita Structure - Recuerdo - Una foto
//------------------------------------------------------------------------------------------------
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update value for local attributes
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class rec01_div_peloncita_middle extends html_style  {

    		 
    constructor (	fnode			=	''						)
    {   
        this.tag_type     			= 	'div'							

    	this.slide_text									=	''				
    	this.node_id                         				=	''				
	
		this.content_img_high								=	''				
		this.content_img_low								=	''				
	
		this.last_img										=	''				

		this.site_url										=	''				

		// Images
		this.ratina_desktop_img_01	= 	''						
		this.ratina_desktop_img_02	= 	''						
	
		this.ratina_mobile_img_01	= 	''						
		this.ratina_mobile_img_02	= 	''						
	
		this.fnode					=	fnode							

    	super.constructor(this.tag_type)								

		this.a_01		= 	new html_style('a')								

		this.img_01	= 	new html_style('img')								
		this.img_02	= 	new html_style('img')								
		this.div_01	= 	new html_style('div')								

		flex_type = 'a' 														
		// 2048 a4 - 864 - a7
		this.ratina_desktop_res_hi			= 	'su' + flex_type + '2048'	
		this.ratina_desktop_res_lo			= 	'su' + flex_type + '0884'	

		this.ratina_mobile_res_hi				= 	'su' + flex_type + '0640'	
		this.ratina_mobile_res_lo				= 	'su' + flex_type + '0320'	
		

		this.img_01.class 					=	'b-lazy'						
    }

	// Div reload contents
    reload_contents(	slide_num					= ''			,	// 01
    									last_img					= ''				// Last class 
									)
    {   

		this.last_img				=	last_img								


		this.ratina_desktop_img_01 	= 	this.fnode.arr[this.ratina_desktop_res_hi][slide_num]
		this.ratina_desktop_img_02 	=  	this.fnode.arr[this.ratina_desktop_res_lo][slide_num]

		this.ratina_mobile_img_01 	= 	this.fnode.arr[this.ratina_mobile_res_hi][slide_num]										
		this.ratina_mobile_img_02 	= 	this.fnode.arr[this.ratina_mobile_res_lo][slide_num]										

		// this.p('Img_rat_Desktop ' + this.ratina_desktop_img_01)																			

		this.build_data()			
	}

//  <img class="b-lazy" data-src="ratina1/Desktop/h.jpg|ratina2/Desktop/h.jpg" 
//	src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="">

	create_img_01()
	{
		this.img_01.class 		=	"b-lazy"																			
		this.img_01.src 			=	"data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="		

		this.img_01.data_src		=	this.ratina_desktop_img_01 + "|" + 		this.ratina_desktop_img_02								
		
		this.img_01.title		=	this.img.title																
		this.img_01.alt			=	this.img.alt																	
						
		this.img_01.pcreate()																						

		this.a_01.content			+=	this.img_01.code																 				

	}

//  <img class="b-lazy focus-icon" 
//	src="data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="Focus placeholder icon" data-src="images/focus.svg" alt=""> 

	create_img_02()
	{
		this.img_02.class 		=	"b-lazy focus-icon"										
		this.img_02.src 			=	"data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="		

		this.img_02.data_src		=	this.fnode.site_url + "images/focus.svg"																	
		
		this.img_02.alt			=	this.img.alt															
						
		this.img_02.pcreate()																						
	
		this.a_01.content		+=	this.img_02.code																 				
		
		
	}
	
//  <div class="image-overlay"></div>  
	create_div_01()
	{
		this.div_01.class 		="image-overlay"																		
						
		this.div_01.pcreate()																							

		this.a_01.content 				+=	this.div_01.code															 				
	}

	create_imgs()
	{
		this.create_img_01()		 	

		this.create_div_01() 			
		
		this.create_img_02()  		

			
	}

//      <a tame="item_d05_p01" href="" src="" data-src="ratina1/Desktop/lightbox/h.jpg|ratina2/Desktop/lightbox/h.jpg" 
//      class="image-wrapper horizontal" data-lightbox="recuerdo">
	create_a_01()
	{
		this.a_01.class 			=		'image-wrapper' 																	
		this.a_01.content		=		''																			

		// Create inner images and div
		this.create_imgs()																							
				
		this.a_01.class 			+=		' ' + this.img.orientation												
		this.a_01.data_src 	 	=		this.ratina_desktop_img_01 + "|" + this.ratina_desktop_img_02								
		this.a_01.data_lightbox 	=		'recuerdo'																	
						
		this.a_01.pcreate()																						

		this.content				+=		this.a_01.code																 				
	}

	


	//  <div class="single-image"> 
	build_data()
	{
		this.class 			=	'single-image' 							

		this.class 			= 	this.class + ' ' + this.last_img	

		// this.p('Last image class ' + this.class) 						

		this.create_a_01()												

		this.pcreate()													
		
		
	}

}

exports.rec01_div_peloncita_middle = rec01_div_peloncita_middle