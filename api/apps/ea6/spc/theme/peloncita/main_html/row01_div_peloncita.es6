// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Html Div Class  [V.0.1.6]  (2016-11-09)
// Brqx Group - Agile Farmacia Zaragoza Methodology
//-------------------------------------------------------------------------------------
// Theme Peloncita Div Row Block Structure - Is a Div
//-------------------------------------------------------------------------------------
//*	<div class="row">
//    <div class="col-sm-3 col-lg-2-point-5 visits-left">
//	  <div class="col-sm-6 col-lg-7 middle-content">
//	  <div class="col-sm-3 col-lg-2-point-5 social-right">
//-------------------------------------------------------------------------------------
// DIV
//  DIV MIDDLE
//  DIV LEFT
//  DIV RIGHT
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--
// Methods:
//-------------------------------------------------------------------------------------
// - build_data   	  : Build html final code for object 
// - create_div_NN    : Create div_NN   dhtml object
// ==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--==--

var { html_style } 		= require(	'/brqx/base/rcode/es6/com/objects/html/html_style.es6'		)

class row01_div_peloncita extends html_style{
            
    constructor (   thm							)  
    {   
    // El constructor debe cargar las propiedades del archivo

        this.tag_type                 	=      'div'             					

		this.n							=	'row01::'					
	
		// Drupal Theme structure
		this.thm						=	''
	
		// Igual tenemos multiples rows
		
		this.row_01						=	''					    
	    
	    this.div_left                   =	''      
	    this.div_right                  =	''
	    div_middle                      =	''
	
	    empty_div						=	''										    

	  	this.thm							=		thm														
	   	this.map							=	this.thm.map + 'row/'				
	   	this.thm.map						=	this.map 								

		this.row_02						=	new html_style('div')		
		
		this.empty_div					=	new html_style('div') 			
		
       	this.load_file()                                              		

		this.build_data()	            

    }

    clean_objects() 
    {   
		this.row_02.clean()															
	}

    load_file() {   

		this.row_02.class 					= 'row'				
    }

//    <div class="col-sm-3 col-lg-2-point-5 visits-left">
    create_div_left()
    {
	  // External div - Tres opciones de menu - Lo va a leer de fichero
	   
//	    left_menu_type		=	'itexts (icons_texts)  | icons | texts'														
	    left_menu_type_selector		=	'itexts'														
	    left_menu_type_content			=	'itexts'														

	    //left_menu_type		=	'icons'														

		this.div_left							= 	
						new sld04_div_peloncita_left(this.thm								,
													left_menu_type_selector					,
													left_menu_type_content						,
													this.map									)	

		this.row_02.content		+= 	this.div_left.code								
	}
    
//	  <div class="col-sm-6 col-lg-7 middle-content">
    create_div_right()
    {
	  // External div
	// Right Block
	    right_menu_type_selector		=	'texts'														
	    right_menu_type_content		=	'texts'														

		this.div_right							= 	
					new sld04_div_peloncita_right(	this.thm											,
													right_menu_type_selector							,
													right_menu_type_content							,	
													this.map											)	

//		this.empty_div.class 		=	'col-md-3 col-lg-2-point-5 social-right'			
//		this.empty_div.pcreate() 											


//      	this.row_02.content		+= 	this.empty_div.code								
	  
      	this.row_02.content		+= 	this.div_right.code								
	}


//	  <div class="col-sm-3 col-lg-2-point-5 social-right">
    create_div_middle()
    {
	  // External div - Have contents
		// this.div_middle.class 		=	'col-md-6 col-lg-7 middle-content col-md-push-3 col-lg-push-2-point-5'			
	  
	  	this.div_middle		= 	
  					new sld06_div_peloncita_middle(	this.thm	)

   		//this.div_middle		=	this.empty_div.code				

		// this.empty_div.class 		=	'col-md-6 col-lg-7 middle-content col-md-push-3 col-lg-push-2-point-5'			
		// this.empty_div.pcreate() 											

      	// this.row_02.content		+= 	this.empty_div.code								
	  
		this.row_02.content		+= 	this.div_middle.code        
    }

	create_row_02()
	{
		// Esta parte seria row_02
		// 33 seconds page load

		// Middle Part - Must exist allways
	  	this.create_div_middle()			
		
		// Left Part - 3s
	  	this.create_div_left()			
	
		// Left + Right - 4s
		// Right Part - Twitter Facebook
		
	
	  	this.create_div_right()			

		this.row_02.pcreate()					
		
	}

    build_data()
    {
    	this.code      = ''				 
      	this.content   = ''				 

		// Vamos con los idiomas
		
//	  	print this.n + 'Antes de flags' + this.lf  

//		cat = new categories('/categorias/pais/brasil/taxonomyterm1740')
		
		this.row_01	= new flag03_div_peloncita(this.thm)		 // Flags Zone

		this.create_row_02() 										

		this.code 				+=  this.row_01.code 			

		this.code 				+=  this.row_02.code 			

		
		
	} // End Build Data
  
}

exports.row01_div_peloncita = row01_div_peloncita
