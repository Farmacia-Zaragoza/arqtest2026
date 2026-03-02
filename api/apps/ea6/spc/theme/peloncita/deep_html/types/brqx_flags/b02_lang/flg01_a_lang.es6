// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.0.3]  (2016-11-11)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
// Peloncita Structure - Selections
//------------------------------------------------------------------------------------------------
//	<!-- Level 08:DIV 	Revel 06			-.
// <a class="shadow3" href="http://esp.brqx.es" 
//                        title="Mis palabras son arquitect...undo.">ESP</a>
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
// ------------------------------------------------------------------------------------
// - reload_contents : Update value for local attributes
// - build_data  	 : Build html final code for object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class flg01_a_lang_footer extends html_style  {

    // Drupal Block Attributes

		 
    constructor ()  		
    {   
            let tag_type     			= 	'a'							
			super(tag_type)

			this.n 			=	'flg01_a::'									
            this.tag_type     			= 	'a'							

			
			this.class 					=	'shadow3'			 

// <a class="shadow3" href="http://esp.brqx.es" 
//                        title="Mis palabras son arquitect...undo.">ESP</a>

    }

    reload_contents(	content				= ''			, 	// 01 Txt
	    								title					= ''			, 	// 02 tittle
    									href					= ''			) 	// 03 Url
    {   


		this.href 				=	href 									 
		this.title				=	title									

		// Function de node
		this.content				=	ucfirst(content.substr(0,3))			
	
		this.pcreate()														

		// this.p('Code > ' + this.code )										
	}
 
}

