// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.0.3]  (2016-11-11)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
// Peloncita Structure - Selections
//------------------------------------------------------------------------------------------------
//	<!-- Level 08:DIV 	Revel 06			-.
//     <div class="flag-wrapper image-wrapper ">
//        <a href="#" class="flag flag-icon-background b-lazy shadow2" data-src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.7.0/flags/4x3/gb.svg">  

//*DIV
//  DIV
//  DIV
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update value for local attributes
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class flg01_div_flag_footer extends html_style  {
		 
    constructor ()  		
    {   
            let tag_type     			= 	'div'
            super(tag_type)							

            this.tag_type     			= 	'div'							

			this.n 			=	'flg01_div_flag::'									



			this.main_data_src			=	
					'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.7.0/flags/4x3/'			
        	        	
			this.a_01 					=	new html_style('a') 			
			
			
			this.class 					=	'flag-wrapper image-wrapper'						 
			this.a_01.class 				= 	'flag flag-icon-background b-lazy shadow2'			
			this.a_01.href				=	'#'													

//     <div class="flag-wrapper image-wrapper ">
//        <a href="#" class="flag flag-icon-background b-lazy shadow2" data-src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.7.0/flags/4x3/gb.svg">  

    }

    reload_contents(	svg_name				= ''			) 	// 04
    {   
		
		this.a_01.data_src		=	this.main_data_src + svg_name			
		this.a_01.pcreate()														

		this.content				=	this.a_01.code							
	
		this.pcreate()													

		// this.dd('Code > ' . this.code )										
	}
 
}

exports.flg01_div_flag_footer = flg01_div_flag_footer