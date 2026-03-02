// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Node Js - Footer Flat Class  [V.0.1.1]  (2017-03-16)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------

//* <div class="col-sm-6 col-xs-12 text-center link">
//    <span class="pop-container">
//		<a class="pop-link skew" href="#"> (external)
// 		<span class="link-description"> 

//-------------------------------------------------------------------------------------
// DIV
//  SPAN 
//    A 
//    SPAN
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - reload_contents   	  : Build html final code for object 
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var 	cons 				= 	require("/brqx/base/rcode/es6/com/libs/general/constants.ess"								);

const 	{ html_style } 				= require(	cons.JS_BASE + 'com/objects/html/html_style.es6'										),
		{ foo02_a_footer }		= require( 	cons.JS_BASE + 'spc/theme/truck/deep_html/types/footer/foo02_a.es6'			),
		scpf 						= require( 	cons.JS_BASE + 'com/libs/file/full_path/level_02/save_code_properties_filename.es6'	);

class foo03_div_footer extends html_style{

    constructor (   thm										,
					alignment 	=	'text-center'				)
   {   
        let tag_type                 		= 	'div'             				


        super(tag_type)    

		this.n								= 'foo03_div_footer_truck::'							    		
        this.tag_type                 		= 	'div'             				

		// Fast node for contents
		this.fnode							=	''														
		
		this.str_url						= 	''											
		this.str_text						=	''											
		this.str_extended					=	''											

        this.tag_type                 		= 	'div'             				

		this.thm							=	thm										


		// this.p('site_path_footer03' . this.fnode.u.site_path 	)								

		this.class 						=	
				'col-sm-6 col-xs-12 ' + alignment + ' link'							

		this.a_01						=	
				new foo02_a_footer(this.thm)								

		this.span_01						=	new html_style('span')			
		this.span_01.class 				=	'pop-container'					

		this.span_02 						= 	new html_style('span')												
		this.span_02.class  				= 	'link-description'									


    }

	create_span_02()
	{
		this.span_02.content 	=	this.str_extended 								
		
		this.span_02.pcreate() 															
		
		this.span_01.content 	+= 	this.span_02.code 									
	}
	

	create_span()
	{
		this.span_01.content	=	this.a_01.code  

		this.create_span_02()																
		
		this.span_01.pcreate() 															

		this.content 			=	this.span_01.code 									

	}
    reload_contents(	link 		= '' 								, 
    					text 		= '' 								,
    					extended 	= '' 								)
    {
		this.content	= 		''												
		
		this.str_url 			=		link												
		this.str_text			=		text 											
		this.str_extended		=		extended										

		// Array de links
		this.a_01.reload_contents(this.str_url , this.str_text)							
		
		this.create_span() 													
		
		this.pcreate() 														
		
		// this.p('Code > '  + this.code )										
				
	} 
  
}

exports.foo03_div_footer = foo03_div_footer