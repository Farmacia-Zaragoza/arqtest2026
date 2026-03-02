// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Search Div Class  [V.0.0.3]  (2016-11-11)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
// Peloncita Structure - Selections
//------------------------------------------------------------------------------------------------
//	<!-- Level 08:DIV 	Revel 06			-.
//<div class="tab-content">
//*	<div id="General-pill" class="tab-pane fade active in">  								div_d09_p01

// div_id , div_tabset_id , slide_text , date , div_03_class

//*DIV
//  DIV
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update values for local attributes and generate Object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class sea01_div_peloncita_middle extends html_style  {

    constructor (	fnode						= 	''			)  		
    {   
        this.tag_type     			= 	'div'							

		this.n											= 	'sea01_div::'	

		this.content_divs			=	''														

		this.fnode					=	fnode							

    	super.constructor(this.tag_type)								

    }

	// <div id="General-pill-middle" class="tab-pane fade active in" role="tabpanel" aria-labelledby="General-pill-middle-tab">
    //      Go To Sendas tab for table view
	// Div reload contents
    reload_contents(	div_d01_id 	        = ''			, 	// 01
	    								div_d01_class_active	= ''			, 	// 02
	    								slide_text 			= ''			) 	// 04
    {   


		this.id				=	slide_text  + this.fnode.page_position + '-pill'			
		this.class			=	'tab-pane fade'.  div_d01_class_active							
		this.role 			= 	'tabpanel' 														 
			
		this.aria_labelledby	=	slide_text  + this.fnode.page_position + 'pill-tab'			
		
		// this.p('SlideBB ' + slide_text )															

		this.content			+=	'Go to ' + slide_text											
		
		if (slide_text === 'Generals')
		{
			// Flex
			this.content			+=	'Go to ' + slide_text											
			this.content_divs		=	new flx04_div_peloncita_middle(	this.fnode 					, 
																		vnode)						
				
			this.content			+=	this.content_divs.content										
		}
		else if (slide_text === 'FotoListados'	)
		{
			// Json
			//this.p('Starting block D ' + slide_text )																		
			
			this.content_divs		=	new lst01_div_peloncita()											

			this.content			+=	this.content_divs.content										
			
			//this.p('Before block D ' + slide_text )																		

			// Jquery code - Se devuelve en el fnode
			json					=	new lst04_json_generate(this.fnode								, 
																vnode									)
			// this.p('End block ')																		
			
		}	
		else if (slide_text == 'Imagenes'	)
		{			// Json
			this.content_divs		=	new gal01_div_peloncita()											
			this.content			+=	this.content_divs.content										
			
			// Jquery code - Se devuelve en el fnode
			json					=	new gal04_json_generate(this.fnode								, 
																vnode									)
		}	
		else
		{
		this.content				+=	' Next ' + slide_text											

		// this.create_view_div()	 
		
		this.pcreate()
		}																			 

	}
 
}

