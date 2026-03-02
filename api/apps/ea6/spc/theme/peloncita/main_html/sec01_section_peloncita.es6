// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.1.7]  (2016-12-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Theme Peloncita Section Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//*	<section id="main-content" class="container">
//    <div class="row">
//-------------------------------------------------------------------------------------
// SECTION
//  DIV
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - build_data   	  : Build html final code for object 
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class sec01_section_peloncita extends html_style{

    constructor ( thm )  	
    {   

        this.tag_type                 	=      'section'             					
    // Html Structures
    
	    this.div_row						= ''

	  	this.thm							=		thm														

	   	this.map							=	this.thm.map + 'section/'				
	   	this.thm.map						=	this.map 								
	
        superconstructor(this.tag_type)    
		
       	this.load_file()                                              		

		this.build_data()	            

    }

    clean_objects() 
    {   
		this.clean()															
	}

    load_file() {   

    	this.class 	= 	'container'											
		this.id		=	'main-content'										

    }

//    <div class="col-sm-3 col-lg-2-point-5 visits-left">
    create_row()
    {
	  // External div
    	this.div_row		= 	new row01_div_peloncita(
    							this.thm										// 01 Theme structure
					)

		this.content		=	this.div_row.code								
	}
    

    build_data()
    {

	  	this.create_row()

		this.pcreate()

		
	} 
  
}

exports.sec01_section_peloncita = sec01_section_peloncita