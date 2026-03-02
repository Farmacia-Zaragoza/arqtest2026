// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Tab Class  [V.0.0.5]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Theme DIV Structure - Peloncita site
//-------------------------------------------------------------------------------------

//	<div class="tab_start">
//		<!-- Selectors side -.
//		<ul class="nav nav-tabs nav-tabs-responsive2">
//		<div class="tab-content">
// DIV
//  UL - START REPEAT
//* DIV - START REPEAT
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Slider Div02 Peloncita Class  
// ------------------------------------------------------------------------------------
// Methods:
//-------------------------------------------------------------------------------------
// - reload_contents  : Reload field attributes
// - load_file        : Load dat file from system   
// - build_data       : Build html final code for object 
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class sea03_div_peloncita_middle extends html_style{

         
    constructor (   search_node				= ''	)	// 02.Fast node for selection
  {   
    // El constructor debe cargar las propiedades del archivo

        this.tag_type        		=      	'div'                    		


		this.n						= 'sea03_mid::'				    		


    
    	this.div_01            			                                           
    	this.ul_01            			                                           

	    this.node_id              =   ''                     // NID - Drupal Node ID



		this.search_node			=		search_node					


        super.constructor(this.tag_type)								    

		this.reload_contents()

    }

    reload_contents () 
    {   
		this.build_data()	            
    }


    //	<div class="tab_start">
    build_data()
    {
    this.code       =       '' 											
    this.content    =       '' 											
	this.class 	  =		'tab start'										

	// Parte comun de los tabs
	// Igual no es tan comun
    this.ul_01 = new tab02_ul_peloncita_middle(
	  										this.search_node	,						// 01
	  										'types'					,
	  										'types'				)


	// this.d('ul_code' + this.ul_01.code)								

	// Parte especifica de los tabs - views
	this.div_01 = new sea02_div_peloncita_middle (
	  										this.search_node		,			// 03
	  										'types'					,
	  										'types'					)

 
    this.content        +=    this.ul_01.code
                    
    this.content        +=    this.div_01.code

	this.pcreate()          

	// this.d('jcode 03 >' + this.fnode.jquery_code)							

	// this.d('code >' + this.code)							


      
  } // End Build Data
    
}
//-----------------------------------------------------------------------------------


exports.sea03_div_peloncita_middle = sea03_div_peloncita_middle