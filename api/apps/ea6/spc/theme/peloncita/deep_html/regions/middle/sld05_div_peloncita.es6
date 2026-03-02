// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.1.6]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Theme Peloncita Div Left Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//*	<div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="false">
//    <div class="carousel-inner" role="listbox">
//	  <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
//		<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
//		<span class="sr-only">Previous</span>
//    <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
//		<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
//		<span class="sr-only">Next</span>
//-------------------------------------------------------------------------------------
// DIV
//  DIV
//  A
//    SPAN
//  A
//    SPAN
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - build_data   	  : Build html final code for object 
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 			= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		),

class sld05_div_peloncita_middle extends html_style{

    constructor (   thm							)  
   {   
		super()
		this.n						= 'sld05_mid::'				    		
	
    // Num elements of menu
    	this.num_elements_menu    = 	''                    
      
    	this.div_01               =		''

        this.tag_type                 	=      'div'             					

	  	this.thm							=		thm								

        super.constructor(this.tag_type)    


        this.a_01   	                 	= 		new html_style('a')      			
        this.span_01                    	= 		new html_style('span')      			
		// div_04 is the same than div_01

		
       	this.clean_objects()                                              		

		this.build_contents()	            

    }

    clean_objects() 
    {   
		this.clean()															
	}



//	  <div class="carousel-inner" role="listbox">
    create_div()
    {
	  // Pending to review    	
      this.div_01.code      = '' 
      this.div_01.content   = '' 

	  // Go First with sel02

	  this.div_01		= 	new sld04_div_peloncita_middle( &this.thm	)
									
	  this.content += this.div_01.code	  
     
    }

    create_a(direction='right' , button='next')
    {
	  // Pending to review    	
      this.a_01.code      		= 	''									 
	  
      this.a_01.class  	 		= 	direction + ' carousel-control'	
      this.a_01.data_slide		= 	button									  
      	  
	  let class_span					=	"glyphicon glyphicon-chevron-"		

	  this.span_01.class 		=	class_span + direction			 
	  this.span_01.aria_hidden	=	"true"								

	  this.span_01.pcreate()												
      this.a_01.content   		= 	this.span_01.code					  

	  this.span_01.clean()												
	  this.span_01.class 		=	'sr-only'							 

	  this.span_01.pcreate()												

      this.a_01.content   		+= 	this.span_01.code					  
	  this.a_01.pcreate()												

	  this.content				+=	this.a_01.code						  

	}

//	  <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
//    <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
    create_multi_a()
    {
	  // Pending to review    	
      this.a_01.href		 	= "#myCarousel"							
      this.a_01.role		 	= "button"									  
	   
 	  this.create_a('left','prev')				

 	  this.create_a('right','next')				

	}

//	<div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="false">
    build_data()
    {
		// miv_d04_p01    @ carousel slide   @           @ myCarousel

    	this.code      		= 	''											 
      	this.content   		= 	''											 
	    this.data_ride		=	"carousel"									
		this.data_interval	=	"false"											
		this.class 			=	'carousel slide'							
		this.id 				=	'myCarousel'								

	
	  	this.create_div()	

		this.create_multi_a()

		this.pcreate()														

		// this.d('code >' + this.code)										

		
	} // End Build Data
  
}

exports.sld05_div_peloncita_middle = sld05_div_peloncita_middle