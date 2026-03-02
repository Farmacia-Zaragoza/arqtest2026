// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.0.5]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
// Spc - Cica_d05 - Home - Index_06 - v0_0_1
//-------------------------------------------------------------------------------------
// Theme DIV Structure - Peloncita site - Recuerdo
//-------------------------------------------------------------------------------------

//*	<div class="recuerdo-images" tame="item_d02_p03">
//    <div class="v0-h5 " tame="item_d03_p01">

// * DIV
//		DIV 
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

class rec03_div_peloncita_middle extends html_style{

         
    constructor (   fnode			       		= 	''      ) 
   {   
    // El constructor debe cargar las propiedades del archivo

        this.tag_type        		=      	'div'                    		

    	this.num_elements_menu   = ''     

    
    	this.div_01				=	''            			                                           

    // Drupal Node Load
		
		this.fnode				=		fnode							


        super.constructor(this.tag_type)								    

		this.reload_contents()

    }

    reload_contents ()	// 01
   {   

       	this.clean_objects()                                              	

		this.build_data()	            
    }

    clean_objects() 
    {   
		this.clean()															
	}

	//	<div class="recuerdo-images" tame="item_d02_p03">
    build_data()
    {
    this.code       =       '' 
    this.content    =       '' 
	this.class 	  =	'recuerdo-images'										

	// Va a devolver la seccion ya con todas la fotos	
	this.div_01 = new rec02_div_peloncita_middle (this.fnode)
 
    this.content        +=    this.div_01.code

	this.pcreate()          

      
  } // End Build Data
    
}

exports.rec03_div_peloncita_middle = rec03_div_peloncita_middle