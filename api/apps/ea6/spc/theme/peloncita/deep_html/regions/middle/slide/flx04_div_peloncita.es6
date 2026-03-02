// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Flex Slider Class  [V.0.1.6]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//* <div id="General-pill-middle" class="tab-pane fade active in" role="tabpanel" aria-labelledby="General-pill-middle-tab">
//    <!-- Only H type slideshow -.
//    <h1>Only H Type slideshow with flex slider 2.6.3</h1>
//    <div id="flex-slider-H" class="flexslider only-flexslider"> External
//       <ul class="slides">
//           <li class="image-wrapper">
//    <div class="flex-download">                                 External               
//    <div id="flex-carousel-H" class="flexslider flexcarousel">  External
//       <ul class="slides">
//           <li class="image-wrapper">


//-------------------------------------------------------------------------------------
// DIV
//  DIV (external
//  DIV (external
//  DIV (external

// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - build_data   	  : Build html final code for object 
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class flx04_div_peloncita_middle extends html_style{

                 
   constructor (	fnode 				=	'' 			,
    				vnode				= 	''			)  
   {   

		this.n							= 'flx04_mid::'						    		
    
	
		h1_01							=		''		

    
		this.div_download				=		''											


		this.fnode						=		fnode				
		this.vnode						=		vnode				

		this.div_flex 					=	new flx03_div_flex_middle(		this.fnode 		, 
																		  		this.vnode		,
																				'fotos'				)
		

		this.div_carousel					=	new flx03_div_carousel_middle(	this.fnode 		, 
																		  		this.vnode		,
																				'carousel'			)


		this.h1_01						=	new html_style('h1') 								

		this.build_data()	            

    }

   clean_objects() 
    {   
		this.clean()															
	}

//    <h1>Only H Type slideshow with flex slider 2.6.3</h1>

	create_h1()
	{
		this.h1_01.content 	= 'Only H Type slideshow with flex slider 2.6.3'			
		this.h1_01.pcreate()																
		this.content 			=	this.h1_01.code 										 			
		
	}

	create_divs()
	{
		this.content		+= 	this.div_fotos.code 							

		this.content		+= 	this.div_carousel.code 									

		
	}


   build_data()
    {
		// Devolvemos content
      	this.content   = '' 

		this.create_h1()  
		
		this.create_divs() 

		//this.d('content >' . this.content) 
		
				
	} // End Build Data
  
}

exports.flx04_div_peloncita_middle = flx04_div_peloncita_middle