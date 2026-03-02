// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.0.2]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
// Peloncita Structure Footer
//------------------------------------------------------------------------------------------------

// *<div class="brqx-flags">
//   <div class="upper-flags">
//     <div class="flag-wrapper image-wrapper "> External
//*DIV
//  DIV
//   DIV

// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update value for local attributes
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class flg02_div_flag_footer extends html_style  {
 
    constructor (     fnode	    								)
    {   
    // El constructor debe cargar las propiedades del archivo
        this.tag_type     			= 	'div'									

		this.n		=	'flg02_div_flag::'					

    // Num elements of menu
    	this.num_elements_menu   	= ''     				

		this.information			= ''					 // Informacion field


        
	// Html strings
	
		num_row_flags		=	5					 // Num flags for every row		
    					   

      	super.constructor(				this.tag_type)						

	
		this.fnode					=	fnode									

		this.siv_01 					=	new html_style('div')					
		this.siv_02 					=	new html_style('div')					

	
        this.div_01          		=       
        				new flg01_div_flag_footer()									

		// *<div class="brqx-flags">
		//   <div class="upper-flags">

		this.div_02 					=	new html_style('div')					
		

		this.class 				=	'brqx-flags'								
		this.siv_01.class 		=	'upper-flags'								
		this.siv_02.class 		=	'lower-flags'								
		this.div_02.class 		=	'justifier'									

		this.div_02.pcreate()													
			
		this.build_data()												

    }

    create_div_01()
    {

	    //this.num_elements_menu = this.fnode.arr['sta'].length
	
		group_divs_code	=	''															
	    
	    cont 			= 	0																
		
		// REVISAR BUCLE
		if (!empty(this.fnode.arr['sta']))	            
		for (slide_num  in this.fnode.arr['sta'] )
	    {
	        // Tab text        	      
	        let slide_status = this.fnode.arr['sta'][slide_num]   

   	        current_status       	=   slide_status										

			// Eng
	        current_svg_name       =   this.fnode.arr['flg'][slide_num]				

			// this.p('Svg ' . current_svg_name)											
	    
	        if(!empty(current_status))
	        {
		  	
	          	this.div_01.reload_contents(
							current_svg_name												)  
									
				// empieza con 1 2 3 4 5
				// 6 7 8 9 10

				
				if (cont < this.num_row_flags)
				{	
					// this.p('changing row')													
					this.siv_01.content		+=	this.div_01.code
				}
				else {
					this.siv_02.content		+=	this.div_01.code
				}				

				cont++																				
  				
  			} // end If

  		} // end for

		this.siv_01.pcreate()												
		this.content 				+= 	this.siv_01.code 						

		this.siv_02.pcreate()												
		this.content 				+= 	this.siv_02.code 						
  		
	     
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

		//this.dd('Code > ' . this.code )										

    }

}

exports.flg02_div_flag_footer = flg02_div_flag_footer