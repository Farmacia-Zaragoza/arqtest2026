// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.0.3]  (2016-11-11)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//------------------------------------------------------------------------------------------------
// Peloncita Structure - Selections
//------------------------------------------------------------------------------------------------
//	<!-- Level 08:DIV 	Revel 06			-.
//*  <div class="about-me  active">
//     <div class="first-half about-text">
//          When beauty erupts from unconditional love, it appears how beautiful that nothing && no one can equal it. Brqx 2009
//     <div class="second-half about-text">
//          My words are architecture && structure. With that base united to the professionalism && the person 

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

class flg01_div_message_footer extends html_style  {
		 
    constructor (	fnode						= 	''			)  		
    {   
    // El constructor debe cargar las propiedades del archivo
            this.tag_type     			= 	'div'							

			this.n 			=	'flg01_div::'									
	
	// Html strings
	
			this.main_class 		= 		'about-me'								

			this.fnode					=	fnode							

        	super.constructor(this.tag_type)								
        	
			this.div_01 					=	new html_style('div') 			
			this.div_02 					=	new html_style('div') 			
			
			this.class 					=	'tagadelic-container'			 
			this.div_01.class 			= 	'first-half about-text'			
			this.div_02.class 			= 	'second-half about-text'			

//*  <div class="about-me  active">
//     <div class="first-half about-text">
//          When beauty erupts from unconditional love, it appears how beautiful that nothing && no one can equal it. Brqx 2009
//     <div class="second-half about-text">

    }

    reload_contents(	txt_01					= ''			, 	// 01
	    								txt_02					= ''			, 	// 02
    									active					= ''			) 	// 04
    {   

		// Gen/vis/taglugar/personal/Akureiry tagadelic level2 Akureiry Akureiry
		// this.p('Gen' . href . ' ' . class . ' ' . title . ' ' . content)			
		
		this.div_01.content		=	txt_01 									
		this.div_02.content		=	txt_02 									

		this.div_01.pcreate() 													
		this.div_02.pcreate() 													

		this.class 				=	this.main_class . active 			 
		this.content				=	this.div_01.code							
		this.content				+=	this.div_02.code							
	
		this.pcreate()													

		// this.p('Code > ' + this.code )										
	}
 
}

exports.flg01_div_message_footer = flg01_div_message_footer
