// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Tabs LI Class  [V.0.0.4]  (2016-11-19)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
// Peloncita Structure
//------------------------------------------------------------------------------------------------
//	<ul class="nav nav-tabs nav-tabs-responsive2">
//	 <!-- Level 09:LI 	Revel 06			-.
//*  <li class="active" role="presentation">
//	   <!-- Level 10:A 	Revel 06			-.
//	   <a id="General-pill-tab" data-toggle="pill" href="#General-pill" role="tab" aria-controls="General-pill" aria-expanded="true"> 
//	     <!-- Level 11:SPAN 	Revel 06			-.
//		<span class="text">General</span> </a>	</li>
//	 <li class="next" role="presentation">
//    </ul><!-- end menu -.

//*LI
//  A 
//   SPAN
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Slider LI Peloncita  Class 
// ------------------------------------------------------------------------------------
// Methods:
// - reload_contents		: Load dat file attributes
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class tab01_li_peloncita_middle extends html_style  {

 
    constructor (   fnode	            = 	''	)  	
    {   

        this.tag_type     			= 	'li'							

		this.fnode		=	fnode										

        super.constructor(this.tag_type)								    

		this.span_01					= 	new html_style('span')			

		this.a_01						= 	new html_style('a')				

    }

    clean_objects() 
    {   
		this.clean()															
		this.a_01.clean()														
		this.span_01.clean()														
	}

	// Li reload contents
    reload_contents(  li_class             = ''				,	// 01	
	                                  span_text            = ''  				,	// 02
                                      a_id  	        	= ''				,	// 03   	
                                      a_aria_controls     	= ''				,	// 04	   
									  a_aria_expanded		= ''				,	// 05
									  a_href				= ''					// 06			
								   )		
    {   

	    	this.clean_objects()												

			this.class					=	li_class						

			this.create_span(span_text)										

			this.create_a(a_href												,
							a_id												, 													
							a_aria_controls									,
							a_aria_expanded				
							)													

			this.build_data() 												
		// print this.n + 'Ref' + a_href +  ' Map  ' + this.map +  this.lf 						
		// bas_li::Ref#Primer-Vistazo Map liv/lul/li/: 76928 link Primer vistazo
	}

	create_span(span_text)
	{
		this.span_01.class 		=	'text'									
		this.span_01.content		=	span_text
		this.span_01.pcreate()

	}
//	<a id="Nuestros-Viajes-tab" data-toggle="tab" href="#Nuestros-Viajes" role="tab" aria-controls="Nuestros-Viajes">

    create_a(a_href, a_id , a_aria_controls , a_aria_expanded)
    {
		
		this.a_01.id 			= 	'-pill-tab'																
		this.a_01.href 			=	'-pill'																	
		this.a_01.data_toggle	=	'pill'																	
		this.a_01.role			=	'tab'																		
		this.a_01.aria_controls	=	'-pill'																		
		
		this.a_01.href       	= 	
        					a_href 			. 	this.fnode.page_position + 	this.a_01.href  			
        this.a_01.id				= 	
        					a_id	       		.   this.fnode.page_position +  this.a_01.id				
        this.a_01.aria_controls	= 	
        					a_aria_controls	.	this.fnode.page_position + 	this.a_01.aria_controls 	

        this.a_01.aria_expanded	= 	a_aria_expanded														

        this.a_01.content     	= 	this.span_01.code  													 
        
        this.a_01.pcreate()																					
    }

    build_data()
    {
    this.content    				= 	this.a_01.code    													
	this.role 					=	'presentation'															
	this.pcreate()																							

    }


}

exports.tab01_li_peloncita_middle = tab01_li_peloncita_middle