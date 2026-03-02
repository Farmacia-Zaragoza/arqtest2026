// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.0.2]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
// Peloncita Structure Footer
//------------------------------------------------------------------------------------------------

//  *        <div class="message">
//				<div class="about-me"> - Ext Repeat
//					...	
//*DIV
//  DIV

// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update value for local attributes
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)


class flg02_div_message_footer extends html_style  {
 
    constructor (     fnode	    								)
    {   
    // El constructor debe cargar las propiedades del archivo
        this.tag_type     			= 	'div'							

		this.n		=	'flg02_div_message::'					
	
	    // Num elements of menu
	    this.num_elements_menu   	= ''     				
	
		this.information			= ''					 // Informacion field
	
		// Theme object
		
		this.thm											 // Drupal theme object
	

      	super.constructor(				this.tag_type)			
		
		this.fnode					=	fnode							
	
        this.div_01          		=       
        				new flg01_div_message_footer(
        						this.fnode								)


		this.class 				=	'message'							
			
		this.build_data()												

    }

    create_div_01()
    {

	    //this.num_elements_menu = this.fnode.arr['sta'].length
		current_active = ' active'																	

		if (!empty(this.fnode.arr['sta']))	            
		for (slide_num in this.fnode.arr['sta'] )
	    {

			slide_status	= this.fnode.arr['sta'][slide_num]

   	        current_status       	=   slide_status										


			// Information : Access to site
			// Description : Archtiecture Word
			// Focus       : Belleza
			// Eng
	        current_title         	=   this.fnode.arr['foc'][slide_num]				
	        current_info         	=   this.fnode.arr['des'][slide_num]				

	    
	        if(!empty(current_status))
	        {
		  	
	          	this.div_01.reload_contents(
							current_title													,	// 01 Esp ... 
							current_info													, 	// 02 My words are 
							current_active													)  
			
  				current_active 			=	''											    
	        } // end If

	    
	    	this.content +=		this.div_01.code 							    	                
	     } // end for

      
  	} 
//	<div class="row">              		// Div 01
//		<div class="col-xs-12">    		// Div 02
//			<div class="about-me">		// Div 03
//			<div class="lang-weblinks">	// Div 04



    build_data()
    {
	// To build content is needed to build block

		this.create_div_01()													

		this.pcreate()														

		// this.dd('Code > ' . this.code )										

    }

}

exports.flg02_div_message_footer = flg02_div_message_footer