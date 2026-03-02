// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.0.2]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
// Peloncita Structure Footer
//------------------------------------------------------------------------------------------------

//*  <div class="lang-weblinks">
//     <a class="shadow3" href="http://esp.brqx.es" title="Mis palabras son arquitect...undo.">ESP</a>

//					...	
//*DIV
//  A - External - Repeat

// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update value for local attributes
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class flg02_div_lang_footer extends html_style  {

    constructor (     fnode	    								)
    {   
    // El constructor debe cargar las propiedades del archivo
        this.tag_type     			= 	'div'								

		this.n		=	'flg02_div_lang::'					

    // Num elements of menu
    	this.num_elements_menu   	= ''     				



      	super.constructor(				this.tag_type)					

	
		this.fnode					=	fnode								
	
        this.a_01          		=       
        				new flg01_a_lang_footer()								


		this.class 				=	'lang-weblinks'							
			
		this.build_data()														

    }

    create_div_01()
    {
	    //this.num_elements_menu = this.fnode.arr['sta'].length)

	    if (!empty(this.fnode.arr['sta'])
		for (slide_num in this.fnode.arr['sta'] )
	    {

			let slide_status = this.fnode.arr['sta'][slide_num]	
	        // Tab text        	         

   	        current_status       	=   slide_status										

			// Eng
			// Txt : Title - ENG
			// Des : Descriptions - Words
	        current_txt         	=   this.fnode.arr['tit'][slide_num]				
	        current_title         	=   this.fnode.arr['des'][slide_num]				
	        current_href         	=   this.fnode.arr['url'][slide_num]				

	    
	        if(!empty(current_status))
	        {
		  	
	          	this.a_01.reload_contents(
							current_txt													,	// 01 Esp ... 
							current_title													, 	// 02 My words are 
							current_href													)  
			
	        } // end If

	    
	    	this.content +=		this.a_01.code 							    	                
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

exports.flg02_div_lang_footer = flg02_div_lang_footer 